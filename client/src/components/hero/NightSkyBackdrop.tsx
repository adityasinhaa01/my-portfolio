import { useEffect, useRef, type FC } from 'react';

interface NightSkyBackdropProps {
  prefersReducedMotion: boolean;
}

export const NightSkyBackdrop: FC<NightSkyBackdropProps> = ({ prefersReducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    let layer: HTMLCanvasElement | null = null;
    let twinklers: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      color: string;
      speed: number;
      phase: number;
    }> = [];
    let animId = 0;
    let isVisible = true;

    const mulberry32 = (seed: number) => () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const build = () => {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      layer = document.createElement('canvas');
      layer.width = canvas.width;
      layer.height = canvas.height;
      const l = layer.getContext('2d');
      if (!l) return;
      l.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rnd = mulberry32(20261014);
      const unit = width / 1672;

      // Deep cosmic void
      const bg = l.createRadialGradient(
        width * 0.16,
        height * 0.12,
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.95
      );
      bg.addColorStop(0, '#1a1410');
      bg.addColorStop(0.35, '#08090f');
      bg.addColorStop(1, '#030407');
      l.fillStyle = bg;
      l.fillRect(0, 0, width, height);

      // Milky Way
      const p0 = { x: width * 0.06, y: -height * 0.04 };
      const p1 = { x: width * 0.47, y: height * 0.50 };
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const len = Math.hypot(dx, dy);
      const nx = -dy / len;
      const ny = dx / len;
      const gauss = () => (rnd() + rnd() + rnd() + rnd() - 2) / 2;

      const blob = (x: number, y: number, r: number, rgb: string, a: number) => {
        const g = l.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${rgb}, ${a})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        l.fillStyle = g;
        l.beginPath();
        l.arc(x, y, r, 0, Math.PI * 2);
        l.fill();
      };

      l.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 300; i++) {
        const t = rnd();
        const spread = gauss() * width * 0.07 * (0.6 + 0.6 * Math.sin(t * Math.PI));
        blob(
          p0.x + dx * t + nx * spread,
          p0.y + dy * t + ny * spread,
          (16 + rnd() * 80) * unit,
          '222, 150, 92',
          0.035 + rnd() * 0.07
        );
      }
      l.globalCompositeOperation = 'source-over';
      for (let i = 0; i < 190; i++) {
        const t = rnd();
        const spread = gauss() * width * 0.05;
        blob(
          p0.x + dx * t + nx * spread,
          p0.y + dy * t + ny * spread,
          (10 + rnd() * 52) * unit,
          '5, 4, 5',
          0.22 + rnd() * 0.3
        );
      }

      // Stars
      const tones = ['#fff9f0', '#f5e6d0', '#e3e9ff', '#ffdcb5'];
      const starCount = Math.min(Math.floor((width * height) / 1500), 1100);
      twinklers = [];
      for (let i = 0; i < starCount; i++) {
        let x: number;
        let y: number;
        if (i % 3 === 0) {
          const t = rnd();
          const spread = gauss() * width * 0.09;
          x = p0.x + dx * t + nx * spread;
          y = p0.y + dy * t + ny * spread;
        } else {
          x = rnd() * width;
          y = rnd() * height;
        }
        const size = rnd() < 0.9 ? rnd() * 1.1 + 0.35 : rnd() * 1.8 + 1.0;
        const alpha = rnd() * 0.65 + 0.2;
        const color = tones[i % tones.length];
        if (rnd() < 0.14) {
          twinklers.push({
            x,
            y,
            size,
            alpha,
            color,
            speed: rnd() * 1.2 + 0.4,
            phase: rnd() * Math.PI * 2
          });
        } else {
          l.globalAlpha = alpha;
          l.fillStyle = color;
          l.beginPath();
          l.arc(x, y, size, 0, Math.PI * 2);
          l.fill();
        }
      }
      l.globalAlpha = 1;
    };

    const draw = (timeMs: number) => {
      if (!layer) return;
      const t = timeMs * 0.001;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(layer, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (let i = 0; i < twinklers.length; i++) {
        const s = twinklers[i];
        ctx.globalAlpha = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Sun flare in the corner
      const swell = 0.88 + 0.12 * Math.sin(t * 0.45);
      const sx = 0;
      const sy = height * 0.05;
      ctx.globalCompositeOperation = 'lighter';
      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, width * 0.38);
      glow.addColorStop(0, `rgba(255, 244, 224, ${0.78 * swell})`);
      glow.addColorStop(0.06, `rgba(247, 196, 132, ${0.40 * swell})`);
      glow.addColorStop(0.22, `rgba(196, 125, 68, ${0.12 * swell})`);
      glow.addColorStop(0.55, 'rgba(90, 52, 28, 0.03)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width * 0.5, height * 0.62);

      const streaks: [number, number, number][] = [
        [0, 0.30, 0.020],
        [38, 0.18, 0.016],
        [-32, 0.14, 0.016],
        [90, 0.12, 0.014]
      ];
      streaks.forEach(([deg, reach, thin]) => {
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.scale(1, thin);
        const streak = ctx.createRadialGradient(0, 0, 0, 0, 0, width * reach);
        streak.addColorStop(0, `rgba(255, 232, 196, ${0.55 * swell})`);
        streak.addColorStop(1, 'rgba(255, 232, 196, 0)');
        ctx.fillStyle = streak;
        ctx.beginPath();
        ctx.arc(0, 0, width * reach, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      ctx.globalCompositeOperation = 'source-over';
    };

    build();
    draw(prefersReducedMotion ? 0 : performance.now());

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        draw(performance.now());
      }, 120);
    };
    window.addEventListener('resize', handleResize);

    let observer: IntersectionObserver | null = null;
    if (!prefersReducedMotion) {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { isVisible = e.isIntersecting; }),
        { threshold: 0.01 }
      );
      observer.observe(canvas);
      const loop = (now: number) => {
        animId = requestAnimationFrame(loop);
        if (isVisible) draw(now);
      };
      animId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="sky-in absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
};
