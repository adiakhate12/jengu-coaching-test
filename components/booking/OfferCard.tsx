'use client';

import React from 'react';

export interface JenguOffer {
  id: string;
  name: string;
  price: string;
  frequency: string;
  tagline?: string;
  features: string[];
}

interface OfferCardProps {
  offer: JenguOffer;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(offer.id)}
      className={`relative rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[420px] ${
        isSelected
          ? 'bg-amber-950/20 border-amber-500 shadow-lg shadow-amber-500/10'
          : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
      }`}
    >
      {/* Tagline / Badge */}
      {offer.tagline && (
        <span className="absolute -top-3 left-6 bg-amber-500 text-zinc-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {offer.tagline}
        </span>
      )}

      {/* Contenu supérieur (Nom, Prix, Features) */}
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-zinc-100">{offer.name}</h3>
          <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
            <span className="text-2xl font-extrabold text-amber-500 whitespace-nowrap">{offer.price}</span>
            <span className="text-xs text-zinc-400">/ {offer.frequency}</span>
          </div>
        </div>

        {/* Liste des caractéristiques bien espacées */}
        <ul className="space-y-3 pt-4 border-t border-zinc-800/60 flex-1">
          {offer.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
              <span className="text-amber-500 font-bold select-none shrink-0">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bouton du bas toujours parfaitement aligné */}
      <div className="mt-6 shrink-0">
        <button
          type="button"
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm transition-colors uppercase tracking-wider ${
            isSelected
              ? 'bg-amber-500 text-zinc-950'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          {isSelected ? 'Sélectionné' : 'Choisir cette formule'}
        </button>
      </div>
    </div>
  );
};