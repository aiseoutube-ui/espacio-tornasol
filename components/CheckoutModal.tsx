import React, { useState, useMemo } from 'react';
import { X, Smartphone, MessageCircle, Send, Hash, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_COLORS, PAYMENT_METHODS, CONTACT_INFO } from '../constants';
import { PaymentMethod } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [localStep, setLocalStep] = useState<'method' | 'pay'>('method');
  const [operationCode, setOperationCode] = useState('');
  
  // Create a detailed Order Summary string for WhatsApp
  const whatsappUrl = useMemo(() => {
    if (!selectedMethod) return '#';

    const methodName = selectedMethod === 'yape' ? 'Yape' : 'Plin';
    const nl = '%0A'; // URL encoded newline

    // Header
    let message = `Hola *Tornasol*! 🌞${nl}`;
    message += `Quiero confirmar el siguiente pedido:${nl}${nl}`;

    // Items
    cart.forEach(item => {
      message += `▪️ ${item.quantity}x ${item.title} (S/ ${item.priceValue.toFixed(2)})${nl}`;
    });

    // Footer
    message += `${nl}*Total Pagado: S/ ${cartTotal.toFixed(2)}*${nl}`;
    message += `Método: ${methodName}${nl}`;
    message += `🧾 *Nro. Operación: ${operationCode}*${nl}${nl}`;
    message += `📍 *Adjunto la captura de pantalla para validación.* ✨`;
    
    const cleanPhone = CONTACT_INFO.whatsapp.replace(/\D/g, '');
    
    return `https://wa.me/${cleanPhone}?text=${message}`;
  }, [cart, cartTotal, selectedMethod, operationCode]);

  if (!isOpen) return null;

  const handleFinish = () => {
    if (!operationCode || operationCode.length < 4) return;

    // 1. Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // 2. Cleanup
    clearCart();
    onClose();
    setLocalStep('method'); // Reset for next time
    setSelectedMethod(null);
    setOperationCode('');
  };

  const isFormValid = operationCode.length >= 4;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#FDFBF7] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#264653] p-6 text-white flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold font-['Fredoka']">Checkout</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto">
          
          {localStep === 'method' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Paso 1 de 2</span>
                <h3 className="text-2xl font-bold text-slate-800 mt-2">Elige tu método de pago</h3>
                <p className="text-slate-500 mt-2">Trabajamos con las principales billeteras digitales.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => { setSelectedMethod('yape'); setLocalStep('pay'); }}
                  className="group relative h-32 rounded-2xl border-2 border-slate-100 hover:border-[#742274] bg-white transition-all flex flex-col items-center justify-center gap-3 overflow-hidden hover:shadow-lg hover:shadow-[#742274]/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#742274]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-xl bg-[#742274] flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                    Yape
                  </div>
                  <span className="font-bold text-[#742274]">Yapear</span>
                </button>

                <button
                  onClick={() => { setSelectedMethod('plin'); setLocalStep('pay'); }}
                  className="group relative h-32 rounded-2xl border-2 border-slate-100 hover:border-[#00C7B1] bg-white transition-all flex flex-col items-center justify-center gap-3 overflow-hidden hover:shadow-lg hover:shadow-[#00C7B1]/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00C7B1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00C7B1] to-[#F83A7E] flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                    Plin
                  </div>
                  <span className="font-bold text-[#00C7B1]">Plinear</span>
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center border border-slate-100">
                <span className="font-medium text-slate-600">Total a pagar:</span>
                <span className="text-2xl font-black text-[#264653]">S/ {cartTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {localStep === 'pay' && selectedMethod && (
            <div className="space-y-6 text-center animate-fade-in-up">
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Paso 2 de 2</span>
                <h3 className="text-xl font-bold text-slate-800 mt-1">
                  Paga y Valida
                </h3>
              </div>

              {/* QR and Amount Section */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="relative w-40 h-40 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex-shrink-0">
                  <div className="w-full h-full bg-slate-800 rounded-xl overflow-hidden relative group">
                    <img 
                      src={PAYMENT_METHODS[selectedMethod].qrImage} 
                      alt="QR Code" 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold shadow-sm border border-slate-200 uppercase tracking-wider">
                          {selectedMethod}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-left space-y-3 max-w-xs">
                   <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Total a transferir</p>
                      <p className="text-2xl font-black text-[#264653]">S/ {cartTotal.toFixed(2)}</p>
                      <p className="text-xs text-slate-400 leading-tight mt-1">
                        Ingresa este monto exacto en tu app.
                      </p>
                   </div>
                </div>
              </div>

              {/* Verification Input Section */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-left">
                <label className="block text-sm font-bold text-[#264653] mb-2 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-teal-600" />
                  Número de Operación
                  <span className="text-rose-500">*</span>
                </label>
                
                <input 
                  type="number"
                  value={operationCode}
                  onChange={(e) => setOperationCode(e.target.value)}
                  placeholder="Ej: 1234567"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all font-mono text-lg bg-white"
                />
                
                <p className="text-xs text-slate-500 mt-2 flex items-start gap-1.5">
                  <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  Encuentra este código en la constancia de pago de tu app (Yape/Plin). Es necesario para validar tu compra.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                 <button 
                  onClick={() => setLocalStep('method')}
                  className="flex-none px-5 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Atrás
                </button>
                
                <button
                  onClick={handleFinish}
                  disabled={!isFormValid}
                  className={`flex-1 px-4 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform ${
                    isFormValid 
                      ? 'bg-[#25D366] text-white hover:bg-[#20bd5a] hover:-translate-y-1 cursor-pointer shadow-green-200' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <MessageCircle className={`w-5 h-5 ${isFormValid ? 'animate-pulse' : ''}`} />
                  <span>Enviar a WhatsApp</span>
                  {isFormValid && <Send className="w-4 h-4 opacity-70" />}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;