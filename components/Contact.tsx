import React from 'react';
import { Instagram, Mail, MapPin, Sun, Heart, Leaf } from 'lucide-react';
import { BRAND_COLORS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative pt-24 pb-12 bg-[#264653] text-white overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
         <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full mix-blend-screen blur-3xl" style={{ backgroundColor: BRAND_COLORS.teal }}></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full mix-blend-screen blur-3xl" style={{ backgroundColor: BRAND_COLORS.pink }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* CTA Text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
                <Sun className="w-5 h-5" color={BRAND_COLORS.yellow} fill={BRAND_COLORS.yellow} />
                <span className="font-bold tracking-widest uppercase text-sm" style={{ color: BRAND_COLORS.yellow }}>Únete a la familia</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-2 leading-tight font-['Fredoka']">
              ¿Listo para despertar la creatividad?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-md font-['Quicksand']">
              Escríbenos para reservar un lugar en nuestros talleres o adquirir nuestros kits educativos. ¡Nos encantaría conocerte!
            </p>
            
            <div className="space-y-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center group p-4 rounded-2xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:bg-[#E1306C] transition-colors">
                  <Instagram className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-lg">Instagram</p>
                  <p className="text-slate-400 group-hover:text-white transition-colors">@espacio_tornasol</p>
                </div>
              </a>
              
              <div className="flex items-center group p-4 rounded-2xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:bg-[#EA4335] transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-lg">Email</p>
                  <p className="text-slate-400 group-hover:text-white transition-colors">hola@tornasol.com</p>
                </div>
              </div>

               <div className="flex items-center group p-4 rounded-2xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:bg-[#4285F4] transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-lg">Ubicación</p>
                  <p className="text-slate-400 group-hover:text-white transition-colors">Ciudad de México</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nombre</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-[#2A9D8F] focus:ring-1 focus:ring-[#2A9D8F] outline-none transition-colors text-white placeholder-slate-600" placeholder="Tu nombre" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Teléfono</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-[#2A9D8F] focus:ring-1 focus:ring-[#2A9D8F] outline-none transition-colors text-white placeholder-slate-600" placeholder="55 1234 5678" />
                </div>
              </div>
              <div>
                <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Interés</label>
                <select id="service" className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-[#2A9D8F] focus:ring-1 focus:ring-[#2A9D8F] outline-none transition-colors text-white appearance-none cursor-pointer">
                  <option className="bg-slate-800">Clases de Arte</option>
                  <option className="bg-slate-800">Talleres</option>
                  <option className="bg-slate-800">Kits Educativos</option>
                  <option className="bg-slate-800">Información General</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Mensaje</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-[#2A9D8F] focus:ring-1 focus:ring-[#2A9D8F] outline-none transition-colors text-white placeholder-slate-600" placeholder="Cuéntanos un poco más..."></textarea>
              </div>
              <button type="button" className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-[#2A9D8F]/25 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#2A9D8F] to-[#264653] transition-all duration-300 group-hover:scale-105"></div>
                 <span className="relative z-10">ENVIAR MENSAJE</span>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          
           {/* Footer Logo */}
           <div className="flex items-center gap-2 mb-4 md:mb-0 opacity-70 hover:opacity-100 transition-opacity">
               <Sun className="w-5 h-5" color={BRAND_COLORS.yellow} fill={BRAND_COLORS.yellow}/>
               <Heart className="w-5 h-5" color={BRAND_COLORS.pink} fill={BRAND_COLORS.pink}/>
               <span className="font-['Fredoka'] font-bold text-lg tracking-widest">TORNASOL</span>
           </div>

          <p className="text-slate-500 text-sm">© 2024 Tornasol by Cynthia Queens.</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm font-medium text-slate-500">
             <a href="#" className="hover:text-[#F4D35E] transition-colors">Privacidad</a>
             <a href="#" className="hover:text-[#EE969A] transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;