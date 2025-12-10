import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Heart, Leaf, ShoppingBag } from 'lucide-react';
import { BRAND_COLORS } from '../constants';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, toggleCart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Portafolio', href: '#portfolio' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FDFBF7]/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex items-center -space-x-2 group-hover:space-x-1 transition-all duration-500 ease-out">
               <div className="relative z-30 bg-[#FDFBF7] rounded-full p-0.5 shadow-sm transform group-hover:rotate-12 transition-transform">
                  <Sun className="h-8 w-8" color={BRAND_COLORS.yellow} fill={BRAND_COLORS.yellow} />
               </div>
               <div className="relative z-20 bg-[#FDFBF7] rounded-full p-0.5 shadow-sm transform group-hover:scale-110 transition-transform delay-75">
                  <Heart className="h-8 w-8" color={BRAND_COLORS.pink} fill={BRAND_COLORS.pink} />
               </div>
               <div className="relative z-10 bg-[#FDFBF7] rounded-full p-0.5 shadow-sm transform group-hover:-rotate-12 transition-transform delay-100">
                 <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND_COLORS.teal }}>
                    <Leaf className="h-4 w-4 text-[#134e4a]" fill="#134e4a" style={{ transform: 'rotate(-45deg)' }} />
                 </div>
               </div>
            </div>
            
            <div className="flex flex-col pl-1">
              <span className="text-xl font-black tracking-[0.2em] text-[#264653] font-['Fredoka'] leading-none group-hover:text-teal-700 transition-colors">
                TORNASOL
              </span>
              <span className="text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase leading-tight mt-1 group-hover:text-[#EE969A] transition-colors">
                By Cynthia Queens
              </span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-[#2A9D8F] font-bold text-sm tracking-wide transition-colors duration-200"
              >
                {link.name.toUpperCase()}
              </a>
            ))}

            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className="relative p-2 text-slate-600 hover:text-[#264653] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#EE969A] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-slate-600"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#EE969A] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-[#2A9D8F] focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#FDFBF7]/95 backdrop-blur-xl absolute top-full left-0 w-full shadow-xl border-t border-gray-100">
          <div className="flex flex-col px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-[#2A9D8F] font-bold text-lg tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;