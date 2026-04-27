import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ── Image Imports ─────────────────────────────────────────────────────────────
// These are just URL strings — actual image bytes are fetched lazily by <img>.
const upperLayerModules  = import.meta.glob('../assets/upper-layer/*.{jpg,jpeg,png,webp}',  { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const bottomLayerModules = import.meta.glob('../assets/bottom-layer/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const UPPER_LAYER_URLS   = Object.values(upperLayerModules).slice(0, 14);
const BOTTOM_LAYER_URLS  = Object.values(bottomLayerModules).slice(0, 14);

const FALLBACK_META = [
  { title: 'LUXURY ESSENTIALS', category: 'Product · AI',          note: '"Generated pure product aesthetics."' },
  { title: 'SILK & SHADOW',     category: 'Fashion · Portrait',     note: '"Cinematic lighting meets haute couture."' },
  { title: 'AURIC GLOW',        category: 'Beauty · Portrait',      note: '"AI skin. Human soul."' },
  { title: 'AMBER RITUAL',      category: 'Fragrance · Still Life', note: '"The scent of something rare."' },
  { title: 'VOID THEORY',       category: 'Fashion · Concept',      note: '"Absence as a design element."' },
  { title: 'ZENITH DROP',       category: 'Streetwear · Editorial', note: '"Culture at its peak."' },
  { title: 'VELVET CRUSH',      category: 'Fashion · Campaign',     note: '"Luxury distilled into pixels."' },
  { title: 'GOLDEN HOUR',       category: 'Lifestyle · Campaign',   note: '"Every second is cinematic."' },
  { title: 'CHROME NOIR',       category: 'Automotive · Editorial', note: '"Where machines become art."' },
  { title: 'COBALT RUSH',       category: 'Sports · Campaign',      note: '"Performance visualised."' },
  { title: 'EMBER',             category: 'Spirits · Campaign',     note: '"Heat you can taste."' },
  { title: 'OBSIDIAN',          category: 'Tech · Product',         note: '"Dark matter, premium feel."' },
];

const buildRow = (urls: string[], startId: number) =>
  urls.map((url, i) => {
    const meta = FALLBACK_META[i % FALLBACK_META.length];
    return { id: startId + i, title: meta.title, category: meta.category, note: meta.note, image: url };
  });

const ROW1 = buildRow(UPPER_LAYER_URLS, 1);
const ROW3 = buildRow(BOTTOM_LAYER_URLS, 17);
// ROW2 fallback: mix of ROW1 + ROW3 items, used if middle section folder is empty
const ROW2 = buildRow([...UPPER_LAYER_URLS, ...BOTTOM_LAYER_URLS].slice(0, 12), 100);

type LightboxItem = { src: string; title: string; category: string; note: string } | null;

// ── Lightbox ──────────────────────────────────────────────────────────────────
const Lightbox = ({ item, onClose }: { item: LightboxItem; onClose: () => void }) => {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div key="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }}
        >
          <button onClick={onClose} aria-label="Close"
            style={{ position: 'absolute', top: 20, right: 24, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: 44, height: 44, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <motion.img src={item.src} alt="Portfolio Item Expanded"
            initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 40px 120px rgba(0,0,0,0.8)', cursor: 'default' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Static Card ───────────────────────────────────────────────────────────────
// PERF: No `contain`, no `willChange` on individual cards.
// The animation runs on the parent track via translate3d — the browser
// composites the entire track as one GPU layer, not 22 separate layers.
const StaticCard = memo(({ item }: { item: typeof ROW1[0] }) => (
  <div
    className="group relative overflow-hidden flex-shrink-0"
    style={{
      height:       'clamp(380px, 44vh, 600px)',
      aspectRatio:  '3/4',
      borderRadius: 10,
      marginRight:  14,
      cursor:       'default',
    }}
  >
    <img
      src={item.image}
      alt="Portfolio Item"
      loading="lazy"
      decoding="async"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center',
        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: 'none',
      }}
      className="group-hover:scale-[1.06]"
    />
  </div>
));

// ── Marquee Row (images only) ─────────────────────────────────────────────────
// PERF: Track is a single GPU layer via translate3d.
// Individual cards are NOT promoted — they piggyback on the track's layer.
// `willChange: transform` is on the TRACK only, not on children.
const MarqueeRow = ({
  items,
  direction = 'left',
  speed = 40,
  paused = false,
}: {
  items: typeof ROW1;
  direction?: 'left' | 'right';
  speed?: number;
  paused?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const doubled = [...items, ...items];
  const animName = direction === 'left' ? 'marq-left' : 'marq-right';
  const shouldPause = paused || isHovered;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: 'hidden', width: '100%', flexShrink: 0 }}
    >
      <div style={{
        display:            'flex',
        width:              'max-content',
        animation:          `${animName} ${speed}s linear infinite`,
        animationPlayState: shouldPause ? 'paused' : 'running',
        willChange:         'transform',
      }}>
        {doubled.map((item, i) => <StaticCard key={`${item.id}-${i}`} item={item} />)}
      </div>
    </div>
  );
};

// ── Media Card (still poster → plays on hover) ──────────────────────────────
// ── Media Card (Continuous Autoplay) ──────────────────────────────────────────
// simplified to act like continuously looping GIFs as requested
const MediaCard = memo(({ url }: { url: string }) => {
  const isVideo  = url.includes('.webm') || url.includes('.mp4') || url.includes('.gif');

  return (
    <div
      className="group relative overflow-hidden flex-shrink-0 bg-neutral-900"
      style={{ height: 'clamp(380px, 44vh, 600px)', aspectRatio: '3/4', borderRadius: 10, marginRight: 14 }}
    >
      {isVideo ? (
        <video
          src={url}
          autoPlay
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="group-hover:scale-[1.04]"
        />
      ) : (
        <img
          src={url} loading="lazy" alt="Media Item"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="group-hover:scale-[1.04]"
        />
      )}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
    </div>
  );
});


// ── Marquee Video Row ─────────────────────────────────────────────────────────
const MarqueeVideoRow = ({
  urls,
  direction = 'left',
  speed = 40,
  paused = false,
}: {
  urls: string[];
  direction?: 'left' | 'right';
  speed?: number;
  paused?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 4 copies is exactly enough. Much lighter for browser memory.
  const repeated = [...urls, ...urls, ...urls, ...urls];
  
  // Since we have 4 copies, shifting exactly 25% translates perfectly 1 copy width.
  const animName = 'marq-left-25';
  const shouldPause = paused || isHovered;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: 'hidden', width: '100%', flexShrink: 0 }}
    >
      <div style={{
        display:            'flex',
        width:              'max-content',
        animation:          `${animName} ${speed}s linear infinite`,
        animationPlayState: shouldPause ? 'paused' : 'running',
        willChange:         'transform',
      }}>
        {repeated.map((url, i) => <MediaCard key={i} url={url} />)}
      </div>
    </div>
  );
};

// Lazy-import video URLs — early parsed
const videoModules = import.meta.glob('./static_ads_middle_section/*.{webm,mp4,gif}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

// Use EXACTLY 5 videos as requested.
const VIDEO_URLS = Object.values(videoModules).slice(0, 5);

// Shared keyframe stylesheet — injected once globally
const MARQUEE_STYLES = `
  @keyframes marq-left     { from { transform: translate3d(0,0,0);    } to { transform: translate3d(-50%,0,0); } }
  @keyframes marq-left-25  { from { transform: translate3d(0,0,0);    } to { transform: translate3d(-25%,0,0); } }
  @keyframes marq-right    { from { transform: translate3d(-50%,0,0); } to { transform: translate3d(0,0,0);    } }
`;

// ── Main Section ──────────────────────────────────────────────────────────────
const StaticAdsSection = () => {
  const ref    = useRef<HTMLElement>(null);
  // Wider rootMargin so animations pause WELL before reaching the viewport edge.
  // This prevents the stutter of starting/stopping right at the boundary.
  const inView = useInView(ref, { once: false, margin: '200px 0px' });
  // ── STAGGERED LAZY MOUNT ────────────────────────────────────────────
  // Rows mount one at a time when the section first enters the viewport.
  // useRef flag prevents re-triggering on subsequent inView toggles.
  const [row1Ready, setRow1Ready] = useState(false);
  const [row2Ready, setRow2Ready] = useState(false);
  const [row3Ready, setRow3Ready] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!inView || hasMounted.current) return;
    hasMounted.current = true;
    // Stagger each row by 80ms so they don't all hit the DOM simultaneously
    setRow1Ready(true);
    const t1 = setTimeout(() => setRow2Ready(true), 80);
    const t2 = setTimeout(() => setRow3Ready(true), 160);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView]);



  const marqueesPaused = !inView;

  return (
    <section
      ref={ref}
      id="static-ads"
      data-section="3b"
      data-bg="#0A0A0A"
      style={{
        backgroundColor: '#0A0A0A',
        paddingBottom:   80,
        borderTop:       '1px solid rgba(255,255,255,0.1)',
        overflow:        'hidden',
      }}
    >
      <style>{MARQUEE_STYLES}</style>

      {/* ── Section header ── */}
      <motion.div
        className="w-full mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-14"
        style={{ maxWidth: '1800px', position: 'relative', zIndex: 10 }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#F48B29] block mb-3">■ Static Ads</span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(3.5rem, 9vw, 130px)', lineHeight: 0.88, color: '#FFFFFF' }}>
              STILL.<br />STRIKING.
            </h2>
          </div>
          <p className="font-body text-[15px] text-[#A0A0A0] max-w-sm" style={{ fontStyle: 'italic', lineHeight: 1.65 }}>
            Every frame is a decision. AI-generated static visuals crafted for scroll-stopping precision — no cameras, all intent.
          </p>
        </div>
      </motion.div>

      {/* ── Marquee rows — stagger-mounted ── */}
      <div
        style={{
          position:        'relative',
          left:            '50%',
          transform:       'translateX(-50%)',
          width:           '100vw',
          backgroundColor: '#0a0a0a',
          display:         'flex',
          flexDirection:   'column',
          gap:             '16px',
          padding:         '48px 0',
          marginTop:       '40px',

        }}
      >
        {row1Ready && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <MarqueeRow items={ROW1} direction="right" speed={50} paused={marqueesPaused} />
          </motion.div>
        )}

        {row2Ready && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            {VIDEO_URLS.length > 0 ? (
              <MarqueeVideoRow
                urls={VIDEO_URLS}
                direction="left"
                speed={60}
                paused={marqueesPaused}
              />
            ) : (
              <MarqueeRow items={ROW2} direction="left" speed={45} paused={marqueesPaused} />
            )}
          </motion.div>
        )}

        {row3Ready && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <MarqueeRow items={ROW3} direction="right" speed={55} paused={marqueesPaused} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default StaticAdsSection;
