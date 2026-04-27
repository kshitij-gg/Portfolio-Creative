import { useEffect, Suspense, lazy, useContext } from 'react';
import { IntroContext } from '@/contexts/IntroContext';

import HeroSection from '@/components/HeroSection';
import ScrollProgress from '@/components/ScrollProgress';
import SectionIndicator from '@/components/SectionIndicator';

// Lazy-loaded below-fold sections
const WeBelieveSection   = lazy(() => import('@/components/WeBelieveSection'));
const PortfolioSection   = lazy(() => import('@/components/PortfolioSection'));
const StaticAdsSection   = lazy(() => import('@/components/StaticAdsSection'));
const CollaborateSection = lazy(() => import('@/components/CollaborateSection'));
const Footer             = lazy(() => import('@/components/Footer'));

// PERF: Minimal invisible fallback — each section gets its own Suspense
// so one slow chunk loading doesn't flash the entire page.
const Fallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <span className="font-mono text-[10px] tracking-widest animate-pulse uppercase text-white/20">Loading…</span>
  </div>
);

/**
 * MeshGradientCanvas — Fixed dark background with slow-orbiting color orbs.
 * Rendered ONCE at the page level, behind all sections (z-index: 0).
 */
const MeshGradientCanvas = () => (
  <div id="mesh-gradient-canvas" aria-hidden>
    <div className="mesh-orb mesh-orb-1" />
    <div className="mesh-orb mesh-orb-2" />
    <div className="mesh-orb mesh-orb-3" />
    <div className="mesh-orb mesh-orb-4" />
  </div>
);

const Index = () => {
  const introDone = useContext(IntroContext);

  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
  }, []);

  // Pause mesh orb GPU animations whenever hero scrolls out of view.
  // The orbs are fixed behind all sections – only visible in the hero.
  // Every other section covers them with a solid opaque background.
  useEffect(() => {
    const canvas = document.getElementById('mesh-gradient-canvas');
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const state = entry.isIntersecting ? 'running' : 'paused';
        canvas.querySelectorAll<HTMLElement>('.mesh-orb').forEach(orb => {
          orb.style.animationPlayState = state;
        });
      },
      { threshold: 0 }
    );

    // Observe the hero section element
    const hero = document.getElementById('hero');
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── GLOBAL MESH GRADIENT BACKGROUND ── */}
      <MeshGradientCanvas />

      {/* Global chrome — hidden during intro to prevent bleed-through */}
      <div
        style={{
          opacity: introDone ? 1 : 0,
          pointerEvents: introDone ? 'auto' : 'none',
          transition: 'opacity 0.8s ease',
        }}
      >
        <ScrollProgress />
        <SectionIndicator />
      </div>

      {/* ── THE OPERA — 7 ACTS ────────────────────────────────── */}
      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* ACT 1 — HERO (not lazy — above the fold, must render immediately) */}
        <HeroSection />

        {/* ACT 4 — OUR WORK — pure white */}
        <Suspense fallback={<Fallback />}>
          <PortfolioSection />
        </Suspense>

        {/* ACT 4b — STATIC ADS — floating portrait gallery */}
        <Suspense fallback={<Fallback />}>
          <StaticAdsSection />
        </Suspense>

        {/* ACT 3 — WE BELIEVE / Craft & Fidelity */}
        <Suspense fallback={<Fallback />}>
          <WeBelieveSection />
        </Suspense>

        {/* ACT 6 — COLLABORATE — bright yellow #FFE066 */}
        <Suspense fallback={<Fallback />}>
          <CollaborateSection />
        </Suspense>

        {/* ACT 7 — FOOTER — warm cream #F5F0E8 */}
        <Suspense fallback={<Fallback />}>
          <Footer />
        </Suspense>

      </main>
    </>
  );
};

export default Index;
