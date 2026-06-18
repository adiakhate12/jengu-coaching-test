'use client';
import React, { useState } from 'react';

const FAQS = [
  {
    q: "Où se déroulent les séances de coaching à Dakar ?",
    a: "Selon la formule choisie, les séances peuvent se dérouler entièrement à votre domicile (partout à Dakar et Almadies), en salle de sport partenaire équipée, ou en extérieur selon vos préférences."
  },
  {
    q: "Le matériel de sport est-il fourni ?",
    a: "Oui ! Pour les séances de Personal Training et de Cardio Boxing, le coach apporte tout le matériel nécessaire (gants, protections, élastiques, petits poids). Vous n'avez besoin que d'une tenue de sport et d'une bouteille d'eau."
  },
  {
    q: "Puis-je modifier mes créneaux horaires en cours de route ?",
    a: "Absolument. Avec la formule flexible ou Impact+, vous disposez d'une priorité de réservation. Il vous suffit de prévenir votre coach au moins 24 heures à l'avance pour replanifier votre session."
  },
  {
    q: "Comment fonctionne le paiement ?",
    a: "Pour garantir votre engagement et bloquer les créneaux dans l'agenda du coach, les forfaits sont réglables à l'avance en début de cycle (par Wave, virement ou espèces)."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-zinc-950 text-white border-t border-zinc-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
            Questions <span className="text-amber-500">Fréquentes</span>
          </h2>
          <p className="text-zinc-400 mt-2">Tout ce que vous devez savoir avant de commencer votre transformation.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center font-bold text-lg hover:text-amber-500 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className={`text-xl text-amber-500 transform transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                    ＋
                  </span>
                </button>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 border-t border-zinc-800/50' : 'max-h-0'}`}>
                  <p className="p-6 text-zinc-400 text-sm leading-relaxed bg-zinc-900/50">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}