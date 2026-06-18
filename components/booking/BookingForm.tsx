'use client';

import React, { useState, useEffect } from 'react';

interface BookingFormProps {
  selectedOfferId: string;
  onSuccess: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedOfferId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '+221 ', 
    locationPreference: 'salle', 
    chosenSlot: '', 
    additionalNotes: ''
  });

  // Réinitialiser ou adapter certains champs quand l'offre change
  useEffect(() => {
    setFormData(prev => ({ ...prev, chosenSlot: '', locationPreference: 'salle' }));
  }, [selectedOfferId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // On envoie les vraies données du formulaire à notre API Next.js
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          locationPreference: formData.locationPreference,
          additionalNotes: formData.additionalNotes,
          selectedOfferId: selectedOfferId
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        alert("Une erreur est survenue côté serveur. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-zinc-900/40 border border-zinc-800/80 p-6 md:p-8 rounded-2xl space-y-6 backdrop-blur-sm">
      <div className="space-y-1 text-center">
        <h3 className="text-xl font-bold text-zinc-100 tracking-tight">Finalisez votre demande</h3>
        <p className="text-xs text-zinc-400">
          Formule actuellement sélectionnée : <span className="text-amber-500 font-bold uppercase">{selectedOfferId.replace('-', ' ')}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Nom Complet *</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ex: Amadou Diop"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-zinc-100 outline-none transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Adresse Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="diop@email.com"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-zinc-100 outline-none transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Numéro de Téléphone *</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-zinc-100 outline-none transition-colors"
          />
        </div>

        {/* Options dynamiques selon l'offre choisie */}
        {selectedOfferId === 'personal-training' && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Préférence de lieu</label>
            <select
              name="locationPreference"
              value={formData.locationPreference}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-zinc-100 outline-none transition-colors"
            >
              <option value="salle">En Salle de sport</option>
              <option value="domicile">À Domicile</option>
              <option value="exterieur">En Extérieur</option>
            </select>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Créneau souhaité / Notes additionnelles</label>
          <textarea
            name="additionalNotes"
            rows={3}
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Vos objectifs, vos disponibilités horaires..."
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-zinc-100 outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-sm transition-colors uppercase tracking-wider shadow-lg shadow-amber-500/5"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
        </button>
      </form>
    </div>
  );
};