import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Send } from 'lucide-react';

const LeftRobot = ({ isPeeping }: { isPeeping: boolean }) => {
  const [isLooking, setIsLooking] = useState(false);
  return (
    <svg 
      viewBox="0 0 120 200" 
      className={`absolute left-0 top-1/2 -translate-y-1/2 w-24 md:w-32 lg:w-40 xl:w-48 transition-transform duration-700 ease-out z-[40] ${isPeeping ? 'translate-x-[0%]' : '-translate-x-full'}`}
      onMouseEnter={() => setIsLooking(true)}
      onMouseLeave={() => setIsLooking(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Body peeking from left */}
      <path d="M -20 40 Q 80 40 100 200 L -20 200 Z" fill="#EAEAEA" stroke="#111" strokeWidth="6" />
      <path d="M -20 180 Q 70 180 80 200 L -20 200 Z" fill="#D0D0D0" />
      
      {/* Big Eye */}
      <circle cx="50" cy="110" r="28" fill="#FFF" stroke="#111" strokeWidth="5" />
      {/* Pupil looking towards form (cx=65) or at us (cx=50) */}
      <circle cx={isLooking ? 50 : 65} cy="110" r="10" fill="#111" style={{ transition: 'cx 0.3s ease' }} />
      {/* Highlight on pupil */}
      <circle cx={isLooking ? 53 : 68} cy="106" r="3" fill="#FFF" style={{ transition: 'cx 0.3s ease' }} />
      
      {/* Antenna */}
      <path d="M 10 40 L 40 10" stroke="#111" strokeWidth="5" strokeLinecap="round" />
      <circle cx="45" cy="10" r="8" fill="#F48B29" stroke="#111" strokeWidth="4" />
      <circle cx="47" cy="8" r="2" fill="#FFF" />

      {/* Joints/Panel */}
      <line x1="20" y1="160" x2="60" y2="160" stroke="#111" strokeWidth="4" strokeLinecap="round" />
      <line x1="10" y1="175" x2="50" y2="175" stroke="#111" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

const RightRobot = ({ isPeeping }: { isPeeping: boolean }) => {
  const [isLooking, setIsLooking] = useState(false);
  return (
    <svg 
      viewBox="0 0 120 200" 
      className={`absolute right-0 top-1/2 -translate-y-1/2 w-24 md:w-32 lg:w-40 xl:w-48 transition-transform duration-700 ease-out z-[40] ${isPeeping ? 'translate-x-[0%]' : 'translate-x-full'}`} 
      style={{ transform: isPeeping ? 'scaleX(-1) translateY(-50%) translate(0, 0)' : 'scaleX(-1) translateY(-50%) translate(-100%, 0)', cursor: 'pointer' }}
      onMouseEnter={() => setIsLooking(true)}
      onMouseLeave={() => setIsLooking(false)}
    >
      <path d="M -20 40 Q 80 40 100 200 L -20 200 Z" fill="#EAEAEA" stroke="#111" strokeWidth="6" />
      <path d="M -20 180 Q 70 180 80 200 L -20 200 Z" fill="#D0D0D0" />
      
      <circle cx="50" cy="110" r="28" fill="#FFF" stroke="#111" strokeWidth="5" />
      <circle cx={isLooking ? 50 : 65} cy="110" r="10" fill="#111" style={{ transition: 'cx 0.3s ease' }} />
      <circle cx={isLooking ? 53 : 68} cy="106" r="3" fill="#FFF" style={{ transition: 'cx 0.3s ease' }} />
      
      <path d="M 10 40 L 40 10" stroke="#111" strokeWidth="5" strokeLinecap="round" />
      <circle cx="45" cy="10" r="8" fill="#4FC3F7" stroke="#111" strokeWidth="4" />
      <circle cx="47" cy="8" r="2" fill="#FFF" />
      
      <line x1="20" y1="160" x2="60" y2="160" stroke="#111" strokeWidth="4" strokeLinecap="round" />
      <line x1="10" y1="175" x2="50" y2="175" stroke="#111" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

const ClapperboardFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full max-w-[600px] mx-auto z-30 pt-16">
      {/* Clapperboard Stick (Top) */}
      <div className="absolute top-0 left-0 right-0 h-[70px] origin-bottom-left transition-transform duration-300 hover:-rotate-6 z-20 flex" style={{ perspective: 1000 }}>
        <div className="w-full h-full bg-[#111] rounded-t-xl border-4 border-[#222] shadow-[0_-8px_20px_rgba(0,0,0,0.15)] overflow-hidden flex relative">
          {/* Chevron stripes */}
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <pattern id="chevrons" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse" patternTransform="skewX(-30)">
                <rect x="0" y="0" width="40" height="100" fill="#FFF" />
                <rect x="40" y="0" width="40" height="100" fill="#111" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#chevrons)" />
          </svg>
          {/* Screw / Hinge */}
          <div className="absolute top-1/2 left-4 w-6 h-6 rounded-full bg-[#555] border-4 border-[#222] transform -translate-y-1/2 z-30" />
        </div>
      </div>

      {/* Clapperboard Body */}
      <div className="relative bg-[#111] rounded-b-3xl border-4 border-[#222] border-t-0 p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden mt-[-2px]">
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        
        {/* Clapperboard text headers */}
        <div className="flex justify-between items-end border-b-2 border-gray-800 pb-6 mb-10">
           <div>
             <span className="font-mono text-[11px] text-gray-500 tracking-[0.2em] block mb-2">PROD.</span>
             <h3 className="font-heading text-white text-[clamp(24px,4vw,36px)] leading-none tracking-wide text-shadow-sm">MAIL US</h3>
           </div>
           <div className="text-right">
             <span className="font-mono text-[11px] text-gray-500 tracking-[0.2em] block mb-2">SCENE.</span>
             <span className="font-mono text-white text-3xl font-bold">01</span>
           </div>
        </div>

        {/* The form injected here */}
        <div className="relative z-10 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', phone: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    borderRadius: 8,
    border: '2px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    fontFamily: "'Satoshi', sans-serif",
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.2s, background-color 0.2s',
  };
  const labelBase: React.CSSProperties = {
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
    display: 'block',
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#F48B29';
    e.target.style.backgroundColor = 'rgba(0,0,0,0.8)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.backgroundColor = 'rgba(0,0,0,0.5)';
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-6 w-full"
    >
      <div>
        <label style={labelBase}>Name *</label>
        <input type="text" required value={formData.name}
          onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
          placeholder="Your name" style={inputBase} onFocus={onFocus} onBlur={onBlur} />
      </div>
      <div>
        <label style={labelBase}>Email *</label>
        <input type="email" required value={formData.email}
          onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
          placeholder="you@example.com" style={inputBase} onFocus={onFocus} onBlur={onBlur} />
      </div>
      <div>
        <label style={labelBase}>Phone <span style={{ opacity: 0.5 }}>(optional)</span></label>
        <input type="tel" value={formData.phone}
          onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
          placeholder="+1 234 567 8900" style={inputBase} onFocus={onFocus} onBlur={onBlur} />
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-3d btn-3d-orange w-full"
          style={{ width: '100%', padding: '20px 24px', fontSize: '15px' }}
        >
          {status === 'sending' ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              TRANSMITTING…
            </span>
          ) : status === 'sent' ? (
            '✓ SIGNAL RECEIVED'
          ) : (
            <span className="flex items-center justify-center gap-3"><Send size={18} /> SEND</span>
          )}
        </button>
      </div>
    </form>
  );
};

const CollaborateSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [isFormHovered, setIsFormHovered] = useState(false);

  const socials = [
    { href: 'https://x.com/aiuncover',                       label: 'X' },
    { href: 'https://www.linkedin.com/in/kshitijsatbhai/',   label: 'LinkedIn' },
  ];

  return (
    <section
      id="collaborate"
      data-section="5"
      data-bg="#FF0000"
      ref={sectionRef}
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#D32F2F', /* Deep Red */
        color: '#FFFFFF',
        minHeight: '100vh',
        paddingTop: 100,
        paddingBottom: 120,
      }}
    >
      {/* Background radial gradient to add center focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Peeping Robots — hidden on mobile to keep form accessible */}
      <div className="hidden md:block"><LeftRobot isPeeping={isFormHovered} /></div>
      <div className="hidden md:block"><RightRobot isPeeping={isFormHovered} /></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col xl:flex-row items-center justify-center gap-16 xl:gap-24">
        
        {/* Left Side: Copy & Socials */}
        <motion.div
          className="flex flex-col items-center xl:items-start text-center xl:text-left max-w-xl xl:max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        >
          <h2
            className="font-heading tracking-wide"
            style={{ fontSize: 'clamp(4rem, 8vw, 110px)', lineHeight: 0.88, color: '#FFFFFF', textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          >
            LET'S<br />CONNECT.
          </h2>
          <p className="font-body text-[18px] sm:text-[20px] mt-8 max-w-sm" style={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.6 }}>
            Every great frame starts with a conversation. Drop a signal and I'll route it back.
          </p>

          {/* Social links */}
          <div className="flex flex-col gap-4 mt-10 items-center xl:items-start">
            <div className="flex items-center gap-4 justify-center xl:justify-start">
              {socials.map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className={`btn-3d inline-flex items-center justify-center p-[14px] leading-none ${label === 'X' ? 'btn-3d-dark text-white' : 'btn-3d-lightblue text-[#01333F]'}`}
                >
                  {label === 'X' ? (
                    /* Official X logo SVG */
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) : (
                    <Linkedin size={20} strokeWidth={2} />
                  )}
                </a>
              ))}
            </div>
            {/* Email */}
            <a
              href="mailto:contactshitij7@gmail.com"
              className="font-mono text-[13px] tracking-wide hover:underline transition-all"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              contactshitij7@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Right Side: The Clapperboard Frame & Form */}
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22,1,0.36,1] }}
          onMouseEnter={() => setIsFormHovered(true)}
          onMouseLeave={() => setIsFormHovered(false)}
        >
          <ClapperboardFrame>
            <ContactForm />
          </ClapperboardFrame>
        </motion.div>

      </div>
    </section>
  );
};

export default CollaborateSection;
