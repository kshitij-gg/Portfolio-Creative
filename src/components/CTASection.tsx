import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/MagneticButton';
import { motion, useInView } from 'framer-motion';

const CALENDLY_URL = 'https://calendly.com/operacreatives';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });

  const openCalendly = () => {
    // Try Calendly popup widget first, fallback to new tab
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />

      {/* ── Radial Glow ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.08), transparent 60%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Giant Watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-[22vw] md:text-[20vw] text-foreground/[0.025] uppercase leading-none whitespace-nowrap">
          CREATE
        </span>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 text-center">

        {/* Headline */}
        <motion.h2
          className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground max-w-5xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Let's Make Something{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Unforgettable</span>
            {/* Animated underline */}
            <motion.span
              className="absolute bottom-1 left-0 right-0 h-[3px] bg-accent rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
          .
        </motion.h2>

        <motion.p
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Your vision + my AI craft — let's bring it to life.
        </motion.p>

        {/* CTA Button — Book a Call via Calendly */}
        <motion.div
          className="mt-8 sm:mt-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.45 }}
        >
          <MagneticButton>
            <Button
              onClick={openCalendly}
              className="group bg-accent hover:bg-accent/90 text-white rounded-full px-10 sm:px-14 py-6 sm:py-8 text-base sm:text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_0_30px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_60px_hsl(var(--accent)/0.5)]"
            >
              Book a Call
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1.5" />
            </Button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Calendly popup widget CSS/JS — loads async */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <script src="https://assets.calendly.com/assets/external/widget.js" async />
    </section>
  );
};

export default CTASection;
