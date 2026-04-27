import { useRef } from 'react';
import { Linkedin, ArrowUp } from 'lucide-react';
import { useInView } from 'framer-motion';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, margin: "0px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      data-section="6"
      data-bg="#FFF4CC" /* Deep Yellowish Cream */
      className="relative overflow-hidden pt-24 pb-8 flex flex-col justify-end"
      style={{ backgroundColor: '#FFF4CC', color: '#111111', minHeight: '50vh' }}
    >
      <style>
        {`
          @keyframes sweepContinuous {
            0% { background-position: 200% center; }
            100% { background-position: 0% center; }
          }
        `}
      </style>
      {/* ── Giant Outline Text with Warm Orange Sweep ── */}
      <div
        className="w-full h-[300px] flex-1 flex justify-center items-center flex-col px-4 mb-8 overflow-hidden"
        aria-hidden
      >
        <div
          className="inline-block relative w-[200vw] sm:w-[150vw] md:w-full text-center"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(50px, 14vw, 260px)',
            WebkitTextStroke: '2px rgba(17,17,17,0.85)',
            color: 'transparent',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
            userSelect: 'none',
            lineHeight: 1.1,
            zIndex: 1,
            // Warm maroon sweep
            backgroundImage: 'linear-gradient(100deg, transparent 0%, transparent 35%, rgba(128,0,0,0.9) 48%, rgba(128,0,0,0.9) 52%, transparent 65%, transparent 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'sweepContinuous 8s linear infinite',
            animationPlayState: isInView ? 'running' : 'paused',
            willChange: 'background-position',
          }}
        >
          POWERED BY GEN AI
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 w-full mt-auto">
        {/* Thin top border line */}
        <div className="w-full h-px bg-[#000000] opacity-20 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="font-mono text-[11px] tracking-[0.1em] text-[#333] uppercase font-bold">
            &copy; 2026 Kshitij Satbhai. All rights reserved.
          </div>

          <div className="flex items-center gap-12">
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              {[
                { label: 'X',        href: 'https://x.com/aiuncover' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kshitijsatbhai/' },
              ].map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#333] hover:text-[#F48B29] transition-colors">
                  {label === 'X' ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) : (
                    <Linkedin strokeWidth={2} size={18} />
                  )}
                </a>
              ))}
            </div>
            {/* Email */}
            <a
              href="mailto:contactshitij7@gmail.com"
              className="font-mono text-[11px] tracking-[0.05em] text-[#333] hover:text-[#F48B29] transition-colors"
            >
              contactshitij7@gmail.com
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-[#111] hover:text-white hover:bg-[#F48B29] transition-colors shadow-sm cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
