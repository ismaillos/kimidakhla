import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { z } from 'zod';
import { Loader2, CheckCircle, AlertCircle, ShoppingCart, X, Plus, Minus, Phone, ArrowRight, Package, Clock, MapPin } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';

const orderSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  telephone: z.string().regex(/^0[5-7]\d{8}$/, 'Numero invalide'),
  adresse: z.string().min(5, 'Adresse requise'),
  ville: z.string().min(2, 'Ville requise'),
});

export function OrderModal() {
  const { items, total, itemCount, isOpen, closeModal, updateQuantity, removeItem } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({ nom: '', telephone: '', adresse: '', ville: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setStep('checkout');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(false);

    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const itemsFormatted = items.map(item => `${item.product.name} x${item.quantity}`).join(', ');
      const payload = {
        type: 'cart',
        nom: formData.nom,
        telephone: formData.telephone,
        adresse: formData.adresse,
        ville: formData.ville,
        items: itemsFormatted,
        total: total,
      };

      await fetch(import.meta.env.VITE_SHEET_WEBHOOK_URL || '', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setStep('success');
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1A1208] border border-[#E8732F]/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E8732F]/10">
          <h2 className="text-xl font-bold text-[#F5ECD7]">
            {step === 'cart' && `Panier (${itemCount})`}
            {step === 'checkout' && 'Livraison'}
            {step === 'success' && 'Commande Confirmee'}
          </h2>
          <button onClick={closeModal} className="p-2 hover:bg-[#E8732F]/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-[#F5ECD7]/60" />
          </button>
        </div>

        {/* Cart Step */}
        {step === 'cart' && (
          <div className="p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-[#F5ECD7]/30 mx-auto mb-3" />
                <p className="text-[#F5ECD7]/60">Votre panier est vide</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 bg-[#1A1208]/50 rounded-xl p-3 border border-[#E8732F]/10">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#F5ECD7] font-medium truncate">{item.product.name}</h4>
                        <p className="text-[#E8732F] font-semibold">{item.product.price} DH</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-[#E8732F]/20 text-[#E8732F] hover:bg-[#E8732F]/30 transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[#F5ECD7] w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-[#E8732F]/20 text-[#E8732F] hover:bg-[#E8732F]/30 transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-2 p-1 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center py-3 border-t border-[#E8732F]/10">
                  <span className="text-[#F5ECD7]/80">Total</span>
                  <span className="text-2xl font-bold text-[#E8732F]">{total} DH</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#E8732F] text-white rounded-xl font-bold hover:bg-[#E8732F]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  Continuer — {total} DH
                </button>
              </>
            )}
          </div>
        )}

        {/* Checkout Step */}
        {step === 'checkout' && (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nom complet"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
              />
              {errors.nom && <p className="text-red-400 text-sm">{errors.nom}</p>}

              <input
                type="tel"
                placeholder="Telephone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
              />
              {errors.telephone && <p className="text-red-400 text-sm">{errors.telephone}</p>}

              <input
                type="text"
                placeholder="Adresse"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
              />
              {errors.adresse && <p className="text-red-400 text-sm">{errors.adresse}</p>}

              <input
                type="text"
                placeholder="Ville"
                value={formData.ville}
                onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
              />
              {errors.ville && <p className="text-red-400 text-sm">{errors.ville}</p>}
            </div>

            {submitError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400 text-sm">Erreur d'envoi. Reessayez.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#E8732F] text-white rounded-xl font-bold hover:bg-[#E8732F]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Envoi...
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  Confirmer — {total} DH
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('cart')}
              className="w-full py-2 text-[#F5ECD7]/60 hover:text-[#F5ECD7] transition-colors text-sm"
            >
              Retour au panier
            </button>
          </form>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="p-4 space-y-4 text-center">
            <CheckCircle className="w-16 h-16 text-[#E8732F] mx-auto" />
            <h3 className="text-2xl font-bold text-[#F5ECD7]">Commande Envoyee !</h3>
            <p className="text-[#F5ECD7]/70">
              Merci {formData.nom} ! Nous vous contacterons au {formData.telephone}.
            </p>

            <div className="bg-[#1A1208]/50 rounded-xl p-4 border border-[#E8732F]/10 text-left space-y-2">
              <div className="flex items-center gap-2 text-[#F5ECD7]/80">
                <Package className="w-4 h-4 text-[#E8732F]" />
                <span>Preparation sous 24h</span>
              </div>
              <div className="flex items-center gap-2 text-[#F5ECD7]/80">
                <Clock className="w-4 h-4 text-[#E8732F]" />
                <span>Livraison 2-5 jours</span>
              </div>
              <div className="flex items-center gap-2 text-[#F5ECD7]/80">
                <MapPin className="w-4 h-4 text-[#E8732F]" />
                <span>{formData.ville}</span>
              </div>
            </div>

            <WhatsAppButton
              productName={items.map(i => i.product.name).join(', ')}
              price={total}
              whatsappNumber={import.meta.env.VITE_WHATSAPP_NUMBER || '212677031561'}
              variant="outline"
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
