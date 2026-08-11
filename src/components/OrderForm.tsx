import { useState } from 'react';
import { z } from 'zod';
import { Loader2, CheckCircle, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';

const orderSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  telephone: z.string().regex(/^0[5-7]\d{8}$/, 'Numero invalide (ex: 0612345678)'),
  adresse: z.string().min(5, 'Adresse requise'),
  ville: z.string().min(2, 'Ville requise'),
});

interface OrderFormProps {
  productName: string;
  price: number;
  whatsappNumber: string;
}

export function OrderForm({ productName, price, whatsappNumber }: OrderFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    adresse: '',
    ville: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const totalPrice = price * quantity;

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
      const payload = {
        type: 'single',
        nom: formData.nom,
        telephone: formData.telephone,
        adresse: formData.adresse,
        ville: formData.ville,
        produit: productName,
        quantite: quantity,
        prix: totalPrice,
      };

      const response = await fetch(import.meta.env.VITE_SHEET_WEBHOOK_URL || '', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#1A1208] border border-[#E8732F]/30 rounded-2xl p-8 text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-[#E8732F] mx-auto" />
        <h3 className="text-2xl font-bold text-[#F5ECD7]">Commande Envoyee !</h3>
        <p className="text-[#F5ECD7]/70">
          Merci {formData.nom} ! Nous vous contacterons au {formData.telephone} pour confirmer votre commande.
        </p>
        <WhatsAppButton
          productName={productName}
          price={totalPrice}
          whatsappNumber={whatsappNumber}
          variant="outline"
          className="w-full"
        />
      </div>
    );
  }

  if (submitError) {
    return (
      <div className="bg-[#1A1208] border border-red-500/30 rounded-2xl p-8 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h3 className="text-2xl font-bold text-[#F5ECD7]">Erreur d'Envoi</h3>
        <p className="text-[#F5ECD7]/70">
          Une erreur s'est produite. Veuillez reessayer ou nous contacter directement sur WhatsApp.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setSubmitError(false)}
            className="px-6 py-3 bg-[#E8732F] text-white rounded-xl font-semibold hover:bg-[#E8732F]/90 transition-colors"
          >
            Reessayer
          </button>
          <WhatsAppButton
            productName={productName}
            price={totalPrice}
            whatsappNumber={whatsappNumber}
            variant="outline"
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1A1208] border border-[#E8732F]/20 rounded-2xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-[#F5ECD7] mb-4">Commander Maintenant</h3>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between bg-[#1A1208]/50 rounded-xl p-3 border border-[#E8732F]/10">
        <span className="text-[#F5ECD7]/80">Quantite</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-lg bg-[#E8732F]/20 text-[#E8732F] hover:bg-[#E8732F]/30 transition-colors"
          >
            -
          </button>
          <span className="text-[#F5ECD7] font-semibold w-8 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-lg bg-[#E8732F]/20 text-[#E8732F] hover:bg-[#E8732F]/30 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-2 border-b border-[#E8732F]/10">
        <span className="text-[#F5ECD7]/80">Total</span>
        <span className="text-2xl font-bold text-[#E8732F]">{totalPrice} DH</span>
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Nom complet"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
          />
          {errors.nom && <p className="text-red-400 text-sm mt-1">{errors.nom}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Telephone (ex: 0612345678)"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
          />
          {errors.telephone && <p className="text-red-400 text-sm mt-1">{errors.telephone}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Adresse de livraison"
            value={formData.adresse}
            onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
            className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
          />
          {errors.adresse && <p className="text-red-400 text-sm mt-1">{errors.adresse}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Ville"
            value={formData.ville}
            onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
            className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
          />
          {errors.ville && <p className="text-red-400 text-sm mt-1">{errors.ville}</p>}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#E8732F] text-white rounded-xl font-bold text-lg hover:bg-[#E8732F]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Phone className="w-5 h-5" />
            Commander — {totalPrice} DH
          </>
        )}
      </button>

      <WhatsAppButton
        productName={productName}
        price={totalPrice}
        whatsappNumber={whatsappNumber}
        variant="outline"
        className="w-full"
      />
    </form>
  );
}
