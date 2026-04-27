import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  { 
    act: 'ACT I', 
    title: 'OVERTURE', 
    subtitle: 'Concept & Script',
    venue: 'La Scala',
    curtain: 'RISES AT DUSK',
    desc: 'Every great production starts with a script. I shape the core concept, voice, and narrative arc, proving the story works before a single pixel is synthesized.'
  },
  { 
    act: 'ACT II', 
    title: 'THE STAGING', 
    subtitle: 'Look & Pre-Viz',
    venue: 'Palais Garnier',
    curtain: 'CANDLELIGHT HOUR',
    desc: 'Testing dozens of specialized neural models to lock in the exact lighting, camera angles, and character consistency for your brand\'s visual signature.'
  },
  { 
    act: 'ACT III', 
    title: 'THE PERFORMANCE', 
    subtitle: 'AI Production',
    venue: 'Teatro di Roma',
    curtain: 'FULL HOUSE',
    desc: 'The curtain rises. The full production pipeline executes, generating every frame and synthesizing every beat using the world\'s most advanced AI clusters.'
  },
  { 
    act: 'ACT IV', 
    title: 'THE FINAL BOW', 
    subtitle: 'Post-Production',
    venue: 'Royal Opera House',
    curtain: 'ENCORE AWAITS',
    desc: 'Mastering the art. Colour grading, elite sound design, and precise editing refine the raw neural output into a cinema-standard masterpiece.'
  },
];

/* ─── CUSTOM SVG: The Maestro (Opera Conductor) ─── */
const MaestroSVG = ({ isAnimating }: { isAnimating: boolean }) => {
  const animState = isAnimating ? 'running' : 'paused';

  return (
    <svg viewBox="0 0 600 800" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMax meet">
      <style>{`
        @keyframes conductBreathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.02); }
        }
        @keyframes rightArmConduct {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(8deg) translateY(-10px); }
          50% { transform: rotate(-5deg) translateY(5px); }
          75% { transform: rotate(5deg) translateY(-5px); }
        }
        @keyframes leftArmConduct {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          30% { transform: rotate(-10deg) translateY(-5px); }
          60% { transform: rotate(5deg) translateY(10px); }
          85% { transform: rotate(-5deg) translateY(-2px); }
        }
        @keyframes headSway {
           0%, 100% { transform: rotate(0deg); }
           33% { transform: rotate(-2deg); }
           66% { transform: rotate(3deg); }
        }
        @keyframes batonSweep {
           0%, 100% { transform: rotate(0deg); }
           50% { transform: rotate(15deg); }
        }
        @keyframes batonGlow {
           0%, 100% { opacity: 0.5; filter: blur(5px); }
           50% { opacity: 1; filter: blur(8px); }
        }
      `}</style>

      <defs>
        <linearGradient id="tuxDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="50%" stopColor="#0D0D0D" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <linearGradient id="tuxLapel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#222" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0DCD3" />
        </linearGradient>
        <radialGradient id="skinGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E6CE" />
          <stop offset="80%" stopColor="#DCA477" />
          <stop offset="100%" stopColor="#C18556" />
        </radialGradient>
        <radialGradient id="hairGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EAEAEA" />
          <stop offset="100%" stopColor="#999999" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA8015" />
        </linearGradient>
        <filter id="maestroShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="15" stdDeviation="15" floodOpacity="0.4" floodColor="#000" />
        </filter>
        <filter id="lightShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="5" stdDeviation="3" floodOpacity="0.5" floodColor="#000" />
        </filter>
      </defs>

      {/* Cinematic Golden Spotlight behind Maestro */}
      <path d="M 150 800 C 150 500 450 500 450 800 Z" fill="#FFE066" opacity="0.15" filter="blur(40px)" />

      {/* Main Group: Breathing */}
      <g style={{ animation: 'conductBreathe 4s ease-in-out infinite', animationPlayState: animState, transformOrigin: '300px 700px' }} filter="url(#maestroShadow)">

        {/* --- BODY (Tuxedo) - Robust Build --- */}
        {/* Left Shoulder */}
        <path d="M 300 450 L 160 440 C 100 460 60 520 60 600 L 70 800 L 300 800 Z" fill="url(#tuxDark)" stroke="#111" strokeWidth="2" />
        {/* Right Shoulder */}
        <path d="M 300 450 L 440 440 C 500 460 540 520 540 600 L 530 800 L 300 800 Z" fill="url(#tuxDark)" stroke="#111" strokeWidth="2" />
        
        {/* White Shirt base */}
        <path d="M 220 400 L 380 400 L 420 800 L 180 800 Z" fill="url(#shirtGrad)" />
        
        {/* Shirt Pleats */}
        <line x1="250" y1="450" x2="230" y2="800" stroke="#CFCBC2" strokeWidth="4" />
        <line x1="270" y1="450" x2="260" y2="800" stroke="#CFCBC2" strokeWidth="4" />
        <line x1="330" y1="450" x2="340" y2="800" stroke="#CFCBC2" strokeWidth="4" />
        <line x1="350" y1="450" x2="370" y2="800" stroke="#CFCBC2" strokeWidth="4" />

        {/* Gold Studs */}
        <circle cx="300" cy="500" r="5" fill="url(#goldGrad)" filter="url(#lightShadow)" />
        <circle cx="300" cy="560" r="5" fill="url(#goldGrad)" filter="url(#lightShadow)" />
        <circle cx="300" cy="620" r="5" fill="url(#goldGrad)" filter="url(#lightShadow)" />
        <circle cx="300" cy="680" r="5" fill="url(#goldGrad)" filter="url(#lightShadow)" />
        <circle cx="300" cy="740" r="5" fill="url(#goldGrad)" filter="url(#lightShadow)" />

        {/* Tuxedo Lapels (Wide & Elegant) */}
        <path d="M 200 440 L 300 650 L 260 480 Z" fill="url(#tuxLapel)" filter="url(#lightShadow)" />
        <path d="M 400 440 L 300 650 L 340 480 Z" fill="url(#tuxLapel)" filter="url(#lightShadow)" />
        
        {/* Lapel silk highlights */}
        <path d="M 210 450 L 290 630" stroke="#333" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M 390 450 L 310 630" stroke="#333" strokeWidth="2" fill="none" opacity="0.5" />

        {/* Bowtie & Collar */}
        <polygon points="230,380 295,430 300,410" fill="#FFF" stroke="#D0CCBE" strokeWidth="2" />
        <polygon points="370,380 305,430 300,410" fill="#FFF" stroke="#D0CCBE" strokeWidth="2" />
        
        <path d="M 230,420 L 290,440 L 230,460 Z" fill="url(#shirtGrad)" stroke="#C0BCB0" strokeWidth="2" strokeLinejoin="round" filter="url(#lightShadow)" />
        <path d="M 370,420 L 310,440 L 370,460 Z" fill="url(#shirtGrad)" stroke="#C0BCB0" strokeWidth="2" strokeLinejoin="round" filter="url(#lightShadow)" />
        <rect x="285" y="430" width="30" height="20" rx="5" fill="#FFF" stroke="#D0CCBE" strokeWidth="2" />

        {/* --- LEFT ARM --- */}
        <g style={{ animation: 'leftArmConduct 5s ease-in-out infinite', animationPlayState: animState, transformOrigin: '140px 480px' }}>
          <path d="M 140 460 Q 50 500 70 420" fill="none" stroke="url(#tuxDark)" strokeWidth="50" strokeLinecap="round" />
          
          {/* French Cuff */}
          <path d="M 85 435 L 55 405 L 45 420 L 75 450 Z" fill="url(#shirtGrad)" stroke="#D0CCBE" strokeWidth="2" />
          <circle cx="65" cy="425" r="4" fill="url(#goldGrad)" />
          
          {/* Hand */}
          <circle cx="70" cy="400" r="22" fill="url(#skinGrad)" filter="url(#lightShadow)" />
          <path d="M 55 390 Q 70 380 85 390 M 52 400 Q 70 395 88 400 M 55 410 Q 70 410 85 410" fill="none" stroke="#A76840" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* --- RIGHT ARM --- */}
        <g style={{ animation: 'rightArmConduct 4.5s ease-in-out infinite', animationPlayState: animState, transformOrigin: '460px 480px' }}>
          <path d="M 460 460 Q 550 490 530 380" fill="none" stroke="url(#tuxDark)" strokeWidth="50" strokeLinecap="round" />
          
          {/* French Cuff */}
          <path d="M 515 400 L 545 375 L 555 390 L 525 415 Z" fill="url(#shirtGrad)" stroke="#D0CCBE" strokeWidth="2" />
          <circle cx="535" cy="395" r="4" fill="url(#goldGrad)" />
          
          {/* Hand */}
          <circle cx="530" cy="360" r="18" fill="url(#skinGrad)" filter="url(#lightShadow)" />
          <path d="M 520 355 Q 530 350 545 365" fill="none" stroke="#A76840" strokeWidth="3" strokeLinecap="round" />
          
          {/* Baton */}
          <g style={{ animation: 'batonSweep 3s ease-in-out infinite', animationPlayState: animState, transformOrigin: '530px 360px' }}>
             {/* Baton glowing trail */}
             <line x1="535" y1="355" x2="380" y2="150" stroke="#FFF" strokeWidth="10" strokeLinecap="round" style={{ animation: 'batonGlow 2s infinite' }} />
             {/* Core stick */}
             <line x1="535" y1="355" x2="380" y2="150" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
             {/* Handle */}
             <line x1="510" y1="380" x2="535" y2="355" stroke="#4A2F1D" strokeWidth="10" strokeLinecap="round" />
             <line x1="512" y1="378" x2="533" y2="357" stroke="#68422A" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>

        {/* --- HEAD & FACE --- */}
        <g style={{ animation: 'headSway 6s ease-in-out infinite', animationPlayState: animState, transformOrigin: '300px 420px' }}>
          
          {/* Neck */}
          <path d="M 260 370 L 340 370 L 350 430 L 250 430 Z" fill="url(#skinGrad)" />
          <path d="M 260 380 Q 300 400 340 380" fill="none" stroke="#A76840" strokeWidth="4" opacity="0.5" />
          
          {/* Hair back layer */}
          <path d="M 200 250 C 180 150 250 100 300 100 C 350 100 420 150 400 250 C 430 300 430 350 390 380 C 360 400 240 400 210 380 C 170 350 170 300 200 250 Z" fill="url(#hairGrad)" filter="url(#lightShadow)" />
          
          {[
            {cx: 210, cy: 180, r: 30}, {cx: 250, cy: 130, r: 35}, {cx: 310, cy: 110, r: 40},
            {cx: 360, cy: 150, r: 35}, {cx: 390, cy: 210, r: 30}, {cx: 400, cy: 300, r: 35},
            {cx: 200, cy: 300, r: 35}, {cx: 220, cy: 350, r: 25}, {cx: 380, cy: 350, r: 25}
          ].map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="url(#hairGrad)" />)}

          {/* Face Base */}
          <path d="M 230 200 C 230 150 370 150 370 200 C 380 250 370 320 350 360 C 330 390 270 390 250 360 C 230 320 220 250 230 200 Z" fill="url(#skinGrad)" />
          
          {/* Cheeks / Jowls */}
          <path d="M 245 320 Q 235 350 260 375" fill="none" stroke="#A76840" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
          <path d="M 355 320 Q 365 350 340 375" fill="none" stroke="#A76840" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>

          {/* Ears */}
          <ellipse cx="225" cy="270" rx="14" ry="22" fill="url(#skinGrad)" />
          <ellipse cx="375" cy="270" rx="14" ry="22" fill="url(#skinGrad)" />
          <path d="M 225 260 Q 215 270 225 280" fill="none" stroke="#A76840" strokeWidth="2" opacity="0.6"/>
          <path d="M 375 260 Q 385 270 375 280" fill="none" stroke="#A76840" strokeWidth="2" opacity="0.6"/>

          {/* Wispy Hair Overlay */}
          <path d="M 240 180 Q 300 130 360 180 Q 330 150 300 150 Q 270 150 240 180" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.9" filter="url(#lightShadow)" />
          <path d="M 280 140 Q 300 120 320 140" fill="none" stroke="#EAEAEA" strokeWidth="3" strokeLinecap="round" filter="url(#lightShadow)" />

          {/* Brows */}
          <path d="M 255 240 Q 270 235 285 245" fill="none" stroke="#FFF" strokeWidth="7" strokeLinecap="round" filter="url(#lightShadow)" />
          <path d="M 345 240 Q 330 235 315 245" fill="none" stroke="#FFF" strokeWidth="7" strokeLinecap="round" filter="url(#lightShadow)" />
          
          {/* Eyes */}
          <path d="M 260 260 Q 270 265 280 260" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
          <path d="M 340 260 Q 330 265 320 260" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
          <path d="M 255 278 Q 270 288 285 278" fill="none" stroke="#A76840" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
          <path d="M 345 278 Q 330 288 315 278" fill="none" stroke="#A76840" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>

          {/* Glasses */}
          <rect x="245" y="240" width="45" height="35" rx="10" fill="rgba(255,255,255,0.1)" stroke="url(#goldGrad)" strokeWidth="3" filter="url(#lightShadow)" />
          <rect x="310" y="240" width="45" height="35" rx="10" fill="rgba(255,255,255,0.1)" stroke="url(#goldGrad)" strokeWidth="3" filter="url(#lightShadow)" />
          {/* Specular reflections on glasses */}
          <line x1="255" y1="245" x2="270" y2="270" stroke="#FFF" strokeWidth="4" opacity="0.6" strokeLinecap="round" />
          <line x1="320" y1="245" x2="335" y2="270" stroke="#FFF" strokeWidth="4" opacity="0.6" strokeLinecap="round" />
          
          <line x1="290" y1="255" x2="310" y2="255" stroke="url(#goldGrad)" strokeWidth="3" />
          <line x1="245" y1="255" x2="220" y2="260" stroke="url(#goldGrad)" strokeWidth="2.5" />
          <line x1="355" y1="255" x2="380" y2="260" stroke="url(#goldGrad)" strokeWidth="2.5" />
          
          {/* Nose */}
          <path d="M 300 255 L 308 295 L 290 300" fill="none" stroke="#9E5D36" strokeWidth="4" strokeLinecap="round" />
          <path d="M 290 300 Q 300 305 310 300" fill="none" stroke="#9E5D36" strokeWidth="3" strokeLinecap="round" />

          {/* Mouth */}
          <ellipse cx="300" cy="340" rx="18" ry="14" fill="#2A1010" />
          <path d="M 290 335 Q 300 340 310 335" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/> {/* teeth */}
          <path d="M 285 362 Q 300 368 315 362" fill="none" stroke="#A76840" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
};


/* ─── MAIN COMPONENT ─── */
const HowWeCreateSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-10%' });
  
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <section
      id="process"
      data-section="4"
      ref={sectionRef}
      className="pt-16 sm:pt-24 pb-0 relative overflow-hidden flex items-center"
      style={{ backgroundColor: '#FFE066', color: '#111111' }}
    >
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 relative z-10" style={{ maxWidth: '1800px' }}>
        
        {/* Massive Title Above */}
        <motion.div 
          className="w-full text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-mono text-[#111111] text-[13px] tracking-[0.4em] font-bold uppercase block mb-4">
            HOW I DO IT
          </span>
          <h2 className="font-heading uppercase text-[#111111] tracking-wider" style={{ fontSize: 'clamp(40px, 7vw, 90px)', lineHeight: 0.9 }}>
            I CREATE <span className="text-[#F48B29] italic pr-2">MAGIC</span>.
          </h2>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-4 relative w-full">
          
          {/* LEFT: SVG The Maestro */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-[700px] relative z-20 flex items-end justify-center lg:justify-end lg:-mr-12 xl:-mr-24 pointer-events-none scale-x-[-1] lg:scale-x-100">
             {/* The Maestro holds the baton, pointing towards the poster frame */}
             <MaestroSVG isAnimating={isInView} />
          </div>

          {/* RIGHT: The Interactive Cinematic Poster Frame */}
          <motion.div 
            className="w-full lg:w-[55%] relative z-10 mb-16 sm:mb-24"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 0.2 }}
          >
            {/* The Poster Board */}
            <div className="bg-[#111] rounded-[24px] sm:rounded-2xl w-full flex flex-col justify-between overflow-hidden relative"
                 style={{ 
                   height: 'clamp(520px, 68vh, 680px)',
                   border: '1px solid rgba(255, 255, 255, 0.1)',
                   boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 100px rgba(0, 229, 255, 0.05)',
                 }}
            >
              {/* Fancy Top Edge Glow — Opera Gold */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

              {/* Progress Indicator Track at top */}
              <div className="flex items-center gap-2 p-6 sm:p-10 border-b border-white/5 pb-6">
                 {steps.map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 h-1 transition-all duration-500 rounded-full"
                      style={{ backgroundColor: i === currentStep ? '#D4AF37' : 'rgba(255,255,255,0.1)' }}
                    />
                 ))}
              </div>

              {/* Central Content Area (AnimatePresence for smooth slide) */}
              <div className="flex-1 flex flex-col justify-center px-4 sm:px-10 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
                    className="absolute inset-0 flex items-center px-6 sm:px-10 h-full w-full"
                  >
                    
                    {/* Massive Background Watermark Number */}
                    <div className="absolute -bottom-16 -right-10 font-heading text-white/[0.04] select-none pointer-events-none leading-none z-0" 
                         style={{ fontSize: 'clamp(200px, 30vw, 400px)' }}>
                       0{currentStep + 1}
                    </div>

                    <div className="relative z-10 flex gap-8 w-full">
                      
                      {/* Sidebar Metadata (Opera Theatre Programme) */}
                      <div className="hidden sm:flex flex-col justify-between py-2 pr-6 border-r border-[#D4AF37]/20 min-w-[120px] max-w-[120px]">
                         <div>
                           <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-widest uppercase mb-1">SEQUENCE</div>
                           <div className="font-mono text-[13px] text-[#F48B29] tracking-widest uppercase mb-4">{steps[currentStep].act}</div>
                           
                           <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-widest uppercase mb-1">VENUE</div>
                           <div className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase mb-4 leading-tight">{steps[currentStep].venue}</div>
                           
                           <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-widest uppercase mb-1">CURTAIN</div>
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                             <div className="font-mono text-[9px] text-[#D4AF37] tracking-widest uppercase leading-tight">{steps[currentStep].curtain}</div>
                           </div>
                         </div>
                         
                         {/* Decorative Opera Ornament */}
                         <div className="mt-auto pt-4 text-[#D4AF37]/30 text-[28px] select-none text-center" style={{ fontFamily: 'serif', letterSpacing: '0.1em' }}>❧</div>
                      </div>

                      {/* Main Copy Area */}
                      <div className="flex-1 py-4 flex flex-col justify-center">
                        {/* Mobile Metadata */}
                        <span className="sm:hidden font-mono text-[#F48B29] text-[12px] tracking-[0.2em] font-bold uppercase mb-4 flex items-center gap-3">
                           {steps[currentStep].act} <span className="text-[#555]">|</span> {steps[currentStep].venue}
                        </span>
                        
                        {/* Massive Title */}
                        <h3 className="font-heading text-white leading-[0.88] tracking-wider mb-3" style={{ fontSize: 'clamp(38px, 5.5vw, 72px)' }}>
                           {steps[currentStep].title}
                        </h3>
                        
                        {/* Subtitle in a brutalist technical pill */}
                        <div className="self-start inline-block px-3 py-1.5 border border-[#FFE066]/30 text-[#FFE066] font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-4 bg-[#FFE066]/5">
                           {steps[currentStep].subtitle}
                        </div>

                        {/* Description with editorial indention */}
                        <div className="pl-6 border-l-2 border-[#D4AF37]/50 relative">
                          {/* Accent dot */}
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#D4AF37] rounded-full" />
                          <p className="font-body text-[#A0A0A0] text-[14px] sm:text-[15px] leading-relaxed">
                             {steps[currentStep].desc}
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Controls */}
              <div className="mt-auto border-t border-white/5 bg-[#0a0a0a] p-4 flex items-center justify-between">
                 <button 
                   onClick={prevStep}
                   className="p-4 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                   aria-label="Previous Step"
                 >
                   <ChevronLeft size={24} />
                 </button>
                 
                 <span className="font-mono text-[12px] text-white/40 tracking-[0.2em]">
                    {currentStep + 1} / {steps.length}
                 </span>
                 
                 <button 
                   onClick={nextStep}
                   className="flex items-center gap-2 group px-6 py-3 rounded-full bg-[#111] border border-white/20 text-white font-mono text-[12px] uppercase tracking-widest hover:bg-[#FFE066] hover:text-[#111] hover:border-[#FFE066] transition-all duration-300"
                 >
                   NEXT SCENE
                   <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>

            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default HowWeCreateSection;
