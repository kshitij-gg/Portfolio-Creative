import { useEffect, useRef, useState } from 'react';

/**
 * CUSTOM CURSOR — Physics Spring Cursor
 *
 * Two-layer cursor:
 * 1. DOT   — snaps exactly to mouse position (no lag)
 * 2. RING  — follows with spring physics (lerp 0.12) for a fluid lag effect
 *
 * Hover state: Ring expands & fills slightly when over interactive elements.
 * Performance: Uses requestAnimationFrame + CSS transform3d (GPU compositor only).
 * Mobile: Hidden on touch devices.
 */

const LERP = 0.10; // Lower = more lag / spring feel

const CustomCursor = () => {
  const ringRef  = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const posRef   = useRef({ x: -100, y: -100 }); // current interpolated ring pos
  const mouseRef = useRef({ x: -100, y: -100 }); // raw mouse pos
  const rafId    = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const [hidden,  setHidden]  = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Hide on touch devices — cursor is meaningless there
    if ('ontouchstart' in window) { setHidden(true); return; }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Snap DOT immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Detect interactive elements
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = el?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]');
      setHovered(!!isInteractive);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp   = () => setClicked(false);
    const onMouseOut  = (e: MouseEvent) => { if (!e.relatedTarget) setHidden(true); };
    const onMouseIn   = () => setHidden(false);

    document.addEventListener('mousemove',  onMouseMove);
    document.addEventListener('mousedown',  onMouseDown);
    document.addEventListener('mouseup',    onMouseUp);
    document.addEventListener('mouseleave', onMouseOut);
    document.addEventListener('mouseenter', onMouseIn);

    // Spring animation loop for the ring
    const animate = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * LERP;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * LERP;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove',  onMouseMove);
      document.removeEventListener('mousedown',  onMouseDown);
      document.removeEventListener('mouseup',    onMouseUp);
      document.removeEventListener('mouseleave', onMouseOut);
      document.removeEventListener('mouseenter', onMouseIn);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Trailing ring — spring physics */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width:  hovered ? 52 : 36,
          height: hovered ? 52 : 36,
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? 'rgba(255,75,110,0.7)' : 'rgba(255,255,255,0.45)'}`,
          backgroundColor: hovered ? 'rgba(255,75,110,0.08)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, opacity 0.2s ease',
          opacity: clicked ? 0.6 : 1,
          backdropFilter: hovered ? 'blur(4px)' : 'none',
          mixBlendMode: 'normal',
        }}
      />
      {/* Sharp dot — exact position */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width:  clicked ? 6 : (hovered ? 4 : 5),
          height: clicked ? 6 : (hovered ? 4 : 5),
          borderRadius: '50%',
          backgroundColor: hovered ? '#FF4B6E' : '#ffffff',
          pointerEvents: 'none',
          zIndex: 1000000,
          willChange: 'transform',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.2s ease',
          boxShadow: hovered ? '0 0 8px rgba(255,75,110,0.8)' : '0 0 4px rgba(255,255,255,0.6)',
        }}
      />
    </>
  );
};

export default CustomCursor;
