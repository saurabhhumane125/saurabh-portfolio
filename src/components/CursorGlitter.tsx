import { useEffect, useRef } from 'react';

export default function CursorGlitter() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!element || !context) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0, height = 0, frame = 0, lastTime = 0;
    let particles: { homeX: number; homeY: number; x: number; y: number; vx: number; vy: number; size: number; phase: number }[] = [];

    function paint(time: number) {
      const step = Math.min((time - lastTime) / 16.67 || 1, 2);
      lastTime = time;
      context!.clearRect(0, 0, width, height);
      for (const p of particles) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = pointer.active ? Math.max(0, 1 - distance / 210) : 0;
        if (!motion.matches) {
          if (influence > 0 && distance > .1) {
            p.vx += dx / distance * influence * 1.8 * step;
            p.vy += dy / distance * influence * 1.8 * step;
          }
          p.vx = (p.vx + (p.homeX - p.x) * .016 * step) * Math.pow(.91, step);
          p.vy = (p.vy + (p.homeY - p.y) * .016 * step) * Math.pow(.91, step);
          p.x += p.vx * step; p.y += p.vy * step;
        }
        const twinkle = motion.matches ? .5 : .5 + .5 * Math.sin(time * .0015 + p.phase);
        const alpha = .19 + twinkle * .18 + influence * .55;
        const size = p.size + influence * .8;
        const drift = motion.matches ? 0 : Math.sin(time * .00045 + p.phase) * 2;
        context!.fillStyle = influence > .15 ? `rgba(255,111,119,${alpha})` : `rgba(235,234,241,${alpha})`;
        context!.beginPath();
        context!.arc(p.x, p.y + drift, size, 0, Math.PI * 2);
        context!.fill();
        if (influence > .4 && p.size > 1.1) {
          context!.strokeStyle = `rgba(255,192,196,${influence * .6})`;
          context!.lineWidth = .65;
          context!.beginPath();
          context!.moveTo(p.x - 4, p.y + drift); context!.lineTo(p.x + 4, p.y + drift);
          context!.moveTo(p.x, p.y + drift - 4); context!.lineTo(p.x, p.y + drift + 4);
          context!.stroke();
        }
      }
    }
    function draw(time: number) {
      frame = 0;
      if (document.hidden || motion.matches) return;
      paint(time);
      frame = requestAnimationFrame(draw);
    }
    function start() {
      if (!frame && !document.hidden && !motion.matches) { lastTime = performance.now(); frame = requestAnimationFrame(draw); }
    }
    function resize() {
      width = window.innerWidth; height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element!.width = Math.round(width * ratio); element!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(340, Math.max(85, Math.round(width * height / 3800)));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width, y = Math.random() * height;
        return { homeX: x, homeY: y, x, y, vx: 0, vy: 0, size: .55 + Math.random() * .85, phase: Math.random() * Math.PI * 2 };
      });
      paint(performance.now()); start();
    }
    function move(event: PointerEvent) {
      if (event.pointerType === 'touch') return;
      pointer.x = event.clientX; pointer.y = event.clientY; pointer.active = true;
    }
    function reset() { pointer.active = false; }
    function leave(event: MouseEvent) { if (!event.relatedTarget) reset(); }
    function visibility() {
      if (document.hidden || motion.matches) {
        cancelAnimationFrame(frame); frame = 0; reset();
        if (motion.matches) paint(performance.now());
      } else start();
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('mouseout', leave);
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', visibility);
    motion.addEventListener('change', visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mouseout', leave);
      window.removeEventListener('blur', reset);
      document.removeEventListener('visibilitychange', visibility);
      motion.removeEventListener('change', visibility);
    };
  }, []);

  return <canvas className="cursor-glitter" ref={canvas} aria-hidden="true" />;
}
