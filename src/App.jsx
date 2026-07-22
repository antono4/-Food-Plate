import React, { useState, useCallback } from 'react';
import { User, Search, Play, Heart, ChevronLeft, MoreHorizontal } from 'lucide-react';

// Theme constants
const IMAGES = {
  plate1: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400&h=400',
  plate2: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400&h=400',
  plate3: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=400&h=400',
  plate4: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400&h=400',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
  avatar2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
};

// Theme colors
const theme = {
  bg: 'bg-[#1a4a42]',
  bgGradient: 'bg-gradient-to-b from-[#18453d] via-[#1a4a42] to-[#143e37]',
  card: 'bg-[#225b53]',
  cardTranslucent: 'bg-white/5 backdrop-blur-sm',
  text: 'text-white',
  textMuted: 'text-white/60',
  textSubtle: 'text-white/40',
  button: 'bg-white text-[#1a4a42]',
  accent: '#1a4a42'
};

// Reusable components
const IconButton = ({ children, onClick, className = '', ariaLabel }) => (
  <button
    onClick={onClick}
    className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors ${className}`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

const CategoryCard = ({ image, title, count, onClick }) => (
  <div
    onClick={onClick}
    className={`min-w-[140px] rounded-[28px] ${theme.cardTranslucent} p-4 pt-5 pb-6 flex flex-col items-center relative border border-white/10 shadow-lg cursor-pointer hover:bg-white/10 transition-colors`}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
  >
    <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white/40" />
    <div className="w-20 h-20 rounded-full mb-4 shadow-[0_10px_25px_rgba(0,0,0,0.3)] overflow-hidden border-2 border-white/10 relative z-10">
      <img src={image} className="w-full h-full object-cover" alt={title} loading="lazy" />
    </div>
    <p className="text-[12px] text-center font-medium leading-tight">{title}</p>
    <p className="text-[9px] text-white/40 mt-2">{count} Recipes</p>
  </div>
);

const InfoCard = ({ label, value, icon }) => (
  <div className={`p-4 rounded-[20px] ${theme.cardTranslucent} border border-white/10 flex flex-col justify-center relative overflow-hidden group`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <p className="text-[12px] font-semibold mb-1 text-white/90">{label}</p>
    <p className="text-[10px] text-white/50 tracking-wide uppercase">{value}</p>
    <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-white/30" />
  </div>
);

const GeometricOrnament = ({ scale = 1, opacity = 0.25 }) => (
  <div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    style={{ opacity, transform: `scale(${scale})` }}
  >
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="150" cy="150" r="140" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" />
      <polygon points="85,15 215,15 285,85 285,215 215,285 85,285 15,215 15,85" stroke="white" strokeWidth="0.5"/>
      <polygon points="150,25 238,63 275,150 238,237 150,275 62,237 25,150 62,63" stroke="white" strokeWidth="0.25"/>
      <circle cx="150" cy="150" r="110" stroke="white" strokeWidth="1"/>
      <circle cx="150" cy="150" r="90" stroke="white" strokeWidth="0.5" strokeDasharray="4 4"/>
      <line x1="150" y1="15" x2="150" y2="40" stroke="white" strokeWidth="0.5" />
      <line x1="150" y1="260" x2="150" y2="285" stroke="white" strokeWidth="0.5" />
      <line x1="15" y1="150" x2="40" y2="150" stroke="white" strokeWidth="0.5" />
      <line x1="260" y1="150" x2="285" y2="150" stroke="white" strokeWidth="0.5" />
    </svg>
  </div>
);

const PrimaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full py-4 rounded-full text-[14px] font-bold tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:bg-gray-100 transition-all active:scale-[0.98] ${theme.button}`}
  >
    {children}
  </button>
);

// Screen components
const ScreenWelcome = ({ onNext }) => (
  <div className="flex flex-col h-full p-6 pt-14 pb-8 relative">
    <div className="flex justify-between items-center mb-8 z-10">
      <IconButton ariaLabel="User profile">
        <User size={14} className="text-white" />
      </IconButton>
      <IconButton ariaLabel="Search recipes">
        <Search size={14} className="text-white" />
      </IconButton>
    </div>

    <div className="space-y-4 z-10 flex-1">
      <h1 className="text-[32px] font-semibold tracking-wide leading-tight mb-2">Welcome</h1>
      <p className={`${theme.textMuted} text-[12px] leading-[1.7] max-w-[95%]`}>
        Discover your favorite recipes. We have a curated collection of culinary delights that you can easily try at home. Let's start your cooking journey!
      </p>
      
      <div className="pt-2">
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Featured Today</p>
        <div className="h-[1px] w-12 bg-white/20" />
      </div>

      <div className="mt-8">
        <p className="text-[13px] font-medium mb-4 tracking-wide">Explore categories</p>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar -mx-6 px-6">
          <CategoryCard
            image={IMAGES.plate1}
            title="Healthy Salads"
            count={24}
            onClick={() => {}}
          />
          <CategoryCard
            image={IMAGES.plate4}
            title="Nourish Bowls"
            count={18}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>

    <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
  </div>
);

const ScreenDetailAuthor = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full p-6 pt-14 pb-8 relative overflow-hidden">
    <div className="flex justify-between items-center z-20">
      <IconButton onClick={onBack} ariaLabel="Go back">
        <ChevronLeft size={16} className="text-white pr-0.5" />
      </IconButton>
      <h2 className="text-[15px] font-medium tracking-widest uppercase text-white/90">Sky Dishes</h2>
      <IconButton ariaLabel="Add to favorites">
        <Heart size={14} className="text-white" />
      </IconButton>
    </div>

    <div className="relative mt-12 mb-10 flex justify-center items-center h-[280px] z-10">
      <GeometricOrnament scale={1.1} opacity={0.3} />
      <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-white/20" />
      <div className="absolute bottom-12 right-12 w-1.5 h-1.5 rounded-full bg-white/30" />
      <div className="w-[200px] h-[200px] rounded-full z-20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden border-[4px] border-[#18453d] relative">
        <img src={IMAGES.plate2} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Raw Salmon Bowl" loading="lazy" />
      </div>
    </div>

    <div className="z-20 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[26px] font-semibold leading-none">Raw Salmon<br/>Bowl</h3>
        <div className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
          <span className="text-[10px] font-bold tracking-wider">4.8 ★</span>
        </div>
      </div>
      
      <p className={`${theme.textMuted} text-[12px] leading-[1.7] mb-8`}>
        A beautiful arrangement of fresh raw salmon with seasonal vegetables and quinoa. Perfect for a light, nutritious meal packed with omega-3s and delicate flavors.
      </p>

      <div className={`mt-auto mb-8 rounded-[24px] ${theme.cardTranslucent} p-3.5 flex items-center gap-3.5 border border-white/10 shadow-lg`}>
        <div className="relative">
          <img src={IMAGES.avatar} className="w-11 h-11 rounded-full object-cover border border-white/20" alt="Maria Gonzales" loading="lazy" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#18453d] rounded-full" />
        </div>
        <div>
          <p className="text-[10px] text-white/50 mb-0.5 uppercase tracking-wide">Recipe creator</p>
          <p className="text-[13px] font-medium tracking-wide">Maria Gonzales</p>
        </div>
        <button className="ml-auto w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition-colors" aria-label="Play recipe video">
          <Play size={14} className="text-[#1a4a42] ml-0.5" fill="currentColor" />
        </button>
      </div>

      <PrimaryButton onClick={onNext}>Start Cooking</PrimaryButton>
    </div>
  </div>
);

const ScreenDetailGrid = ({ onNext, onBack }) => (
  <div className="flex flex-col h-full p-6 pt-14 pb-8 relative overflow-hidden">
    <div className="flex justify-between items-center z-20">
      <button onClick={onBack} className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-full transition-colors" aria-label="Go back">
        <ChevronLeft size={20} className="text-white" />
      </button>
      <h2 className="text-[15px] font-medium tracking-widest uppercase text-white/90">Recipes</h2>
      <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors" aria-label="More options">
        <MoreHorizontal size={20} className="text-white" />
      </button>
    </div>

    <div className="relative mt-8 mb-6 flex justify-center items-center h-[240px] z-10">
      <GeometricOrnament scale={0.9} opacity={0.35} />
      <div className="w-[170px] h-[170px] rounded-full z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-[3px] border-[#18453d]">
        <img src={IMAGES.plate3} className="w-full h-full object-cover" alt="Spicy Pasta Primavera" loading="lazy" />
      </div>
    </div>

    <div className="z-20 flex-1 flex flex-col">
      <h3 className="text-[22px] font-semibold text-center mb-3">Spicy Pasta<br/>Primavera</h3>
      <p className={`${theme.textMuted} text-[11px] leading-[1.6] text-center px-4 mb-8`}>
        This delightful pasta dish combines rich roasted tomatoes with al dente spaghetti, creating a perfect symphony of taste and texture.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-auto">
        <InfoCard label="Method" value="Stovetop" />
        <InfoCard label="Time" value="45 Minutes" />
        <InfoCard label="Portion" value="2 Servings" />
        <InfoCard label="Calories" value="320 kcal" />
      </div>

      <PrimaryButton onClick={onNext}>View Steps</PrimaryButton>
    </div>
  </div>
);

const MobileFrame = ({ children }) => (
  <div className="w-full max-w-[375px] h-[812px] bg-black rounded-[3.5rem] p-[8px] shadow-[0_0_50px_rgba(26,74,66,0.3)] relative overflow-hidden border-[4px] border-[#2a2a2a]">
    {/* Hardware details - Notch / Dynamic Island */}
    <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
      <div className="w-32 h-6 bg-black rounded-b-3xl relative">
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#111] rounded-full border border-white/10" />
      </div>
    </div>

    {/* Side buttons */}
    <div className="absolute left-[-4px] top-[120px] w-[4px] h-[25px] bg-[#2a2a2a] rounded-l-md" />
    <div className="absolute left-[-4px] top-[160px] w-[4px] h-[50px] bg-[#2a2a2a] rounded-l-md" />
    <div className="absolute left-[-4px] top-[220px] w-[4px] h-[50px] bg-[#2a2a2a] rounded-l-md" />
    <div className="absolute right-[-4px] top-[180px] w-[4px] h-[75px] bg-[#2a2a2a] rounded-r-md" />
    
    {/* Screen */}
    <div className={`w-full h-full rounded-[3rem] overflow-hidden relative ${theme.bgGradient} ${theme.text}`}>
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-0"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
      />
      {children}
      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
        <div className="w-[120px] h-1.5 bg-white/40 rounded-full" />
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextScreen = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveScreen((prev) => (prev + 1) % 3);
      setIsTransitioning(false);
    }, 150);
  }, [isTransitioning]);

  const prevScreen = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveScreen((prev) => (prev - 1 + 3) % 3);
      setIsTransitioning(false);
    }, 150);
  }, [isTransitioning]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans selection:bg-white/30">
      <MobileFrame>
        <div className={`h-full w-full transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {activeScreen === 0 && <ScreenWelcome onNext={nextScreen} />}
          {activeScreen === 1 && <ScreenDetailAuthor onNext={nextScreen} onBack={prevScreen} />}
          {activeScreen === 2 && <ScreenDetailGrid onNext={nextScreen} onBack={prevScreen} />}
        </div>
      </MobileFrame>
      
      <div className="fixed bottom-8 text-white/40 text-xs font-medium tracking-wider uppercase">
        Click main button to cycle screens
      </div>
    </div>
  );
}
