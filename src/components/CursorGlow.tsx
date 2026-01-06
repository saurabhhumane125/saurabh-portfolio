import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  // Smooth spring animations for cursor following
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleButtonHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isButton = target.closest('button') || target.closest('a');
      setIsHoveringButton(!!isButton);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleButtonHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleButtonHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHoveringButton ? 1.5 : 1,
            opacity: isHoveringButton ? 0.8 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent blur-md"
        />
      </motion.div>

      {/* Outer ring cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHoveringButton ? 2 : 1,
            borderColor: isHoveringButton ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-10 h-10 rounded-full border-2 border-primary/30"
        />
      </motion.div>

      {/* Trailing particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-40"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: [0.5, 0],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.05,
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
        </motion.div>
      ))}
    </>
  );
}
