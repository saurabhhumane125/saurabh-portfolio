import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Generate random network nodes
function generateNetworkNodes(count: number, spread: { x: number; y: number; z: number }) {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push(new THREE.Vector3(
      (Math.random() - 0.5) * spread.x,
      (Math.random() - 0.5) * spread.y,
      (Math.random() - 0.5) * spread.z - 2
    ));
  }
  return nodes;
}

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

// Find connections between nearby nodes
function generateConnections(nodes: THREE.Vector3[], maxDistance: number) {
  const connections: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].distanceTo(nodes[j]);
      if (dist < maxDistance) {
        connections.push(
          nodes[i].x, nodes[i].y, nodes[i].z,
          nodes[j].x, nodes[j].y, nodes[j].z
        );
      }
    }
  }
  return new Float32Array(connections);
}

// Sparkling gold nodes
function GoldNodes({ nodes, mouse, isMobile }: { nodes: THREE.Vector3[]; mouse: React.MutableRefObject<{ x: number; y: number }>; isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(nodes.length * 3);
    const sizeArray = new Float32Array(nodes.length);
    
    // Larger sizes on mobile for more visibility
    const baseSize = isMobile ? 1.0 : 0.7;
    const sizeVariation = isMobile ? 1.8 : 1.2;
    
    nodes.forEach((node, i) => {
      pos[i * 3] = node.x;
      pos[i * 3 + 1] = node.y;
      pos[i * 3 + 2] = node.z;
      sizeArray[i] = baseSize + Math.random() * sizeVariation;
    });
    
    return { positions: pos, sizes: sizeArray };
  }, [nodes, isMobile]);

  // Custom shader for sparkling effect - enhanced glow on mobile
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#60a5fa') }, // Bright Blue
        color2: { value: new THREE.Color('#22d3ee') }, // Bright Cyan
        color3: { value: new THREE.Color('#ffffff') }, // White sparkle
        glowIntensity: { value: isMobile ? 1.5 : 1.0 }, // More glow on mobile
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        varying vec3 vPosition;
        void main() {
          vSize = size;
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (${isMobile ? '220.0' : '180.0'} / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float glowIntensity;
        varying float vSize;
        varying vec3 vPosition;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Sparkle effect based on time and position
          float sparkle = sin(time * 3.0 + vPosition.x * 10.0) * 
                         sin(time * 2.5 + vPosition.y * 10.0) * 0.5 + 0.5;
          sparkle = pow(sparkle, 3.0);
          
          // Enhanced glow falloff
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          float core = 1.0 - smoothstep(0.0, 0.15, dist);
          
          // Mix colors
          vec3 baseColor = mix(color1, color2, sin(vPosition.x + vPosition.y) * 0.5 + 0.5);
          vec3 finalColor = mix(baseColor, color3, sparkle * core);
          
          // Enhanced alpha for mobile
          float alpha = glow * (0.7 + sparkle * 0.5) * glowIntensity;
          
          gl_FragColor = vec4(finalColor * glowIntensity, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [isMobile]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = mouse.current.x * 0.1;
      pointsRef.current.rotation.x = mouse.current.y * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
}

// Connection lines
function ConnectionLines({ connections, mouse, isMobile }: { connections: Float32Array; mouse: React.MutableRefObject<{ x: number; y: number }>; isMobile: boolean }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(isMobile ? '#0ea5e9' : '#0369a1') }, // Brighter on mobile
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vPosition;
        
        void main() {
          float pulse = sin(time * 2.0 + vPosition.x * 5.0 + vPosition.y * 5.0) * 0.3 + 0.7;
          float alpha = ${isMobile ? '0.5' : '0.3'} * pulse;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [isMobile]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = mouse.current.x * 0.1;
      linesRef.current.rotation.x = mouse.current.y * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={connections.length / 3}
          array={connections}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </lineSegments>
  );
}

// Main scene
function Scene({ isMobile, scrollY, gyroscope }: { isMobile: boolean; scrollY: number; gyroscope: { beta: number; gamma: number } }) {
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group>(null);
  const currentScrollY = useRef(0);
  const currentGyro = useRef({ beta: 0, gamma: 0 });

  useEffect(() => {
    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    // Touch movement handler
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetMouse.current = {
          x: (touch.clientX / window.innerWidth) * 2 - 1,
          y: -(touch.clientY / window.innerHeight) * 2 + 1,
        };
      }
    };

    // Touch start handler - initialize position
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetMouse.current = {
          x: (touch.clientX / window.innerWidth) * 2 - 1,
          y: -(touch.clientY / window.innerHeight) * 2 + 1,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // Smooth interpolation for mouse/touch position, parallax, and gyroscope
  useFrame(() => {
    const lerpFactor = isMobile ? 0.08 : 0.1;
    mouse.current.x += (targetMouse.current.x - mouse.current.x) * lerpFactor;
    mouse.current.y += (targetMouse.current.y - mouse.current.y) * lerpFactor;

    // Smooth scroll parallax
    currentScrollY.current += (scrollY - currentScrollY.current) * 0.1;

    // Smooth gyroscope interpolation
    currentGyro.current.beta += (gyroscope.beta - currentGyro.current.beta) * 0.05;
    currentGyro.current.gamma += (gyroscope.gamma - currentGyro.current.gamma) * 0.05;

    if (groupRef.current) {
      // Parallax effect based on scroll - subtle vertical shift and rotation
      const parallaxIntensity = isMobile ? 0.0015 : 0.001;
      const rotationIntensity = isMobile ? 0.00008 : 0.00005;
      
      // Gyroscope-based rotation (only applies when values are non-zero, i.e., on mobile with gyroscope)
      const gyroIntensity = 0.015;
      const gyroRotationX = currentGyro.current.beta * gyroIntensity;
      const gyroRotationY = currentGyro.current.gamma * gyroIntensity;
      
      groupRef.current.position.y = -currentScrollY.current * parallaxIntensity;
      groupRef.current.rotation.x = currentScrollY.current * rotationIntensity + gyroRotationX;
      groupRef.current.rotation.y = gyroRotationY;
      groupRef.current.rotation.z = Math.sin(currentScrollY.current * 0.001) * 0.02;
    }
  });

  const { nodes, connections } = useMemo(() => {
    // More nodes and wider spread to cover full screen width
    const nodeCount = isMobile ? 220 : 180;
    const spread = isMobile 
      ? { x: 28, y: 28, z: 8 } // Wider horizontal spread on mobile
      : { x: 45, y: 25, z: 12 }; // Much wider horizontal spread on desktop
    const maxConnectionDistance = isMobile ? 4 : 5; // Slightly increased for wider spread
    
    const nodeList = generateNetworkNodes(nodeCount, spread);
    const connectionList = generateConnections(nodeList, maxConnectionDistance);
    return { nodes: nodeList, connections: connectionList };
  }, [isMobile]);

  return (
    <group ref={groupRef}>
      <GoldNodes nodes={nodes} mouse={mouse} isMobile={isMobile} />
      <ConnectionLines connections={connections} mouse={mouse} isMobile={isMobile} />
    </group>
  );
}

// Main component
export default function NeuralNetwork3D() {
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  const [gyroscope, setGyroscope] = useState({ beta: 0, gamma: 0 });
  const [hasGyroscope, setHasGyroscope] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gyroscope / Device orientation handling
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        setHasGyroscope(true);
        // Normalize values: beta is front-back tilt (-180 to 180), gamma is left-right tilt (-90 to 90)
        // Clamp and normalize to -1 to 1 range
        const normalizedBeta = Math.max(-1, Math.min(1, (event.beta - 45) / 45)); // Center around 45 degrees (phone held at angle)
        const normalizedGamma = Math.max(-1, Math.min(1, event.gamma / 45));
        
        setGyroscope({
          beta: normalizedBeta,
          gamma: normalizedGamma,
        });
      }
    };

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, { passive: true });
          }
        } catch (error) {
          console.log('Gyroscope permission denied');
        }
      } else {
        // Non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile]);
  
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 10 : 12], fov: isMobile ? 70 : 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene isMobile={isMobile} scrollY={scrollY} gyroscope={gyroscope} />
      </Canvas>
    </div>
  );
}
