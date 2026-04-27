import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from '@/vendor/gsap';
import { ScrollTrigger } from '@/vendor/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TraditionalSetSVG = () => {
  return (
    <div className="relative w-full aspect-video flex justify-center items-center">
      <style>{`
        @keyframes clockSpin {
          100% { transform: rotate(360deg); }
        }
        @keyframes sawMove {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-30px) translateY(15px); }
        }
        @keyframes modelArm1 {
          0%, 30%, 100% { transform: rotate(0deg); }
          35%, 65% { transform: rotate(-50deg); }
          70%, 95% { transform: rotate(-10deg); }
        }
        @keyframes modelArm2 {
          0%, 30%, 100% { transform: rotate(0deg); }
          35%, 65% { transform: rotate(80deg); }
          70%, 95% { transform: rotate(40deg); }
        }
        @keyframes reelSpin {
          100% { transform: rotate(360deg); }
        }
        @keyframes watchTap {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @keyframes clipboardWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }
        @keyframes flashBulb {
          0%, 90% { opacity: 0; }
          95% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes franticTyping {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(-5deg) translateY(-15px); }
          50% { transform: rotate(15deg) translateY(5px); }
          75% { transform: rotate(-15deg) translateY(-10px); }
        }
        @keyframes stressShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px) translateY(2px); }
          40% { transform: translateX(3px) translateY(-2px); }
          60% { transform: translateX(-2px) translateY(3px); }
          80% { transform: translateX(4px) translateY(-1px); }
        }
        @keyframes windowPop {
          0% { opacity: 0; transform: scale(0.8); }
          10%, 90% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes sweatFly {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          20% { transform: translate(10px, -15px) scale(1.2); opacity: 1; }
          100% { transform: translate(25px, -40px) scale(0); opacity: 0; }
        }
        @keyframes builderDart {
          0%, 25% { transform: translateX(0px); opacity: 1; }
          27%, 30% { opacity: 0.2; }
          32%, 58% { transform: translateX(50px); opacity: 1; }
          60%, 63% { opacity: 0.2; }
          65%, 91% { transform: translateX(100px); opacity: 1; }
          93%, 97% { opacity: 0.2; transform: translateX(0px); }
          100% { transform: translateX(0px); opacity: 1; }
        }
        @keyframes moneyFly {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50px, -100px) scale(0.5); opacity: 0; }
        }
      `}</style>
      <svg viewBox="0 0 1200 675" className="w-full h-full overflow-visible">
      
        {/* Background Base / Floor */}
        <path d="M -50 630 L 1400 630" stroke="#111" strokeWidth="12" />
        
        {/* The Fast Spinning Clock */}
        <g transform="translate(600, 160) scale(1.5)">
          <circle cx="0" cy="0" r="50" fill="#222" stroke="#444" strokeWidth="8" />
          <circle cx="0" cy="0" r="35" fill="#111" />
          <line x1="0" y1="0" x2="0" y2="-25" stroke="#FF3B30" strokeWidth="6" strokeLinecap="round" style={{ animation: 'clockSpin 2s linear infinite', transformOrigin: '0px 0px' }} />
          <line x1="0" y1="0" x2="18" y2="18" stroke="#FFF" strokeWidth="6" strokeLinecap="round" style={{ animation: 'clockSpin 24s linear infinite', transformOrigin: '0px 0px' }} />
        </g>
        
        {/* 1. BUILDER & PROJECTS (Far left) */}
        <g transform="translate(40, 92) scale(1.25)">
           
           {/* --- MULTIPLE WORKSTATIONS --- */}
           {/* PROJECT A: Wall piece */}
           <g transform="translate(0, 0)">
             <rect x="0" y="150" width="50" height="280" fill="#D35400" stroke="#111" strokeWidth="6" />
             <line x1="16" y1="150" x2="16" y2="430" stroke="#111" strokeWidth="4" />
             <line x1="33" y1="150" x2="33" y2="430" stroke="#111" strokeWidth="4" />
           </g>
           
           {/* PROJECT B: Bench */}
           <g transform="translate(50, 0)">
             <rect x="-10" y="320" width="60" height="110" fill="#E67E22" stroke="#111" strokeWidth="6" />
             <line x1="20" y1="320" x2="20" y2="430" stroke="#111" strokeWidth="3" />
             <rect x="-15" y="300" width="70" height="20" fill="#F1C40F" stroke="#111" strokeWidth="4" />
           </g>

           {/* PROJECT C: Blueprints / Pipe Unit */}
           <g transform="translate(100, 0)">
             <rect x="0" y="270" width="40" height="160" fill="#95A5A6" stroke="#111" strokeWidth="5" />
             <circle cx="20" cy="300" r="12" fill="#34495E" stroke="#111" strokeWidth="3" />
             <circle cx="20" cy="350" r="12" fill="#34495E" stroke="#111" strokeWidth="3" />
             <circle cx="20" cy="400" r="12" fill="#34495E" stroke="#111" strokeWidth="3" />
           </g>

           {/* --- THE EXPERT (Darting between workstations) --- */}
           <g style={{ animation: 'builderDart 3.5s cubic-bezier(0.25, 1, 0.5, 1) infinite' }}>
             <g style={{ animation: 'stressShake 1.2s infinite' }}>
               {/* Builder Legs */}
               <path d="M 80 430 L 90 350" stroke="#111" strokeWidth="16" strokeLinecap="round" />
               <path d="M 110 430 L 120 350" stroke="#111" strokeWidth="16" strokeLinecap="round" />
               
               {/* Torso Overall */}
               <path d="M 80 360 L 130 360 L 140 260 L 70 260 Z" fill="#2980B9" stroke="#111" strokeWidth="6" />
               <path d="M 75 260 L 135 260 L 130 230 L 80 230 Z" fill="#E67E22" stroke="#111" strokeWidth="5" />
               <line x1="90" y1="260" x2="90" y2="360" stroke="#111" strokeWidth="4" /> 
               <line x1="120" y1="260" x2="120" y2="360" stroke="#111" strokeWidth="4" />
               
               {/* Head */}
               <circle cx="105" cy="190" r="35" fill="#FFC8B4" stroke="#111" strokeWidth="6" />
               <circle cx="90" cy="185" r="10" fill="#FFF" stroke="#111" strokeWidth="3" />
               <circle cx="120" cy="185" r="10" fill="#FFF" stroke="#111" strokeWidth="3" />
               <circle cx="88" cy="185" r="3" fill="#111" />
               <circle cx="118" cy="185" r="3" fill="#111" />
               
               <path d="M 95 210 L 115 210 L 110 215 L 100 215 Z" fill="#FFF" stroke="#111" strokeWidth="3" />
               
               {/* Hard Hat */}
               <path d="M 70 170 C 70 130 140 130 140 170 Z" fill="#F1C40F" stroke="#111" strokeWidth="6" />
               <path d="M 60 170 L 150 170" stroke="#F1C40F" strokeWidth="6" strokeLinecap="round" />
               
               <circle cx="80" cy="170" r="5" fill="#AEEBFF" stroke="#11B" strokeWidth="2" style={{ animation: 'sweatFly 1.5s infinite 0.5s' }} />
             </g>

             {/* Left Arm holding plank */}
             <path d="M 80 250 L 50 280 L 70 310" fill="none" stroke="#111" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
             <path d="M 80 250 L 50 280 L 70 310" fill="none" stroke="#E67E22" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
             <circle cx="70" cy="310" r="8" fill="#FFC8B4" stroke="#111" strokeWidth="3" />
             <rect x="0" y="310" width="120" height="20" fill="#E67E22" stroke="#111" strokeWidth="4" />

             {/* Right Arm smoothly Sawing */}
             <g style={{ animation: 'sawMove 0.8s infinite alternate' }}>
               <path d="M 130 250 L 100 280 L 120 310" fill="none" stroke="#111" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M 130 250 L 100 280 L 120 310" fill="none" stroke="#E67E22" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M 120 310 L 60 310 L 60 330 L 120 330 Z" fill="#95A5A6" stroke="#111" strokeWidth="3" />
               <path d="M 60 330 L 66 320 L 72 330 L 78 320 L 84 330 L 90 320 L 96 330 L 102 320 L 108 330 L 114 320 L 120 330" fill="none" stroke="#111" strokeWidth="2" />
               <circle cx="120" cy="310" r="10" fill="#FFC8B4" stroke="#111" strokeWidth="3" />
               <rect x="110" y="295" width="20" height="30" fill="#8B4513" stroke="#111" strokeWidth="2" rx="4" />
             </g>
           </g>
        </g>

        {/* 2. THE MODEL (Mid-left) */}
        <g transform="translate(360, 92) scale(1.25)">
           {/* Spotlight */}
           <polygon points="50,-20 -20,430 120,430" fill="#FFE066" opacity="0.15" />
           <ellipse cx="50" cy="430" rx="70" ry="15" fill="#FFE066" opacity="0.25" />

           <g>
             {/* Legs */}
             <path d="M 40 430 L 40 310" stroke="#111" strokeWidth="12" strokeLinecap="round" />
             <path d="M 60 430 L 60 310" stroke="#111" strokeWidth="12" strokeLinecap="round" />
             
             {/* Red Dress */}
             <path d="M 20 330 Q 50 350 80 330 L 70 230 Q 50 210 30 230 Z" fill="#E74C3C" stroke="#111" strokeWidth="6" />
             
             {/* Arms Posing */}
             <g style={{ animation: 'modelArm1 3s infinite', transformOrigin: '30px 240px' }}>
               <path d="M 30 240 L 0 280 L 30 310" fill="none" stroke="#111" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M 30 240 L 0 280 L 30 310" fill="none" stroke="#FFC8B4" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
             </g>
             
             <g style={{ animation: 'modelArm2 3s infinite', transformOrigin: '70px 240px' }}>
               <path d="M 70 240 L 100 220 L 70 180" fill="none" stroke="#111" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M 70 240 L 100 220 L 70 180" fill="none" stroke="#FFC8B4" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
             </g>
             
             {/* Head */}
             <circle cx="50" cy="180" r="35" fill="#FFC8B4" stroke="#111" strokeWidth="6" />
             
             {/* Stress Face */}
             <circle cx="35" cy="170" r="10" fill="#FFF" stroke="#111" strokeWidth="3" />
             <circle cx="65" cy="170" r="10" fill="#FFF" stroke="#111" strokeWidth="3" />
             <circle cx="35" cy="170" r="3" fill="#111" />
             <circle cx="65" cy="170" r="3" fill="#111" />
             {/* Exhausted forced smile */}
             <ellipse cx="50" cy="195" rx="10" ry="4" fill="#FFF" stroke="#111" strokeWidth="3" />
             <path d="M 30 155 Q 50 165 70 155" fill="none" stroke="#111" strokeWidth="3" /> {/* Tired brows */}

             {/* Starlet Hair */}
             <path d="M 15 180 Q 15 130 50 130 C 85 130 85 180 85 180 Q 95 210 80 220 Q 75 190 70 180 Q 50 200 30 180 Q 25 190 20 220 Q 5 210 15 180 Z" fill="#F1C40F" stroke="#111" strokeWidth="4" />
             
             <circle cx="20" cy="160" r="6" fill="#AEEBFF" stroke="#11B" strokeWidth="2" style={{ animation: 'sweatFly 2s infinite' }} />
           </g>
        </g>

        {/* 3. CAMERAMAN (Center) */}
        <g transform="translate(620, 92) scale(1.25)">
           {/* Tripod */}
           <path d="M 40 430 L 75 300" stroke="#111" strokeWidth="10" strokeLinecap="round" />
           <path d="M 110 430 L 75 300" stroke="#111" strokeWidth="10" strokeLinecap="round" />
           
           {/* Cameraman Legs */}
           <path d="M 130 430 L 130 350" stroke="#111" strokeWidth="16" strokeLinecap="round" />
           <path d="M 160 430 L 150 350" stroke="#111" strokeWidth="16" strokeLinecap="round" />

           {/* Torso */}
           <path d="M 120 360 Q 140 400 160 360 L 160 260 Q 140 250 120 260 Z" fill="#2C3E50" stroke="#111" strokeWidth="6" />
           
           {/* Arms wrapping camera */}
           <path d="M 150 270 Q 180 320 120 320" fill="none" stroke="#111" strokeWidth="16" strokeLinecap="round" />
           <path d="M 150 270 Q 180 320 120 320" fill="none" stroke="#2C3E50" strokeWidth="10" strokeLinecap="round" />

           {/* Head & Hat */}
           <circle cx="140" cy="220" r="35" fill="#FFC8B4" stroke="#111" strokeWidth="6" />
           {/* Eye peeking */}
           <circle cx="120" cy="210" r="12" fill="#FFF" stroke="#111" strokeWidth="3" />
           <circle cx="115" cy="210" r="4" fill="#111" />
           {/* Backwards Cap */}
           <path d="M 115 195 C 130 180 160 180 170 195 Z" fill="#E67E22" stroke="#111" strokeWidth="5" />
           <path d="M 165 190 L 185 200" stroke="#E67E22" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
           
           {/* The Giant Camera */}
           <rect x="40" y="260" width="80" height="50" fill="#34495E" stroke="#111" strokeWidth="6" rx="8" />
           {/* Reels processing film */}
           <g style={{ animation: 'reelSpin 1s linear infinite', transformOrigin: '60px 240px' }}>
             <circle cx="60" cy="240" r="25" fill="#2C3E50" stroke="#111" strokeWidth="5" />
             <circle cx="60" cy="240" r="8" fill="#111" />
             <line x1="60" y1="215" x2="60" y2="265" stroke="#111" strokeWidth="4" />
             <line x1="35" y1="240" x2="85" y2="240" stroke="#111" strokeWidth="4" />
           </g>
           <g style={{ animation: 'reelSpin 1s linear infinite', transformOrigin: '100px 240px' }}>
             <circle cx="100" cy="240" r="25" fill="#2C3E50" stroke="#111" strokeWidth="5" />
             <circle cx="100" cy="240" r="8" fill="#111" />
             <line x1="100" y1="215" x2="100" y2="265" stroke="#111" strokeWidth="4" />
             <line x1="75" y1="240" x2="125" y2="240" stroke="#111" strokeWidth="4" />
           </g>
           {/* Lens */}
           <path d="M 40 270 L 10 260 L 10 320 L 40 310 Z" fill="#7F8C8D" stroke="#111" strokeWidth="5" />
           
           {/* Flash */}
           <circle cx="0" cy="290" r="80" fill="#FFF" opacity="0" style={{ animation: 'flashBulb 2s infinite' }} />
        </g>

        {/* 4. VFX EDITOR (Far Right) */}
        <g transform="translate(940, 55) scale(1.25)">
          
          {/* Torso */}
          <g style={{ animation: 'stressShake 1s infinite', transformOrigin: '90px 380px' }}>
            <path d="M 50 400 Q 40 330 90 250 Q 140 330 130 400 Z" fill="#FFF" stroke="#111" strokeWidth="6" />
            <path d="M 90 260 L 80 330 L 90 340 L 100 330 Z" fill="#FF3B30" />
            
            {/* Soft Screen Glow on his chest/shirts */}
            <path d="M 60 300 Q 90 270 120 300 Q 90 350 60 300 Z" fill="#00E5FF" opacity="0.15" style={{ animation: 'screenGlow 2s infinite alternate' }} />
          </g>
          
          {/* Head */}
          <g style={{ animation: 'stressShake 1.2s infinite', transformOrigin: '90px 220px' }}>
            <circle cx="90" cy="210" r="45" fill="#FFC8B4" stroke="#111" strokeWidth="6" />
            {/* Screen Glow on Face */}
            <circle cx="90" cy="210" r="40" fill="#00E5FF" opacity="0.15" style={{ animation: 'screenGlow 2s infinite alternate' }} />
            
            {/* Eyes */}
            <circle cx="70" cy="195" r="14" fill="#FFF" stroke="#111" strokeWidth="3" />
            <circle cx="110" cy="195" r="14" fill="#FFF" stroke="#111" strokeWidth="3" />
            <circle cx="70" cy="195" r="4" fill="#111" style={{ animation: 'stressShake 0.6s infinite' }} />
            <circle cx="110" cy="195" r="4" fill="#111" style={{ animation: 'stressShake 0.6s infinite' }} />
            {/* Hair */}
            <path d="M 45 180 Q 90 120 135 180 Q 145 140 90 140 Q 35 140 45 180 Z" fill="#4A3424" />
            {/* Mouth */}
            <ellipse cx="90" cy="235" rx="12" ry="18" fill="#500" stroke="#111" strokeWidth="3" />
            <path d="M 78 230 Q 90 235 102 230" fill="none" stroke="#FFF" strokeWidth="4" />
          </g>
          
          {/* Arms typing (drawn behind desk, but reaching forward) */}
          <g style={{ animation: 'franticTyping 0.6s infinite', transformOrigin: '70px 260px' }}>
            <path d="M 70 260 Q 10 320 30 370" fill="none" stroke="#111" strokeWidth="18" strokeLinecap="round" />
            <path d="M 70 260 Q 10 320 30 370" fill="none" stroke="#FFF" strokeWidth="12" strokeLinecap="round" />
          </g>
          <g style={{ animation: 'franticTyping 0.7s infinite reverse', transformOrigin: '110px 260px' }}>
            <path d="M 110 260 Q 170 320 150 370" fill="none" stroke="#111" strokeWidth="18" strokeLinecap="round" />
            <path d="M 110 260 Q 170 320 150 370" fill="none" stroke="#FFF" strokeWidth="12" strokeLinecap="round" />
          </g>
          
          {/* Sweat */}
          <g fill="#AEEBFF" stroke="#11B" strokeWidth="2">
             <path d="M 150 180 Q 165 190 155 200 Q 145 190 150 180" style={{ animation: 'sweatFly 1.5s infinite 0s' }} />
             <path d="M 20 190 Q 5 200 15 210 Q 25 200 20 190" style={{ animation: 'sweatFly 1.2s infinite 0.3s' }} />
          </g>

          {/* Desk (Drawn ON TOP of torso and legs) */}
          <path d="M -40 370 L 220 370 L 230 400 L -50 400 Z" fill="#2A2A2A" stroke="#111" strokeWidth="4" />
          <rect x="-10" y="400" width="16" height="60" fill="#111" />
          <rect x="180" y="400" width="16" height="60" fill="#111" />
          
          {/* Monitor Base */}
          <rect x="80" y="340" width="20" height="40" fill="#444" stroke="#111" strokeWidth="4" />
          <path d="M 50 380 L 130 380 L 140 390 L 40 390 Z" fill="#222" stroke="#111" strokeWidth="2" />
          
          {/* Back of Monitor (facing US, blocking the keyboard and lower arms) */}
          <rect x="-10" y="220" width="200" height="130" fill="#1A1A1A" stroke="#111" strokeWidth="6" rx="8" />
          {/* Glowing Laptop/Monitor Logo */}
          <circle cx="90" cy="285" r="16" fill="#FFF" opacity="0.8" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }} />
          <path d="M 85 275 Q 90 270 95 275 Q 90 280 85 275" fill="#1A1A1A" /> {/* Logo bite */}

        </g>
      </svg>
    </div>
  );
};

const ChillingAIUserSVG = () => {
  return (
    <div className="relative w-full aspect-video flex justify-center items-center">
      <style>{`
        @keyframes floatLeg {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-2deg) translateY(-5px); }
        }
        @keyframes tapFoot {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes steamRise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { transform: translateY(-40px) scale(1.5); opacity: 0.5; }
          100% { transform: translateY(-50px) scale(2); opacity: 0; }
        }
        @keyframes graphDraw {
          0% { stroke-dashoffset: 350; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes screenGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.2)); }
          50% { filter: drop-shadow(0 0 25px rgba(0, 229, 255, 0.4)); }
        }
        @keyframes breezeFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 15px); }
        }
        @keyframes dataFlowSmooth {
          0% { stroke-dashoffset: 200; opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { stroke-dashoffset: -200; opacity: 0; }
        }
        @keyframes showPose1 {
          0%, 35%, 65%, 100% { opacity: 1; }
          35.1%, 64.9% { opacity: 0; }
        }
        @keyframes showPose2 {
          0%, 35%, 65%, 100% { opacity: 0; }
          35.1%, 64.9% { opacity: 1; }
        }
        @keyframes tipCupPose2 {
          35.1%, 40%, 60%, 64.9% { transform: rotate(0deg); }
          45%, 55% { transform: rotate(-35deg) translate(20px, 5px); }
        }
      `}</style>
      <svg viewBox="0 0 800 500" className="w-full h-full overflow-visible">
      
        {/* Air Conditioner Unit */}
        <g transform="translate(80, 20)">
           {/* AC Shadow */}
           <rect x="0" y="5" width="160" height="45" rx="8" fill="#111" />
           {/* AC Body */}
           <rect x="0" y="0" width="160" height="45" rx="8" fill="#F4F4F4" stroke="#111" strokeWidth="4" />
           {/* Display */}
           <rect x="120" y="10" width="25" height="15" rx="2" fill="#111" />
           <text x="123" y="21" fill="#00E5FF" fontSize="10" fontFamily="monospace">18°</text>
           {/* Vent line */}
           <line x1="15" y1="25" x2="105" y2="25" stroke="#CCC" strokeWidth="2" strokeLinecap="round" />
           {/* Vent Flap (blowing down-right) */}
           <path d="M 15 35 L 140 35 L 138 45 L 17 45 Z" fill="#D0D0D0" stroke="#111" strokeWidth="2" transform="rotate(-15 75 35)" />
           
           {/* Cold Breeze Lines */}
           <g stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" style={{ animation: 'breezeFloat 4s infinite' }}>
             <path d="M 50 60 Q 80 120 180 160" fill="none" strokeDasharray="10 15 30 20" style={{ animation: 'dataFlowSmooth 2s linear infinite' }} opacity="0.6" />
             <path d="M 100 65 Q 120 100 230 130" fill="none" strokeDasharray="15 20 20 15" style={{ animation: 'dataFlowSmooth 2.5s linear infinite reverse' }} opacity="0.4" />
             <path d="M 30 70 Q 50 140 150 200" fill="none" strokeDasharray="25 10 15 15" style={{ animation: 'dataFlowSmooth 1.8s linear infinite' }} opacity="0.5" />
           </g>
           
           {/* Tiny Snowflakes */}
           <g opacity="0.6">
              <path d="M 100 120 L 110 130 M 110 120 L 100 130 M 105 115 L 105 135 M 95 125 L 115 125" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" style={{ animation: 'floatLeg 3s infinite' }} />
              <path d="M 160 170 L 166 176 M 166 170 L 160 176 M 163 167 L 163 179 M 157 173 L 169 173" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" style={{ animation: 'floatLeg 2.5s infinite reverse' }} />
           </g>
        </g>

        {/* Elegant Office Chair Profile */}
        <path d="M 180 430 L 180 480" stroke="#1A1A1A" strokeWidth="16" />
        <path d="M 130 480 L 230 480" stroke="#111" strokeWidth="12" strokeLinecap="round" />
        <circle cx="130" cy="485" r="8" fill="#333" />
        <circle cx="230" cy="485" r="8" fill="#333" />
        
        {/* Backrest (Tall and ergonomic) */}
        <path d="M 140 220 L 180 430" stroke="#111" strokeWidth="20" strokeLinecap="round" />
        <path d="M 130 220 L 170 430" stroke="#222" strokeWidth="16" strokeLinecap="round" />
        <rect x="150" y="200" width="20" height="40" rx="8" fill="#111" transform="rotate(-10 160 220)" />

        {/* Desk */}
        <rect x="420" y="420" width="16" height="70" fill="#111" />
        <rect x="740" y="420" width="16" height="70" fill="#111" />
        <path d="M 380 390 L 760 390 L 790 420 L 350 420 Z" fill="#1A1A1A" stroke="#00E5FF" strokeWidth="2" />
        
        {/* Monitor Base */}
        <rect x="580" y="320" width="16" height="80" fill="#222" />
        <path d="M 540 400 L 630 400 L 640 410 L 530 410 Z" fill="#333" />

        {/* Sleek Screen */}
        <path d="M 480 180 L 700 180 Q 710 180 710 190 L 710 320 Q 710 330 700 330 L 480 330 Q 470 330 470 320 L 470 190 Q 470 180 480 180 Z" 
              fill="#0A0A0A" stroke="#333" strokeWidth="6" style={{ animation: 'screenGlow 4s infinite' }} />

        {/* GRAPH ON SCREEN! */}
        <g transform="translate(480, 190)">
           {/* Graph grid lines */}
           <line x1="20" y1="20" x2="200" y2="20" stroke="#222" strokeWidth="2" />
           <line x1="20" y1="60" x2="200" y2="60" stroke="#222" strokeWidth="2" />
           <line x1="20" y1="100" x2="200" y2="100" stroke="#222" strokeWidth="2" />
           
           {/* X and Y Axis */}
           <path d="M 20 10 L 20 100 L 200 100" fill="none" stroke="#333" strokeWidth="4" />
           
           {/* Area under graph */}
           <path d="M 20 100 L 20 80 Q 60 90 100 50 T 200 20 L 200 100 Z" fill="rgba(0, 229, 255, 0.15)" />
           
           {/* The Line Graph soaring up */}
           <path d="M 20 80 Q 60 90 100 50 T 200 20" fill="none" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeDasharray="350" style={{ animation: 'graphDraw 4s ease-out infinite' }} />
           
           {/* Point marker */}
           <circle cx="200" cy="20" r="4" fill="#FFE066" />
           <circle cx="200" cy="20" r="8" fill="none" stroke="#FFE066" strokeWidth="2" opacity="0.6" style={{ animation: 'screenGlow 2s infinite' }} />
        </g>
        
        {/* Loading Bar at bottom of screen */}
        <g transform="translate(480, 290)">
           <rect x="20" y="20" width="180" height="6" fill="#222" rx="3" />
           <rect x="20" y="20" width="140" height="6" fill="#00E5FF" rx="3" />
           <circle cx="160" cy="23" r="3" fill="#FFF" />
           <text x="20" y="12" fill="#00E5FF" fontSize="10" fontFamily="monospace" letterSpacing="1">GENERATING...</text>
        </g>

        {/* Right arm (Relaxed behind head) */}
        <path d="M 240 240 Q 180 180 200 170 L 220 180" fill="none" stroke="#111" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 240 240 Q 180 180 200 170 L 220 180" fill="none" stroke="#F4F4F4" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />

        {/* Legs (Casually crossed resting ON the desk!) */}
        {/* Left leg: stretched onto the desk */}
        <path d="M 260 380 L 420 340 L 460 340" fill="none" stroke="#1A1A1A" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 460 340 C 480 340 510 320 480 300 C 460 300 440 320 460 340 Z" fill="#FFF" stroke="#111" strokeWidth="6" strokeLinejoin="round" /> {/* Sneaker */}

        {/* Right leg: bent across left knee. Animated tapping foot! */}
        <g style={{ animation: 'floatLeg 4s ease-in-out infinite' }}>
          <path d="M 240 360 L 330 310 L 380 370" fill="none" stroke="#222" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
          <g style={{ animation: 'tapFoot 0.5s infinite', transformOrigin: '380px 370px' }}>
            <path d="M 380 370 C 390 390 430 380 410 360 C 390 350 360 360 380 370 Z" fill="#FFF" stroke="#111" strokeWidth="6" strokeLinejoin="round" /> {/* Sneaker */}
            <path d="M 380 365 L 400 370 M 385 375 L 405 380" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" /> {/* Sneaker Details */}
          </g>
        </g>

        {/* Torso (Relaxed lean back) */}
        <path d="M 180 430 Q 150 300 240 240 Q 280 260 280 350 Z" fill="#F4F4F4" stroke="#111" strokeWidth="6" />
        <path d="M 220 280 L 260 300 L 250 400" fill="none" stroke="#E0E0E0" strokeWidth="3" /> {/* Shirt fold */}

        {/* Head (Smiling organically) */}
        <g style={{ animation: 'floatLeg 3s infinite', transformOrigin: '240px 200px' }}>
          <circle cx="230" cy="190" r="40" fill="#FFC8B4" stroke="#111" strokeWidth="5" />
          {/* Smile */}
          <path d="M 240 210 Q 250 220 260 205" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
          
          {/* Cool shades! */}
          <rect x="235" y="175" width="45" height="18" rx="6" fill="#111" transform="rotate(5 235 175)" />
          <line x1="240" y1="180" x2="275" y2="185" stroke="#FFF" strokeWidth="3" opacity="0.4" strokeLinecap="round" transform="rotate(5 235 175)" /> {/* reflection */}
          
          {/* Stylish Hair */}
          <path d="M 190 170 Q 195 130 250 140 Q 270 145 260 160 Q 240 140 200 170 Z" fill="#222" />
          <path d="M 190 170 Q 185 200 210 210" fill="none" stroke="#222" strokeWidth="10" strokeLinecap="round" />
        </g>

        {/* LEFT ARM: RESTING POSE */}
        <g style={{ animation: 'showPose1 10s infinite' }}>
          {/* Left arm (Holding Coffee) */}
          <path d="M 240 250 C 200 280 180 300 210 330" fill="none" stroke="#111" strokeWidth="26" strokeLinecap="round" />
          <path d="M 240 250 C 200 280 180 300 210 330" fill="none" stroke="#F4F4F4" strokeWidth="20" strokeLinecap="round" />
          
          {/* Hand */}
          <circle cx="220" cy="335" r="16" fill="#FFC8B4" stroke="#111" strokeWidth="3"/>
          
          {/* Coffee Mug */}
          <path d="M 205 310 L 230 310 L 225 345 L 210 345 Z" fill="#FFE066" stroke="#111" strokeWidth="4" />
          <path d="M 230 320 Q 240 320 240 330 Q 240 340 225 340" fill="none" stroke="#111" strokeWidth="4" /> {/* mug handle */}
          
          {/* Coffee steam */}
          <path d="M 215 295 Q 210 280 220 270" fill="none" stroke="#FFF" strokeWidth="3" style={{ animation: 'steamRise 3s infinite 0.5s' }} opacity="0" />
          <path d="M 225 300 Q 230 285 220 275" fill="none" stroke="#FFF" strokeWidth="3" style={{ animation: 'steamRise 3s infinite 1.5s' }} opacity="0" />
        </g>

        {/* LEFT ARM: DRINKING POSE */}
        <g style={{ animation: 'showPose2 10s infinite', opacity: 0 }}>
          {/* Arm routed upwards to face */}
          <path d="M 240 250 C 280 280 300 260 250 215" fill="none" stroke="#111" strokeWidth="26" strokeLinecap="round" />
          <path d="M 240 250 C 280 280 300 260 250 215" fill="none" stroke="#F4F4F4" strokeWidth="20" strokeLinecap="round" />
          
          {/* Hand & Cup Group tipping to mouth */}
          <g style={{ animation: 'tipCupPose2 10s infinite', transformOrigin: '250px 215px' }}>
            <circle cx="250" cy="215" r="16" fill="#FFC8B4" stroke="#111" strokeWidth="3" />
            <path d="M 235 190 L 260 190 L 255 225 L 240 225 Z" fill="#FFE066" stroke="#111" strokeWidth="4" />
            <path d="M 260 200 Q 270 200 270 210 Q 270 220 255 220" fill="none" stroke="#111" strokeWidth="4" />
            <path d="M 245 175 Q 240 160 250 150" fill="none" stroke="#FFF" strokeWidth="3" style={{ animation: 'steamRise 3s infinite 0.5s' }} opacity="0" />
          </g>
        </g>

      </svg>
    </div>
  );
};

const HappyClientSVG = () => {
  return (
    <div className="relative w-full aspect-video flex justify-center items-center">
      <style>{`
        @keyframes handshake {
          0% { transform: translateY(-5px) rotate(-2deg); }
          100% { transform: translateY(5px) rotate(2deg); }
        }
        @keyframes graphDrawUp {
          0% { stroke-dashoffset: 1500; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes graphGlow {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(0, 255, 102, 0.4)); }
          50% { filter: drop-shadow(0 0 35px rgba(0, 255, 102, 0.8)); }
        }
        @keyframes smileNod {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>
      <svg viewBox="0 0 800 500" className="w-full h-full overflow-visible">
         
         {/* MINIMAL BACKGROUND LINE GRAPH */}
         <g transform="translate(0, 0)">
           {/* Graph Thick Glow Line Only */}
           <path d="M 0 380 Q 200 350 400 250 T 800 50" fill="none" stroke="#00FF66" strokeWidth="12" strokeLinecap="round" strokeDasharray="1500" style={{ animation: 'graphDrawUp 5s ease-out infinite, graphGlow 3s ease-in-out infinite alternate' }} />
         </g>

         {/* Scale the characters up by 1.2 to make them larger and center them closely */}
         <g transform="translate(-80, -50) scale(1.2)">
           
           {/* CHARACTER 1 (Left): AI User (Cool guy) */}
           <g transform="translate(10, 0)">
              {/* Legs */}
              <path d="M 330 460 L 330 350" fill="none" stroke="#1A1A1A" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 280 460 L 300 350" fill="none" stroke="#1A1A1A" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Sneakers (detailed) */}
              <path d="M 320 460 C 310 480 340 480 360 480 C 370 480 370 460 360 455 C 340 450 320 450 320 460 Z" fill="#FFF" stroke="#111" strokeWidth="5" />
              <path d="M 270 460 C 260 480 290 480 310 480 C 320 480 320 460 310 455 C 290 450 270 450 270 460 Z" fill="#FFF" stroke="#111" strokeWidth="5" />
              
              {/* Torso & Hoodie detail */}
              <path d="M 260 360 Q 280 230 330 220 Q 370 230 340 360 Z" fill="#F4F4F4" stroke="#111" strokeWidth="6" />
              <path d="M 280 230 Q 310 260 350 230" fill="none" stroke="#E0E0E0" strokeWidth="6" strokeLinecap="round" /> {/* Hoodie neck folds */}
              <path d="M 290 280 L 320 320 L 310 360" fill="none" stroke="#E0E0E0" strokeWidth="4" strokeLinecap="round" /> {/* Wrinkle */}

              {/* Head & Neck */}
              <g style={{ animation: 'smileNod 3s infinite', transformOrigin: '320px 180px' }}>
                <circle cx="330" cy="180" r="42" fill="#FFC8B4" stroke="#111" strokeWidth="5" />
                
                {/* Hair (Slightly messy/cool) */}
                <path d="M 290 160 Q 285 110 350 125 Q 375 130 365 155 Q 340 135 295 160 Z" fill="#222" />
                <path d="M 290 160 Q 285 190 310 205" fill="none" stroke="#222" strokeWidth="12" strokeLinecap="round" />
                
                {/* Sunglasses */}
                <rect x="330" y="160" width="48" height="20" rx="6" fill="#111" transform="rotate(2 330 160)" />
                <line x1="335" y1="165" x2="375" y2="170" stroke="#FFF" strokeWidth="3" opacity="0.5" strokeLinecap="round" /> {/* Sunglass Glare */}
                
                {/* Smile / Jawline */}
                <path d="M 335 195 Q 350 215 365 195" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
                <path d="M 320 215 Q 330 225 350 220" fill="none" stroke="#E0A692" strokeWidth="3" strokeLinecap="round" /> {/* Jaw shadow */}
              </g>


           </g>

           {/* CHARACTER 2 (Right): Rich Handsome Client */}
           <g transform="translate(-10, 0)">
              {/* Legs (Tailored Suit Pants) */}
              <path d="M 500 460 L 510 350" fill="none" stroke="#222" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 550 460 L 540 350" fill="none" stroke="#222" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Luxury Dress Shoes */}
              <path d="M 500 460 C 510 480 470 480 450 480 C 440 480 440 460 450 455 C 470 450 490 450 500 460 Z" fill="#111" stroke="#333" strokeWidth="5" />
              <path d="M 550 460 C 560 480 520 480 500 480 C 490 480 490 460 500 455 C 520 450 540 450 550 460 Z" fill="#111" stroke="#333" strokeWidth="5" />

              {/* Torso & Suit Detail */}
              <path d="M 540 360 Q 560 230 500 220 Q 460 230 490 360 Z" fill="#111" stroke="#333" strokeWidth="6" />
              
              {/* Crisp Dress Shirt & Vest/Tie */}
              <path d="M 500 220 L 480 300 L 520 290 Z" fill="#FFF" stroke="#333" strokeWidth="3" />
              
              {/* Sharp Lapels */}
              <path d="M 490 220 L 460 280 L 485 295 Z" fill="#222" stroke="#444" strokeWidth="3" />
              <path d="M 505 220 L 530 270 L 515 285 Z" fill="#222" stroke="#444" strokeWidth="3" />
              
              {/* Red Silk Tie */}
              <path d="M 500 240 L 490 310 L 505 315 L 510 300 Z" fill="#FF3B30" stroke="#A00" strokeWidth="2" />
              
              {/* Pocket Square */}
              <path d="M 525 255 L 535 250 L 540 260 L 530 265 Z" fill="#FFF" />

              {/* Head */}
              <g style={{ animation: 'smileNod 3s infinite reverse', transformOrigin: '500px 180px' }}>
                <ellipse cx="500" cy="180" rx="42" ry="48" fill="#FFE0C8" stroke="#111" strokeWidth="5" />
                
                {/* Handsome Face Profile (facing left) */}
                <path d="M 465 195 Q 475 220 490 195 Z" fill="#FFF" stroke="#111" strokeWidth="4" /> {/* Charming Smile */}
                
                {/* Strong Jawline detail */}
                <path d="M 500 225 Q 480 230 465 210" fill="none" stroke="#E0C0A8" strokeWidth="4" strokeLinecap="round" />
                
                {/* Confident Eyes */}
                <path d="M 460 170 Q 470 165 480 170" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                <path d="M 490 170 Q 500 165 510 170" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                
                {/* Perfect Eyebrows */}
                <path d="M 460 155 Q 470 150 480 155" fill="none" stroke="#4A3018" strokeWidth="4" strokeLinecap="round" />
                <path d="M 490 155 Q 500 150 510 155" fill="none" stroke="#4A3018" strokeWidth="4" strokeLinecap="round" />

                {/* Handsome Slicked Hair (Pompadour) */}
                <path d="M 455 145 Q 480 100 535 125 Q 550 160 545 175 Q 535 145 490 135 Q 465 135 455 145 Z" fill="#3B2513" />
                {/* Hair slick lines */}
                <path d="M 465 142 Q 490 120 520 135" fill="none" stroke="#1E1209" strokeWidth="3" strokeLinecap="round" />
              </g>


           </g>

           {/* --- SHAKING HANDS IN THE MIDDLE --- */}
           {/* Center midpoint adjusted for the groups */}
           <g style={{ animation: 'handshake 0.5s ease-in-out infinite alternate', transformOrigin: '405px 290px' }}>
              
              {/* AI User Right Arm (extends right) */}
              <path d="M 320 230 Q 360 300 410 290" fill="none" stroke="#111" strokeWidth="26" strokeLinecap="round" />
              <path d="M 320 230 Q 360 300 410 290" fill="none" stroke="#F4F4F4" strokeWidth="20" strokeLinecap="round" />
              
              {/* Rich Client Left Arm (extends left) */}
              <path d="M 480 230 Q 450 300 405 290" fill="none" stroke="#111" strokeWidth="26" strokeLinecap="round" />
              <path d="M 480 230 Q 450 300 405 290" fill="none" stroke="#222" strokeWidth="20" strokeLinecap="round" />
              
              {/* Luxury Cuff & Watch on Client */}
              <line x1="420" y1="275" x2="415" y2="305" stroke="#FFF" strokeWidth="12" /> {/* White Cuff */}
              <rect x="422" y="275" width="6" height="30" fill="#E6C200" transform="rotate(10 422 290)" /> {/* Gold Watch */}
              <circle cx="423" cy="285" r="4" fill="#FFF" /> {/* Diamond gloss */}

              {/* Clasped Hands */}
              <path d="M 395 275 L 430 275 L 430 305 L 395 305 Z" fill="#FFE0C8" stroke="#111" strokeWidth="4" />
              <path d="M 390 275 L 415 275 L 415 305 L 390 305 Z" fill="#FFC8B4" stroke="#111" strokeWidth="4" />
              {/* Knuckles */}
              <path d="M 405 275 L 405 305" stroke="#111" strokeWidth="3" />
              <path d="M 415 275 L 415 305" stroke="#111" strokeWidth="2" />
           </g>

         </g>

      </svg>
    </div>
  );
};

const WeBelieveSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // Track section visibility to pause heavy SVG animations off-screen
  const isInView = useInView(sectionRef, { once: false, amount: 0 });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // 3-stage scroll-driven animation — one stage per block (equal thirds)
      // Trigger: section top enters viewport bottom → section bottom exits viewport bottom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end:   'bottom bottom',
          scrub: 1.5,
        }
      });

      // ── Background colors ───────────────────────────────────────────────────
      tl.set(sectionRef.current, { backgroundColor: '#F48B29' }, 0);
      
      // Blocks are roughly 1/3 of the scroll distance.
      // 0.00 – 0.40 : Block 1 is the primary focus. Keep it solid Orange.
      // 0.40 – 0.60 : Block 1 scrolls out, Block 2 scrolls in. Transition color here!
      tl.to(sectionRef.current,  { backgroundColor: '#FDE047', duration: 0.10, ease: 'none' }, 0.40); // 0.40 to 0.50
      tl.to(sectionRef.current,  { backgroundColor: '#4FC3F7', duration: 0.10, ease: 'none' }, 0.50); // 0.50 to 0.60
      
      // 0.60 – 0.75 : Block 2 is the primary focus. Keep it solid Sky Blue.
      // 0.75 – 0.90 : Block 2 scrolls out, Block 3 scrolls in. Transition color here!
      tl.to(sectionRef.current,  { backgroundColor: '#8CDAA6', duration: 0.15, ease: 'none' }, 0.75); // 0.75 to 0.90
      
      // 0.90 – 1.00 : Block 3 is the primary focus. Keep it solid Mint Green.

      // ── CSS variable text colors (match each background stage) ──────────────
      // Stage 1: dark brown text on orange
      tl.set(sectionRef.current, {
        '--dynamic-text':     '#4E2101',
        '--dynamic-subtext':  'rgba(78,33,1,0.75)',
        '--dynamic-border':   'rgba(78,33,1,0.25)',
        '--dynamic-pill-bg':  'rgba(78,33,1,0.08)',
      }, 0);
      
      // Stage 2: smooth transition to dark navy text on sky blue
      tl.to(sectionRef.current, {
        '--dynamic-text':     '#052A54',
        '--dynamic-subtext':  'rgba(5,42,84,0.75)',
        '--dynamic-border':   'rgba(5,42,84,0.25)',
        '--dynamic-pill-bg':  'rgba(5,42,84,0.08)',
        duration: 0.20, ease: 'none'
      }, 0.40); // Spans 0.40 to 0.60
      
      // Stage 3: smooth transition to dark forest text on mint green
      tl.to(sectionRef.current, {
        '--dynamic-text':     '#0B4226',
        '--dynamic-subtext':  'rgba(11,66,38,0.75)',
        '--dynamic-border':   'rgba(11,66,38,0.25)',
        '--dynamic-pill-bg':  'rgba(11,66,38,0.08)',
        duration: 0.15, ease: 'none'
      }, 0.75); // Spans 0.75 to 0.90
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="we-believe"
      data-section="2"
      data-bg="#F48B29"
      ref={sectionRef}
      className="relative w-full"
      style={{
        zIndex: 1,
        backgroundColor: '#F48B29', // GSAP will take over from here
        '--dynamic-text':    '#4E2101',
        '--dynamic-subtext': 'rgba(78,33,1,0.75)',
        '--dynamic-border':  'rgba(78,33,1,0.25)',
        '--dynamic-pill-bg': 'rgba(78,33,1,0.08)',
      } as React.CSSProperties}
    >
      {/* ── BLOCK 1: High-fidelity production ── → Orange (GSAP owns background) */}
      <div>
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 min-h-[75vh] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-16 lg:py-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center mb-6">
              <span 
                className="font-mono text-[14px] sm:text-[16px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border backdrop-blur-md" 
                style={{ color: 'var(--dynamic-text)', backgroundColor: 'var(--dynamic-pill-bg)', borderColor: 'var(--dynamic-border)' }}
              >
                CRAFT & FIDELITY
              </span>
            </div>
            
            <h2 className="font-heading tracking-tight mb-8" style={{ fontSize: 'clamp(4rem, 9vw, 120px)', lineHeight: 0.95, color: 'var(--dynamic-text)' }}>
              High-fidelity <br />
              <span className="opacity-90" style={{ fontStyle: 'italic', textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>production.</span>
            </h2>
            
            <p className="font-body text-[22px] sm:text-[28px] xl:text-[32px] max-w-2xl leading-[1.35] font-light tracking-tight" style={{ color: 'var(--dynamic-subtext)' }}>
              I refuse to compromise on craft. Fusing <span className="font-normal" style={{ color: 'var(--dynamic-text)' }}>classical composition</span> with <span className="font-normal" style={{ color: 'var(--dynamic-text)' }}>generative precision</span>, I build hyper-realistic product worlds and deliver pixel-perfect retouching. 
              <br/><br/>
              <span className="font-handwritten block text-[24px] sm:text-[30px] xl:text-[34px] leading-[1.3] mt-2" style={{ color: 'var(--dynamic-text)', opacity: 0.9, letterSpacing: '0.02em' }}>Speed used to be the enemy of perfection. Now, I've mastered both.</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }} 
            whileInView={{ opacity: 1, scale: 1, y: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full"
          >
             <div className={`w-full aspect-video flex items-center justify-center p-0 lg:p-8 ${!isInView ? 'animations-paused' : ''}`}>
                <TraditionalSetSVG />
             </div>
          </motion.div>

        </div>
      </div>

      {/* ── BLOCK 2: 10x Faster output ── → Sky Blue (GSAP owns background) */}
      <div>
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 min-h-[75vh] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-16 lg:py-24">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }} 
            whileInView={{ opacity: 1, scale: 1, y: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full order-2 lg:order-1"
          >
             <div className={`w-full aspect-video flex items-center justify-center p-0 lg:p-8 ${!isInView ? 'animations-paused' : ''}`}>
                <ChillingAIUserSVG />
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center order-1 lg:order-2"
          >
            <div className="font-heading italic tracking-tighter" style={{ fontSize: 'clamp(6rem, 12vw, 200px)', lineHeight: 0.8, color: 'var(--dynamic-text)' }}>
              10x
            </div>
            <div className="mt-6 mb-8 flex justify-start">
              <span className="font-mono text-[18px] sm:text-[22px] font-bold tracking-[0.4em] px-8 py-3 rounded-full border shadow-2xl backdrop-blur-md" style={{ color: 'var(--dynamic-text)', backgroundColor: 'var(--dynamic-pill-bg)', borderColor: 'var(--dynamic-border)' }}>
                FASTER OUTPUT
              </span>
            </div>
            
            <p className="font-body text-[22px] sm:text-[28px] xl:text-[32px] max-w-2xl leading-[1.35] font-light tracking-tight" style={{ color: 'var(--dynamic-subtext)' }}>
              Say goodbye to bloated, week-long production cycles. I leverage <span className="font-normal" style={{ color: 'var(--dynamic-text)' }}>cutting-edge AI pipelines</span> to generate, iterate, and deliver at an unhindered pace. 
              <br/><br/>
              <span className="font-handwritten block text-[24px] sm:text-[30px] xl:text-[34px] leading-[1.3] mt-2" style={{ color: 'var(--dynamic-text)', opacity: 0.9, letterSpacing: '0.02em' }}>I'm not just saving time — I'm rewriting the unit economics of premium visual design.</span>
            </p>
          </motion.div>

        </div>
      </div>

      {/* ── BLOCK 3: Total satisfaction ── → Mint Green (GSAP owns background) */}
      <div>
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 min-h-[75vh] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-16 lg:py-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center mb-6">
              <span 
                className="font-mono text-[14px] sm:text-[16px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border backdrop-blur-md" 
                style={{ color: 'var(--dynamic-text)', backgroundColor: 'var(--dynamic-pill-bg)', borderColor: 'var(--dynamic-border)' }}
              >
                RESULTS
              </span>
            </div>
            
            <h2 className="font-heading tracking-tight mb-8" style={{ fontSize: 'clamp(4rem, 9vw, 120px)', lineHeight: 0.95, color: 'var(--dynamic-text)' }}>
              Total <br />
              <span className="opacity-90" style={{ fontStyle: 'italic', textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>satisfaction.</span>
            </h2>
            
            <p className="font-body text-[22px] sm:text-[28px] xl:text-[32px] max-w-2xl leading-[1.35] font-light tracking-tight" style={{ color: 'var(--dynamic-subtext)' }}>
              What happens when you remove creative constraints? <span className="font-normal" style={{ color: 'var(--dynamic-text)' }}>Pure magic.</span> I deliver a seamless, ultra-high-fidelity experience that eliminates agonizing back-and-forth revisions.
              <br/><br/>
              <span className="font-handwritten block text-[24px] sm:text-[30px] xl:text-[34px] leading-[1.3] mt-2" style={{ color: 'var(--dynamic-text)', opacity: 0.9, letterSpacing: '0.02em' }}>Faster turnarounds. Zero compromises. Infinitely better outcomes.</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }} 
            whileInView={{ opacity: 1, scale: 1, y: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full"
          >
             <div className={`w-full aspect-video flex items-center justify-center p-0 lg:p-8 ${!isInView ? 'animations-paused' : ''}`}>
                <HappyClientSVG />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WeBelieveSection;