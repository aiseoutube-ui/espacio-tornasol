import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioCategory, PortfolioItem } from '../types';
import { ShoppingCart, Check, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<PortfolioCategory>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const filteredItems = filter === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  const categories: { id: PortfolioCategory; label: string }[] = [
    { id: 'all', label: 'Todo' },
    { id: 'manualidades', label: 'Manualidades' },
    { id: 'madera', label: 'Madera' },
    { id: '3d', label: 'Impresión 3D' },
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20); // Tolerance
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [filter, filteredItems]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative floating letters/shapes background - Subtle */}
      <div className="absolute top-20 left-10 opacity-5 font-black text-9xl text-[#2A9D8F] rotate-12 select-none pointer-events-none animate-pulse">A</div>
      <div className="absolute bottom-40 right-10 opacity-5 font-black text-9xl text-[#EE969A] -rotate-12 select-none pointer-events-none animate-pulse">B</div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] w-[150%] h-[150%] bg-[radial-gradient(circle,_#F4D35E_1px,_transparent_1px)] bg-[length:40px_40px] pointer-events-none"></div>

      <div className="w-full relative z-10 flex flex-col h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center mb-12">
          <span className="text-[#EE969A] font-bold tracking-widest uppercase text-sm mb-2 block animate-fade-in-up">Tienda</span>
          <h2 className="text-4xl md:text-6xl font-black text-[#264653] mb-8 font-['Fredoka'] animate-fade-in-up">
            Creaciones Mágicas
          </h2>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilter(cat.id);
                  if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
                }}
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

        {/* Horizontal Scroll Slider Container */}
        <div className="relative group/slider w-full">
          
          {/* Bubble Navigation - Left */}
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] flex items-center justify-center text-[#264653] hover:scale-110 hover:bg-[#F4D35E] hover:text-white transition-all border-4 border-white/50 group-hover/slider:opacity-100 opacity-0 duration-300"
            >
              <ChevronLeft className="w-8 h-8" strokeWidth={3} />
            </button>
          )}
          
          {/* Bubble Navigation - Right */}
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] flex items-center justify-center text-[#264653] hover:scale-110 hover:bg-[#EE969A] hover:text-white transition-all border-4 border-white/50 group-hover/slider:opacity-100 opacity-0 duration-300"
            >
              <ChevronRight className="w-8 h-8" strokeWidth={3} />
            </button>
          )}

          {/* Fade Gradients for "Infinity" look */}
          <div className="absolute top-0 left-0 w-8 md:w-32 h-full bg-gradient-to-r from-[#FDFBF7] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 md:w-32 h-full bg-gradient-to-l from-[#FDFBF7] to-transparent z-20 pointer-events-none"></div>

          {/* Scroll Track */}
          <div 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto gap-6 md:gap-10 px-8 md:px-[calc(50vw-200px)] py-12 hide-scrollbar snap-x snap-mandatory scroll-smooth items-center min-h-[600px]"
            style={{ perspective: '1000px' }}
          >
            {filteredItems.map((item, index) => (
              <div key={item.id} className="snap-center flex-shrink-0">
                 <TiltCard item={item} index={index} />
              </div>
            ))}
            
            {/* Empty state filler */}
            {filteredItems.length === 0 && (
               <div className="w-full text-center py-20 text-slate-400 mx-auto">
                  <p>No hay productos en esta categoría aún.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// 3D Tilt Card Component - Enhanced for "Wow" Factor
const TiltCard: React.FC<{ item: PortfolioItem, index: number }> = ({ item }) => {
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
    
    // Increased sensitivity for more 3D movement
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;

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
      className="perspective-1000 group relative w-[320px] md:w-[380px] h-[520px] cursor-pointer"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Price Tag - Appears on Hover outside card bounds for 3D feel */}
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
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovering ? 1.05 : 1}, ${isHovering ? 1.05 : 1}, 1)`,
          boxShadow: isHovering 
            ? '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3), inset 0 0 0 2px rgba(255,255,255,0.5)' 
            : '0 10px 20px -5px rgba(0, 0, 0, 0.05), 0 5px 10px -5px rgba(0, 0, 0, 0.01)',
          transition: isHovering ? 'none' : 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        
        {/* Full Image Background with Gradient - Removed overlay for full brightness */}
        <div className="relative h-[65%] w-full overflow-hidden rounded-t-[2.5rem]">
           <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
           />
        </div>

        {/* Content Area */}
        <div className="h-[35%] p-8 relative flex flex-col justify-between bg-white rounded-b-[2.5rem] z-20">
            {/* Floating Category Badge */}
            <div className="absolute -top-5 left-8 transform transition-transform duration-300 group-hover:-translate-y-1">
                <span 
                className="text-xs font-black tracking-widest uppercase px-4 py-2 rounded-xl shadow-lg border-2 border-white"
                style={{ backgroundColor: item.color, color: '#fff' }}
                >
                {item.categoryLabel}
                </span>
            </div>

          <div>
             <div className="flex justify-between items-start mt-2">
                <h3 className="text-2xl font-bold text-[#264653] leading-tight font-['Fredoka']">
                    {item.title}
                </h3>
             </div>
             {/* Show price here normally if not hovering */}
             <p className={`text-[#2A9D8F] font-bold mt-1 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
                {item.price}
             </p>
          </div>
          
          <div className="mt-2">
            <button 
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group/btn ${
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
          className="absolute -bottom-8 left-8 right-8 h-4 rounded-[50%] bg-black/20 blur-xl transition-all duration-300 pointer-events-none"
          style={{ 
            opacity: isHovering ? 0.3 : 0.1,
            transform: `scale(${isHovering ? 1 : 0.8}) translateY(${rotation.x}px)`
          }}
      ></div>
    </div>
  );
};

export default Portfolio;