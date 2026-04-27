import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * INTRO ANIMATION — Countdown Shutter
 *
 * 1. "3" punches in (large, orange, Bebas Neue)
 * 2. "2" replaces it with a fast scale transition
 * 3. "1" replaces it
 * 4. Number disappears — the screen is now 4 black triangular panels
 *    meeting at the center (top / right / bottom / left)
 * 5. All 4 panels simultaneously EXPLODE outward like a camera shutter:
 *      ▲ Top    → flies straight up
 *      ▶ Right  → flies straight right
 *      ▼ Bottom → flies straight down
 *      ◀ Left   → flies straight left
 * 6. Hero video (already preloaded) fades in cleanly behind
 *
 * Colors: White panels, yellow numbers — bold and high-contrast.
 *
 * Total duration: ~2.9s
 */

// ── The 4 shutter panels ────────────────────────────────────────────────────
// clip-path cuts each panel into a triangle meeting at center (50% 50%)
const PANELS = [
  {
    id:    'top',
    clip:  'polygon(0% 0%, 100% 0%, 50% 50%)',
    exit:  { y: '-105%', x: 0 },
  },
  {
    id:    'right',
    clip:  'polygon(100% 0%, 100% 100%, 50% 50%)',
    exit:  { x: '105%', y: 0 },
  },
  {
    id:    'bottom',
    clip:  'polygon(100% 100%, 0% 100%, 50% 50%)',
    exit:  { y: '105%', x: 0 },
  },
  {
    id:    'left',
    clip:  'polygon(0% 100%, 0% 0%, 50% 50%)',
    exit:  { x: '-105%', y: 0 },
  },
];

// ── Main component ───────────────────────────────────────────────────────────
const IntroLoader = ({ onDone }: { onDone: () => void }) => {
  const [count,    setCount]    = useState<'3' | '2' | '1' | null>('3');
  const [breaking, setBreaking] = useState(false);
  const [mounted,  setMounted]  = useState(true);

  useEffect(() => {
    const timers = [
      // Each number holds for ~650ms then swaps
      setTimeout(() => setCount('2'),       650),
      setTimeout(() => setCount('1'),       1300),
      // Number exits, brief pause, then panels erupt
      setTimeout(() => setCount(null),      1950),
      setTimeout(() => setBreaking(true),   2050),
      // Give panels 550ms to clear before calling onDone
      setTimeout(() => { setMounted(false); onDone(); }, 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  if (!mounted) return null;

  return (
    <>
      {/* ── SHUTTER PANELS ─────────────────────────────────────────────── */}
      {PANELS.map((panel) => (
        <motion.div
          key={panel.id}
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         99998,
            clipPath:       panel.clip,
            background:     '#EDE8DF',
            pointerEvents:  'none',
            willChange:     'transform',
          }}
          animate={breaking ? panel.exit : { x: 0, y: 0 }}
          transition={{
            duration: 0.52,
            ease:     [0.55, 0, 1, 0.45], // sharp accelerate → fast exit
          }}
        />
      ))}

      {/* ── DIAGONAL SEAM LINES — thin orange hairlines at the X seams ── 
          They flash in just before the break, then ride out with the panels.
          Pure cinematic polish — makes the split look intentional.          */}
      <motion.svg
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        99999,
          pointerEvents: 'none',
          width:         '100%',
          height:        '100%',
        }}
        animate={
          breaking
            ? { opacity: 0 }
            : count === null
              ? { opacity: 1 }
              : { opacity: 0 }
        }
        transition={{ duration: 0.08 }}
      >
        {/* TL→BR diagonal */}
        <line
          x1="0%" y1="0%"    x2="50%" y2="50%"
          stroke="#222222" strokeWidth="1.2" strokeOpacity="0.4"
        />
        <line
          x1="100%" y1="0%"  x2="50%" y2="50%"
          stroke="#222222" strokeWidth="1.2" strokeOpacity="0.4"
        />
        <line
          x1="0%"   y1="100%" x2="50%" y2="50%"
          stroke="#222222" strokeWidth="1.2" strokeOpacity="0.4"
        />
        <line
          x1="100%" y1="100%" x2="50%" y2="50%"
          stroke="#222222" strokeWidth="1.2" strokeOpacity="0.4"
        />
      </motion.svg>

      {/* ── COUNTDOWN NUMBER ────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {count && (
          <motion.div
            key={count}
            style={{
              position:       'fixed',
              inset:          0,
              zIndex:         100000,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              pointerEvents:  'none',
            }}
            initial={{ opacity: 0, scale: 0.55, y: 30  }}
            animate={{ opacity: 1, scale: 1,    y: 0   }}
            exit={{    opacity: 0, scale: 1.45,  y: -24 }}
            transition={{
              duration: 0.24,
              ease:     [0.16, 1, 0.3, 1],
            }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily:    "'Bebas Neue', sans-serif",
                fontSize:      'clamp(150px, 26vw, 300px)',
                lineHeight:    1,
                color:         '#111111',
                letterSpacing: '-0.01em',
                userSelect:    'none',
              }}
            >
              {count}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IntroLoader;
