import { useContext, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { IntroContext } from '../contexts/IntroContext';
import Navbar from './Navbar';
import heroVideoUrl from '../assets/hero-video.mp4';

/**
 * HERO SECTION
 * - Local video file is used as background (no YouTube/Vimeo iframe overhead).
 * - muted + autoPlay = browser allows autoplay with no user gesture required.
 * - Video is paused when the hero scrolls out of view to save GPU.
 * - Section stays invisible during intro animation, then fades in via IntroContext.
 */
const HeroSection = () => {
  const introDone = useContext(IntroContext);
  const heroRef   = useRef<HTMLElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);

  // Pause when scrolled away, resume when back — saves GPU on long pages
  const isInView = useInView(heroRef, { once: false, amount: 0 });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isInView) {
      v.play().catch(() => {}); // catch in case browser blocks mid-scroll
    } else {
      v.pause();
    }
  }, [isInView]);

  return (
    <motion.section
      id="hero"
      ref={heroRef}
      data-section="0"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: introDone ? 1 : 0 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
    >
      {/* ── NAVBAR — lives inside the hero, scrolls away with it ── */}
      <Navbar />

      {/* ── FULLSCREEN BACKGROUND VIDEO ──
          Native <video> — no iframe overhead, starts buffering immediately,
          muted so browsers allow autoplay without user gesture, silent always. */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          ref={videoRef}
          src={heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position:   'absolute',
            top:        '50%',
            left:       '50%',
            width:      '100vw',
            height:     '56.25vw',   // 16:9 relative to width
            minHeight:  '100vh',
            minWidth:   '177.77vh',  // 16:9 relative to height
            transform:  'translate(-50%, -50%)',
            objectFit:  'cover',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center h-full">
        <motion.div
          className="flex flex-col max-w-5xl pt-20"
          initial="hidden"
          animate={introDone ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
          }}
        >
          {/* Line 1 — "I CREATE" */}
          <motion.span
            className="font-heading tracking-tight block"
            style={{
              fontSize:   'clamp(3rem, 6.2vw, 82px)',
              lineHeight: 0.92,
              color:      'rgba(255,255,255,0.72)',
            }}
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }}
          >
            I CREATE
          </motion.span>

          {/* Line 2 — "HIGH-QUALITY" */}
          <motion.span
            className="font-heading tracking-tight block"
            style={{
              fontSize:   'clamp(3rem, 6.2vw, 82px)',
              lineHeight: 0.92,
              color:      '#FFFFFF',
              textShadow: '0 10px 40px rgba(0,0,0,0.5)',
            }}
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }}
          >
            HIGH&#8209;QUALITY
          </motion.span>

          {/* Line 3 — "AI VISUALS" */}
          <motion.span
            className="font-heading tracking-tight block"
            style={{
              fontSize:   'clamp(3rem, 6.2vw, 82px)',
              lineHeight: 0.92,
              color:      '#FFFFFF',
              textShadow: '0 10px 40px rgba(0,0,0,0.5)',
            }}
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }}
          >
            AI VISUALS
          </motion.span>

          {/* Line 4 — accent line, the kicker */}
          <motion.span
            className="font-heading tracking-tight block"
            style={{
              fontSize:   'clamp(3rem, 6.2vw, 82px)',
              lineHeight: 0.92,
              color:      '#FFE500',
              textShadow: '0 8px 32px rgba(255,229,0,0.3)',
            }}
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }}
          >
            THAT ACTUALLY SELL.
          </motion.span>
        </motion.div>
      </div>



    </motion.section>
  );
};

export default HeroSection;

