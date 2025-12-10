import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_COLORS } from '../constants';

interface CartSidebarProps {
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ onCheckout }) => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#FDFBF7] shadow-2xl z-[70] transform transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-teal-600" />
            <h2 className="text-2xl font-bold text-[#264653] font-['Fredoka']">Tu Carrito</h2>
          </div>
          <button onClick={toggleCart} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="font-medium">Tu carrito está vacío</p>
              <button onClick={toggleCart} className="text-teal-600 font-bold hover:underline">
                Volver a la tienda
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-[#264653] leading-tight">{item.title}</h3>
                  <p className="text-sm text-teal-600 font-bold">S/ {item.priceValue.toFixed(2)}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-slate-50 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-slate-200 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-4 h-4 text-slate-600" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-slate-700">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-slate-200 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-slate-100 safe-area-bottom">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 font-medium">Total Estimado</span>
              <span className="text-3xl font-black text-[#264653]">S/ {cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                toggleCart();
                onCheckout();
              }}
              className="w-full py-4 bg-[#264653] text-white rounded-xl font-bold text-lg hover:bg-[#1a313a] transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>Proceder al Pago</span>
              <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;