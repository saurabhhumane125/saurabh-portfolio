import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Fingerprint, ScanFace } from 'lucide-react';

/** Both layers share the portrait's coordinate space for a local face reveal. */
export default function MaskPortrait() {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const [touchReveal, setTouchReveal] = useState(false);
  const [position, setPosition] = useState(50);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!stage.current || (event.pointerType === 'touch' && !touchReveal)) return;
    const rect = stage.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pointer.current = { x, y, active: true };
    stage.current.style.setProperty('--reveal-x', `${x}px`);
    stage.current.style.setProperty('--reveal-y', `${y}px`);
    stage.current.style.setProperty('--reveal-radius', '96px');
    stage.current.dataset.revealing = 'true';
  }
  function reset() {
    pointer.current.active = false;
    if (!touchReveal && stage.current) {
      stage.current.style.setProperty('--reveal-radius', '0px');
      stage.current.dataset.revealing = 'false';
    }
  }
  useEffect(() => {
    if (!stage.current) return;
    stage.current.style.setProperty('--reveal-x', `${position}%`);
    stage.current.style.setProperty('--reveal-y', '43%');
    stage.current.style.setProperty('--reveal-radius', touchReveal ? '96px' : '0px');
    stage.current.dataset.revealing = String(touchReveal);
  }, [touchReveal, position]);

  useEffect(() => {
    const element = canvas.current;
    const host = stage.current;
    const context = element?.getContext('2d');
    if (!element || !host || !context) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, visible = false;
    const particles = Array.from({ length: 170 }, (_, i) => ({
      u: ((i * 73) % 173) / 173, v: ((i * 47) % 179) / 179,
      x: 0, y: 0, vx: 0, vy: 0, size: i % 3 === 0 ? 3 : 1.5,
    }));
    function resize() {
      width = host!.clientWidth; height = host!.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element!.width = Math.round(width * ratio); element!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.forEach(p => { p.x = p.u * width; p.y = p.v * height; });
    }
    function draw() {
      if (!visible || document.hidden || motion.matches) { frame = 0; return; }
      context!.clearRect(0, 0, width, height);
      const mouse = pointer.current;
      for (const p of particles) {
        const homeX = p.u * width, homeY = p.v * height;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (mouse.active && distance < 145 && distance > 0.1) {
          const force = (1 - distance / 145) * 3.5;
          p.vx += dx / distance * force; p.vy += dy / distance * force;
        }
        p.vx = (p.vx + (homeX - p.x) * .025) * .86;
        p.vy = (p.vy + (homeY - p.y) * .025) * .86;
        p.x += p.vx; p.y += p.vy;
        context!.fillStyle = mouse.active && distance < 180 ? '#ff525cbb' : '#f2ece729';
        context!.fillRect(p.x, p.y, p.size, p.size);
      }
      frame = requestAnimationFrame(draw);
    }
    const start = () => { if (visible && !document.hidden && !motion.matches && !frame) frame = requestAnimationFrame(draw); };
    const changeMotion = () => {
      if (motion.matches) { cancelAnimationFrame(frame); frame = 0; context.clearRect(0, 0, width, height); }
      else start();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host); resize();
    const intersection = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) { cancelAnimationFrame(frame); frame = 0; } else start();
    });
    intersection.observe(host);
    document.addEventListener('visibilitychange', start);
    motion.addEventListener('change', changeMotion);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); document.removeEventListener('visibilitychange', start); motion.removeEventListener('change', changeMotion); };
  }, []);

  return <div className="portrait-module">
    <div className="mask-stage" ref={stage} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <div className="identity-layer" role="img" aria-label="Saurabh Humane in a black T-shirt, revealed beneath a red web-pattern mask" />
      <div className="web-mask-layer" aria-hidden="true" />
      <canvas className="mask-particles" ref={canvas} aria-hidden="true" />
      <div className="reveal-reticle" aria-hidden="true" />
      <div className="mask-corner corner-tl" /><div className="mask-corner corner-br" />
      <span className="mask-top-label">IDENTITY / 001</span><span className="mask-side-label">SAURABH HUMANE</span>
      <div className="mask-instruction"><ScanFace size={16} /><span className="pointer-instruction">MOVE TO REVEAL</span><span className="touch-instruction">TOUCH TO REVEAL</span><span className="live-dot" /></div>
    </div>
    <div className="mask-controls"><button type="button" aria-pressed={touchReveal} aria-controls="reveal-position" onClick={() => setTouchReveal(!touchReveal)}><Fingerprint size={17} />{touchReveal ? 'Close reveal' : 'Explore the face'}</button><label className={touchReveal ? 'reveal-slider is-active' : 'reveal-slider'} htmlFor="reveal-position"><span>Reveal position</span><input id="reveal-position" type="range" min="12" max="88" value={position} disabled={!touchReveal} onChange={event => setPosition(Number(event.target.value))} /></label></div>
  </div>;
}
