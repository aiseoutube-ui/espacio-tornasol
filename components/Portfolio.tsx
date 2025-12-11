import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioCategory, PortfolioItem } from '../types';
import { ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<PortfolioCategory>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const filteredItems = filter === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  const categories: { id: PortfolioCategory; label: string }[] = [
    { id: 'all', label: 'Todo' },
    { id: 'manualidades', label: 'Manualidades' },
    { id: 'madera', label: 'Madera' },
    { id: '3d', label: 'Impresión 3D' },
  ];

  // Create enough duplicates to allow smooth infinite scrolling
  // We need enough width to scroll significantly before resetting
  const displayItems = filteredItems.length > 0 
    ? [...filteredItems, ...filteredItems, ...filteredItems, ...filteredItems, ...filteredItems] 
    : [];

  // Infinite Scroll Logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || filteredItems.length === 0) return;

    let animationFrameId: number;
    const speed = 0.5; // Pixels per frame

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += speed;

        // Reset logic: When we've scrolled past the first set of items (approx), jump back
        // We calculate the width of one single set of items to know when to loop
        const singleSetWidth = scrollContainer.scrollWidth / 5; 
        
        if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
           // Jump back seamlessly to the first set
           scrollContainer.scrollLeft -= singleSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, filteredItems.length]);

  const scrollManual = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 350; // Approx one card width + gap
    
    scrollRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="portfolio" className="py-24 bg-[#FDFBF7] relative overflow-hidden group/section">
      {/* Decorative floating letters/shapes background */}
      <div className="absolute top-20 left-10 opacity-5 font-black text-9xl text-[#2A9D8F] rotate-12 select-none pointer-events-none animate-pulse">A</div>
      <div className="absolute bottom-40 right-10 opacity-5 font-black text-9xl text-[#EE969A] -rotate-12 select-none pointer-events-none animate-pulse">B</div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] w-[150%] h-[150%] bg-[radial-gradient(circle,_#F4D35E_1px,_transparent_1px)] bg-[length:40px_40px] pointer-events-none"></div>

      <div className="w-full relative z-10 flex flex-col h-full mx-auto">
        <div className="w-full text-center mb-12 px-4">
          <span className="text-[#EE969A] font-bold tracking-widest uppercase text-sm mb-2 block animate-fade-in-up">Tienda</span>
          <h2 className="text-4xl md:text-6xl font-black text-[#264653] mb-8 font-['Fredoka'] animate-fade-in-up">
            Creaciones Mágicas
          </h2>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
                  filter === cat.id
                    ? 'bg-[#264653] text-white shadow-lg scale-105'
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div 
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Navigation Arrows */}
            {filteredItems.length > 0 && (
                <>
                    <button 
                        onClick={() => scrollManual('left')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white flex items-center justify-center text-[#264653] hover:bg-[#264653] hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 group-hover/section:opacity-100 opacity-0 md:opacity-100"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={() => scrollManual('right')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white flex items-center justify-center text-[#264653] hover:bg-[#264653] hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 group-hover/section:opacity-100 opacity-0 md:opacity-100"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Fade Gradients for edges */}
            <div className="absolute top-0 left-0 h-full w-16 md:w-32 bg-gradient-to-r from-[#FDFBF7] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-16 md:w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent z-20 pointer-events-none"></div>

            <div 
                ref={scrollRef}
                className="overflow-x-hidden flex gap-8 py-10 pl-8 hide-scrollbar cursor-grab active:cursor-grabbing"
                style={{ scrollBehavior: 'auto' }} // We handle smooth scroll manually or per frame
            >
                {filteredItems.length === 0 ? (
                    <div className="w-full text-center py-20 text-slate-400 flex-shrink-0">
                        <p className="w-screen">No hay productos en esta categoría aún.</p>
                    </div>
                ) : (
                    displayItems.map((item, index) => (
                        <div key={`${item.id}-loop-${index}`} className="flex-shrink-0 w-[280px] md:w-[320px]">
                            <TiltCard item={item} />
                        </div>
                    ))
                )}
            </div>
            
            {/* User hint */}
            <div className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mt-4">
               {isPaused ? "¡Explora a tu ritmo!" : "Deslizando..."}
            </div>
        </div>
      </div>
    </section>
  );
};

// 3D Tilt Card Component
const TiltCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Sensitivity
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="perspective-1000 group/card relative w-full h-[450px] select-none"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Price Tag */}
      <div 
        className="absolute -top-4 -right-4 z-40 transition-all duration-300 transform"
        style={{
            transform: isHovering ? `translateZ(50px) scale(1.1)` : `translateZ(0) scale(0)`,
            opacity: isHovering ? 1 : 0
        }}
      >
        <div className="bg-[#264653] text-white px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
            <span>{item.price}</span>
        </div>
      </div>

      <div
        className="relative w-full h-full bg-white rounded-[2.5rem] transition-all duration-300 ease-out flex flex-col border border-white"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1}, 1)`,
          boxShadow: isHovering 
            ? '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3), inset 0 0 0 2px rgba(255,255,255,0.5)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
          transition: isHovering ? 'none' : 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        
        {/* Full Image Background */}
        <div className="relative h-[60%] w-full overflow-hidden rounded-t-[2.5rem]">
           <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover/card:scale-110"
            draggable={false} 
           />
        </div>

        {/* Content Area */}
        <div className="h-[40%] p-6 relative flex flex-col justify-between bg-white rounded-b-[2.5rem] z-20">
            {/* Floating Category Badge */}
            <div className="absolute -top-5 left-6 transform transition-transform duration-300 group-hover/card:-translate-y-1">
                <span 
                className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl shadow-lg border-2 border-white"
                style={{ backgroundColor: item.color, color: '#fff' }}
                >
                {item.categoryLabel}
                </span>
            </div>

          <div>
             <div className="flex justify-between items-start mt-2">
                <h3 className="text-xl font-bold text-[#264653] leading-tight font-['Fredoka']">
                    {item.title}
                </h3>
             </div>
             <p className={`text-[#2A9D8F] font-bold mt-1 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
                {item.price}
             </p>
          </div>
          
          <div className="mt-2">
            <button 
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group/btn ${
                added 
                    ? 'bg-green-500 text-white shadow-green-200 shadow-lg' 
                    : 'bg-[#FDFBF7] text-[#264653] hover:bg-[#264653] hover:text-white border-2 border-slate-100 hover:border-[#264653]'
                }`}
            >
                {added ? (
                <>
                    <Check className="w-5 h-5" /> ¡Listo!
                </>
                ) : (
                <>
                    <ShoppingCart className="w-5 h-5 group-hover/btn:animate-bounce" /> Lo quiero
                </>
                )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Real-time Reflection Effect below the card */}
      <div 
          className="absolute -bottom-6 left-8 right-8 h-4 rounded-[50%] bg-black/20 blur-xl transition-all duration-300 pointer-events-none"
          style={{ 
            opacity: isHovering ? 0.3 : 0.1,
            transform: `scale(${isHovering ? 1 : 0.8}) translateY(${rotation.x}px)`
          }}
      ></div>
    </div>
  );
};

export default Portfolio;