import React, { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../constants';
import { ArrowRight, Sparkles } from 'lucide-react';

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-teal-100 rounded-full blur-xl opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 font-['Fredoka'] relative z-10">
              Nuestros Espacios
            </h2>
            {/* Doodle underline */}
            <svg className="absolute -bottom-2 w-full h-3 text-[#EE969A]" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mt-6 font-medium">
            Diseñamos experiencias educativas que respetan el ritmo y la curiosidad natural de cada niño.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => {
            const isHovered = hoveredId === service.id;
            
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-[#FDFBF7] rounded-[2rem] p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 border-2 border-transparent hover:border-slate-100 fade-in-up"
                style={{ transitionDelay: service.delay }}
              >
                {/* Background morphing blob on hover */}
                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full filter blur-2xl opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-40' : ''}`}
                  style={{ backgroundColor: service.color.includes('yellow') ? '#F4D35E' : service.color.includes('teal') ? '#2A9D8F' : service.color.includes('pink') ? '#EE969A' : '#F4A261' }}
                ></div>

                {/* ICON CONTAINER */}
                <div className="relative mb-8 flex justify-center perspective-500">
                  <div 
                    className={`
                      relative w-24 h-24 rounded-full flex items-center justify-center 
                      transition-all duration-300
                      ${service.color}
                      ${isHovered ? 'shadow-xl scale-110 bg-white rotate-3' : 'shadow-sm animate-float bg-opacity-100'}
                    `}
                    style={{
                      // Ensure colors pop correctly on hover
                    }}
                  >
                    {/* The Icon itself with Jelly Animation */}
                    <service.icon 
                      className={`
                        w-10 h-10 transition-all duration-300
                        ${isHovered ? 'hover-jelly scale-125' : ''}
                      `}
                    />
                    
                    {/* Tiny sparkles that appear on hover */}
                    {isHovered && (
                      <>
                        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" />
                        <Sparkles className="absolute bottom-0 -left-2 w-4 h-4 text-yellow-400 animate-spin" style={{animationDuration: '3s'}} />
                      </>
                    )}
                  </div>
                </div>
                
                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-bold text-[#264653] mb-3 group-hover:text-teal-700 transition-colors font-['Fredoka']">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed font-['Quicksand'] font-medium">
                    {service.description}
                  </p>

                  <a 
                    href="#contact" 
                    className={`
                      inline-flex items-center text-sm font-bold px-4 py-2 rounded-full transition-all duration-300
                      ${isHovered ? 'bg-[#264653] text-white -translate-y-1 shadow-md' : 'text-slate-400 bg-transparent'}
                    `}
                  >
                    Saber más 
                    <ArrowRight className={`ml-2 w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;