import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from '@/vendor/gsap';

/**
 * SmoothScroll — Lenis driven by GSAP ticker.
 *
 * • Using gsap.ticker ensures Lenis and all GSAP ScrollTriggers share ONE
 *   requestAnimationFrame loop — eliminates the dual-rAF overhead.
 * • lerp 0.12 gives a smooth but responsive scroll (0.07 was too sluggish).
 * • duration 1.1 keeps the glide without feeling laggy.
 *
 * BUG FIX: The previous cleanup created a NEW anonymous function, so
 * gsap.ticker.remove() never matched the original callback. This caused
 * old Lenis instances to pile up on every React re-mount (especially in
 * StrictMode), each running its own rAF loop and fighting for scroll control.
 * Now we store the callback reference so cleanup actually works.
 */
const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.18,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.0,
    });

    // Store the callback so we can remove the SAME reference on cleanup
    const onTick = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // prevent GSAP from dropping frames after tab focus

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
