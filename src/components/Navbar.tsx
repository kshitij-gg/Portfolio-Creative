import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

/**
 * NAVBAR — Floating pill capsule with 3D skeuomorphic buttons
 *
 * Desktop: Fully pill-shaped (border-radius: 999px) floating capsule.
 * Mobile: Hamburger → Full-screen glassmorphism overlay with animated links.
 */

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);

  // Track scroll depth for backdrop blur
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { label: 'ABOUT', href: '#we-believe' },
    { label: 'WORK', href: '#portfolio' },
    { label: 'CONTACT', href: '#collaborate', accent: true },
  ];

  return (
    <>
      <motion.nav
        className="absolute top-3 left-4 right-4 z-[200] flex items-center justify-between px-6 sm:px-10 h-[100px]"
        style={{
          borderRadius: '999px',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px) saturate(100%)',
          backgroundColor: scrolled ? 'rgba(14,14,14,0.8)' : 'rgba(14,14,14,0)',
          border: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : '0 4px 30px rgba(0,0,0,0)',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex flex-col text-left font-heading text-[28px] sm:text-[30px] leading-[0.85] whitespace-nowrap group"
          style={{ color: '#fff', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}
          aria-label="Back to top"
        >
          {/* Use flex justify-between to perfectly flush KSHITIJ to SATBHAI's natural width */}
           <div className="w-full flex justify-between" style={{ letterSpacing: '0', paddingRight: '0.02em' }}>
             {"KSHITIJ".split('').map((char, index) => (
               <span key={index}>{char}</span>
             ))}
           </div>
           <span style={{ letterSpacing: '-0.01em' }}>SATBHAI</span>
        </button>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#we-believe"
            className="btn-3d btn-3d-lightblue inline-flex items-center justify-center"
          >
            ABOUT
          </a>
          <a
            href="#portfolio"
            className="btn-3d btn-3d-yellow inline-flex items-center justify-center"
          >
            WORK
          </a>
          <a
            href="#collaborate"
            className="btn-3d btn-3d-pink inline-flex items-center justify-center"
            style={{ color: '#000' }}
          >
            CONTACT
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 relative z-[9999]"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block', width: 24, height: 1.5, backgroundColor: '#fff', borderRadius: 2, transformOrigin: 'center' }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block', width: 18, height: 1.5, backgroundColor: '#fff', borderRadius: 2 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block', width: 24, height: 1.5, backgroundColor: '#fff', borderRadius: 2, transformOrigin: 'center' }}
          />
        </button>
      </motion.nav>

      {/* ── FULL-SCREEN MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay md:hidden"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Background grain */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.03,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
              pointerEvents: 'none',
            }} />

            {/* Warm accent line top */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(244,139,41,0.8), transparent)' }} />

            {/* Nav Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%', padding: '0 24px' }}>
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  style={{ width: '100%', textAlign: 'center', borderBottom: idx < navItems.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.08 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 'clamp(60px, 14vw, 110px)',
                      lineHeight: 1.0,
                      letterSpacing: '0.02em',
                      fontWeight: 400,
                      color: item.accent ? '#F48B29' : '#fff',
                      textDecoration: 'none',
                      padding: '20px 0',
                      transition: 'color 0.2s, letter-spacing 0.2s',
                    }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = item.accent ? '#fff' : '#F48B29'; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = item.accent ? '#F48B29' : '#fff'; }}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Bottom branding */}
            <motion.div
              style={{ position: 'absolute', bottom: 48, left: 0, right: 0, textAlign: 'center' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
                Code · Camera · AI
              </p>
            </motion.div>

            {/* Warm accent line bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(244,139,41,0.8), transparent)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
