import { useState } from 'react';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';

interface ProductRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductRequestForm({ isOpen, onClose }: ProductRequestFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    produit: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        type: 'request',
        nom: formData.nom,
        telephone: formData.telephone,
        produit: formData.produit,
        description: formData.description,
      };

      await fetch(import.meta.env.VITE_SHEET_WEBHOOK_URL || '', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
    } catch (error) {
      // Error handled silently
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-[#1A1208] border border-[#E8732F]/20 rounded-2xl w-full max-w-md p-8 text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-[#E8732F] mx-auto" />
          <h3 className="text-2xl font-bold text-[#F5ECD7]">Demande Envoyee !</h3>
          <p className="text-[#F5ECD7]/70">Nous vous contacterons des que le produit sera disponible.</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#E8732F] text-white rounded-xl font-semibold hover:bg-[#E8732F]/90 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1A1208] border border-[#E8732F]/20 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#F5ECD7]">Demander un Produit</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#E8732F]/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-[#F5ECD7]/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Votre nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
            required
          />
          <input
            type="tel"
            placeholder="Telephone"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
            required
          />
          <input
            type="text"
            placeholder="Nom du produit souhaite"
            value={formData.produit}
            onChange={(e) => setFormData({ ...formData, produit: e.target.value })}
            className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50"
            required
          />
          <textarea
            placeholder="Description (optionnel)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-[#1A1208]/50 border border-[#E8732F]/20 rounded-xl text-[#F5ECD7] placeholder-[#F5ECD7]/40 focus:outline-none focus:border-[#E8732F]/50 h-24 resize-none"
          />
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
                <Send className="w-5 h-5" />
                Envoyer la Demande
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
