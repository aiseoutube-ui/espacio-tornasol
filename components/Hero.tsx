import React, { useEffect, useState } from 'react';
import { Heart, Leaf, Sun } from 'lucide-react';
import { BRAND_COLORS } from '../constants';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Parallax Mouse Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setOffset({
        x: (e.clientX / window.innerWidth) * 30,
        y: (e.clientY / window.innerHeight) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
      {/* Background Decorative Blobs - Matching Brand Colors */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] blur-3xl rounded-full mix-blend-multiply filter blob-shape opacity-60"
        style={{ 
          backgroundColor: '#FDF0D5', // Very pale yellow
          transform: `translate(${offset.x * -1.5}px, ${offset.y * -1.5}px)` 
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] blur-3xl rounded-full mix-blend-multiply filter blob-shape animation-delay-2000 opacity-50"
        style={{ 
          backgroundColor: '#F8E1E3', // Pale pink
          transform: `translate(${offset.x * 1.5}px, ${offset.y * 1.5}px)` 
        }}
      />
      <div 
        className="absolute top-[30%] right-[20%] w-[400px] h-[400px] blur-3xl rounded-full mix-blend-multiply filter blob-shape animation-delay-4000 opacity-40"
        style={{ 
          backgroundColor: '#C3EBE4', // Pale teal
          transform: `translate(${offset.x}px, ${offset.y}px)` 
        }}
      />

      {/* Floating Brand Icons */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        {/* Sun Top Left */}
        <div 
           className="absolute top-[18%] left-[12%] animate-bounce"
           style={{ animationDuration: '4s' }} 
        >
          <Sun 
            className="w-20 h-20 drop-shadow-lg" 
            color={BRAND_COLORS.yellow} 
            fill={BRAND_COLORS.yellow}
            style={{ transform: `translate(${offset.x * -1}px, ${offset.y * -1}px)` }}
          />
        </div>

        {/* Heart Bottom Right */}
        <div 
          className="absolute bottom-[20%] right-[10%] animate-pulse"
          style={{ animationDuration: '5s' }}
        >
          <Heart 
            className="w-16 h-16 drop-shadow-lg" 
            color={BRAND_COLORS.pink} 
            fill={BRAND_COLORS.pink}
            style={{ transform: `translate(${offset.x * 1.5}px, ${offset.y * 1.5}px) rotate(10deg)` }}
          />
        </div>

        {/* Leaf Top Right */}
        <div className="absolute top-[25%] right-[22%]">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center drop-shadow-lg"
            style={{ 
              backgroundColor: BRAND_COLORS.teal,
              transform: `translate(${offset.x * -2}px, ${offset.y * -2}px) rotate(-10deg)` 
            }}
          >
            <Leaf 
              className="w-10 h-10 text-[#134e4a]" 
              fill="#134e4a"
              style={{ transform: 'rotate(-45deg)' }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white border border-slate-100 shadow-sm animate-fade-in-up">
          <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">By Cynthia Queens</span>
        </div>
        
        {/* Big Title with Logo Font */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#264653] mb-8 leading-tight tracking-wider font-['Fredoka']">
          <span className="inline-block hover:scale-105 transition-transform duration-500 cursor-default">TORNASOL</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-slate-600 max-w-3xl mx-auto mb-12 font-medium leading-relaxed font-['Quicksand']">
          Donde la <span className="font-bold underline decoration-4 underline-offset-4 decoration-[#F4D35E]">creatividad</span> florece y el <span className="font-bold underline decoration-4 underline-offset-4 decoration-[#EE969A]">corazón</span> aprende jugando.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#services"
            className="group w-full sm:w-auto px-10 py-5 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative"
            style={{ backgroundColor: BRAND_COLORS.teal }}
          >
            <span className="relative z-10">Explorar Talleres</span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </a>
          <a 
            href="#contact"
            className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 border-2 border-slate-100 text-lg font-bold rounded-full hover:bg-gray-50 hover:border-slate-300 transition-all duration-300 shadow-sm"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;