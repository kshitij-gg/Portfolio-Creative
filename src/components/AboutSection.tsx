import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// SVG: A guy handling multiple screens, working with ease, relaxing.
const MultiScreenMaestroSVG = ({ className }: { className?: string }) => (
  <img 
    src="/creator-silhouette.png" 
    alt="Creator Silhouette" 
    className={`w-full h-auto max-w-sm mx-auto object-contain ${className || ''}`}
    style={{ filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.15))" }}
  />
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-15%' });

  return (
    <section
      id="about"
      data-section="4"
      data-bg="#FFF3E0"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#FFF3E0',
        color: '#111',
        minHeight: '80vh',
      }}
    >
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: SVG character handling multiple screens */}
          <motion.div
            className="flex justify-center lg:justify-start order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          >
            <MultiScreenMaestroSVG />
          </motion.div>

          {/* RIGHT: Copy */}
          <motion.div
            className="flex flex-col order-1 lg:order-2"
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
          >
            <motion.span
              className="font-mono text-[10px] tracking-[0.25em] uppercase mb-5 block"
              style={{ color: '#F48B29' }}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            >
              ■ About Me
            </motion.span>

            <motion.h2
              className="font-heading tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 90px)', lineHeight: 0.90, color: '#111' }}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } }}
            >
              EVERY PIXEL.<br />EVERY FRAME.<br />
              <span style={{ color: '#F48B29' }}>INTENTIONAL.</span>
            </motion.h2>

            <motion.p
              className="font-body text-[16px] sm:text-[18px] leading-[1.7] max-w-lg mt-8"
              style={{ color: 'rgba(17,17,17,0.72)' }}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            >
              I am Kshitij. I have two years of intensive experience in generative AI, producing high-quality generative ads, static visuals, and immersive cinematic films.
            </motion.p>

            <motion.p
              className="font-body text-[16px] sm:text-[18px] leading-[1.7] max-w-lg mt-4"
              style={{ color: 'rgba(17,17,17,0.65)' }}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            >
              I have worked on a diverse range of projects, leveraging the best AI products and models to continuously execute at the highest quality. No shortcuts. Just uncompromising intent meeting flawless execution.
            </motion.p>

            {/* Stat pills removed as requested */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
