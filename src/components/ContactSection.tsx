import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const XIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

/* ─── Email tile is featured (full-width on its own row, accented) ─── */
const emailTile = {
  icon: <Mail className="w-6 h-6" />,
  label: 'Email Me',
  value: 'hello@operacreatives.com',
  href: 'mailto:hello@operacreatives.com',
  featured: true,
};

const socialTiles = [
  {
    icon: <Instagram className="w-5 h-5" />,
    label: 'Instagram',
    value: '@operacreatives_',
    href: 'https://instagram.com/operacreatives_',
    hoverColor: 'group-hover:text-pink-400',
    external: true,
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: 'LinkedIn',
    value: 'Opera Creatives',
    href: 'https://linkedin.com/company/operacreatives',
    hoverColor: 'group-hover:text-blue-400',
    external: true,
  },
  {
    icon: <XIcon className="w-5 h-5" />,
    label: 'X (Twitter)',
    value: '@operacreatives_',
    href: 'https://twitter.com/operacreatives_',
    hoverColor: 'group-hover:text-neutral-300',
    external: true,
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'Start a Project',
    value: 'Reach out directly',
    href: 'mailto:hello@operacreatives.com?subject=Let%27s%20work%20together',
    hoverColor: 'group-hover:text-accent',
    external: false,
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const tileVars = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 bg-background"
    >
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16" style={{ maxWidth: '1800px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-14"
        >
          <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
            GET IN TOUCH
          </span>
          <h2 className="mt-3 sm:mt-4 font-heading text-2xl sm:text-4xl md:text-5xl text-foreground">
            Let's Connect.
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-lg">
            Reach out through any channel — I'd love to hear about your project.
          </p>
        </motion.div>

        <motion.div
          variants={containerVars}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-4"
        >

          {/* ── Featured Email Tile — spans full width, prominent ── */}
          <motion.a
            variants={tileVars}
            href={emailTile.href}
            className="group relative flex items-center justify-between p-6 sm:p-8 rounded-2xl overflow-hidden border border-accent/20 hover:border-accent/40 transition-all duration-500 cursor-pointer"
            data-cursor-hover
          >
            {/* Accent glow background */}
            <div className="absolute inset-0 bg-accent/[0.06] group-hover:bg-accent/[0.1] transition-colors duration-500" />

            {/* Subtle animated glow pulse */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-accent/10 blur-3xl group-hover:bg-accent/20 transition-colors duration-700" />

            <div className="relative z-10 flex items-center gap-5">
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent/25 group-hover:scale-110 transition-all duration-400">
                {emailTile.icon}
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors duration-300">
                  {emailTile.label}
                </h3>
                <p className="font-mono text-xs sm:text-sm tracking-wide text-muted-foreground mt-0.5">
                  {emailTile.value}
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative z-10 hidden sm:flex w-10 h-10 rounded-full bg-accent/10 border border-accent/20 items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-400">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent group-hover:text-white transition-colors duration-300">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.a>

          {/* ── Social + Direct tiles — 2-col on mobile, 4-col on desktop ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {socialTiles.map((tile, index) => (
              <motion.a
                key={index}
                href={tile.href}
                target={tile.external ? '_blank' : undefined}
                rel={tile.external ? 'noopener noreferrer' : undefined}
                variants={tileVars}
                className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-foreground/[0.03] hover:bg-foreground/[0.06] border border-foreground/[0.06] hover:border-foreground/[0.12] transition-all duration-500 cursor-pointer min-h-[130px]`}
                data-cursor-hover
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-xl bg-foreground/[0.05] border border-foreground/[0.08] flex items-center justify-center text-muted-foreground ${tile.hoverColor} transition-colors duration-400`}>
                  {tile.icon}
                </div>

                {/* Label + Value */}
                <div className="mt-4">
                  <h3 className={`font-heading text-base sm:text-lg text-foreground ${tile.hoverColor} transition-colors duration-400 leading-tight`}>
                    {tile.label}
                  </h3>
                  <p className="font-mono text-[10px] sm:text-xs tracking-wide text-muted-foreground mt-1 truncate">
                    {tile.value}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-muted-foreground">
                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
