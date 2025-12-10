import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <CartProvider>
      <div className="antialiased text-slate-900 bg-[#FDFBF7]">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <About />
          <Contact />
        </main>
        
        {/* Cart Drawer */}
        <CartSidebar onCheckout={() => setIsCheckoutOpen(true)} />
        
        {/* Payment Modal */}
        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      </div>
    </CartProvider>
  );
};

export default App;