import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#F4D35E]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Hola, soy Cynthia Queens
            </h2>
            <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
              <p>
                Fundadora de <span className="font-bold text-teal-700">Tornasol</span>. Mi pasión es crear puentes entre el arte y la educación temprana.
              </p>
              <p>
                Creo firmemente que los niños aprenden mejor cuando se sienten libres, seguros y emocionados. Por eso, en Tornasol, no solo enseñamos arte; facilitamos el descubrimiento.
              </p>
              <p>
                Desde talleres sensoriales hasta kits educativos para el hogar, cada detalle está pensado para nutrir la creatividad innata de tus hijos.
              </p>
            </div>
            
            <div className="mt-8 flex gap-4">
               <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-orange-100">
                  <span className="text-3xl font-bold text-orange-400">+500</span>
                  <span className="text-sm text-slate-500 font-medium">Alumnos felices</span>
               </div>
               <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-pink-100">
                  <span className="text-3xl font-bold text-pink-400">100%</span>
                  <span className="text-sm text-slate-500 font-medium">Amor y Dedicación</span>
               </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="lg:w-1/2 order-1 lg:order-2 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://picsum.photos/800/800?random=1" 
                alt="Cynthia Queens trabajando con niños" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-xl">@cynthiaqueens</p>
                <p className="text-sm opacity-90">Education & Art</p>
              </div>
            </div>
            
            {/* Decorative Elements behind image */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-300 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-300 rounded-full blur-2xl opacity-50"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
