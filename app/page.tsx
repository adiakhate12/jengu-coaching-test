'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookingForm } from '../components/booking/BookingForm';
import Coachs from '../components/Coachs';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';

// Définition de la structure d'une offre Jengu
interface JenguOffer {
  id: string;
  title: string;
  price: string;
  period: string;
  badge?: string;
  features: string[];
}

// Les 4 formules officielles Jengu Confidence Body
const JENGU_OFFERS: JenguOffer[] = [
  {
    id: 'personal-training',
    title: 'Personal Training',
    price: '100 000 FCFA',
    period: '/ 10 séances',
    badge: 'FORMULE FLEXIBLE',
    features: [
      'Lieu au choix : Domicile, Extérieur ou en Salle',
      'Idéal pour les emplois du temps chargés',
      'Routine hautement adaptable et changeante',
      'Accompagnement de qualité supérieure',
      "Réservation du coach 48h à l'avance"
    ]
  },
  {
    id: 'formule-impact',
    title: 'Formule Impact+',
    price: '200 000 FCFA',
    period: '/ mois',
    badge: 'LE PLUS INTENSE',
    features: [
      '3 séances de coaching personnalisé par semaine',
      'Jours et heures fixes dédiés pour une assiduité maximale',
      'Suivi régulier et progression accélérée',
      "Développement d'une routine sportive durable",
      'Priorité absolue sur le choix de vos créneaux'
    ]
  },
  {
    id: 'cardio-boxing',
    title: 'Cardio Boxing',
    price: '8 000 FCFA',
    period: '/ la séance',
    features: [
      'Séance collective dynamique',
      'Idéal pour se défouler et brûler des calories',
      'Matériel fourni (gants, protections)'
    ]
  },
  {
    id: 'programme-confidence-body',
    title: 'Programme Confidence Body',
    price: 'Sur devis',
    period: '/ Saison',
    badge: 'POPULAIRE',
    features: [
      'Accompagnement global (Sport & Mental)',
      'Suivi nutritionnel adapté',
      "Communauté privée d'entraide"
    ]
  }
];

export default function Home() {
  // L'offre sélectionnée par défaut est le "personal-training"
  const [selectedOfferId, setSelectedOfferId] = useState<string>('personal-training');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <main className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-amber-500/30 selection:text-amber-500">
      
      {/* 🧭 BARRE DE NAVIGATION SECRÈTE (POUR LE COACH) */}
      <nav className="max-w-7xl mx-auto px-4 pt-4 flex justify-end">
        <Link href="/coach">
          <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-amber-500 text-xs font-medium py-2 px-4 rounded-xl transition duration-200 flex items-center gap-2">
            Espace Coach 
          </button>
        </Link>
      </nav>

      {/* 🌟 SECTION HERO / EN-TÊTE */}
      <section className="pt-16 pb-12 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
          JENGU <span className="text-amber-500">CONFIDENCE BODY</span>
        </h1>
        <p className="text-zinc-400 mt-4 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Trouvez la formule qui vous correspond à Dakar. Bougez à votre rythme, atteignez vos objectifs.
        </p>
      </section>

      {/* 💳 SECTION GRILLE DES TARIFS */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {JENGU_OFFERS.map((offer) => {
            const isSelected = selectedOfferId === offer.id;
            return (
              <div
                key={offer.id}
                onClick={() => setSelectedOfferId(offer.id)}
                className={`cursor-pointer rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative bg-zinc-900/40 border ${
                  isSelected 
                    ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-xl shadow-amber-500/5 bg-zinc-900/80 scale-[1.02]' 
                    : 'border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div>
                  {/* Badge de la formule */}
                  <div className="h-6 mb-4">
                    {offer.badge && (
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-amber-500 text-black px-2.5 py-1 rounded-full">
                        {offer.badge}
                      </span>
                    )}
                  </div>

                  {/* Titre & Prix */}
                  <h3 className="text-xl font-bold tracking-tight text-white mb-2">{offer.title}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-2xl md:text-3xl font-black text-amber-500">{offer.price}</span>
                    <span className="text-xs text-zinc-500">{offer.period}</span>
                  </div>

                  {/* Liste des avantages */}
                  <ul className="space-y-3.5 mb-8">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal">
                        <span className="text-amber-500 font-bold shrink-0">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bouton de sélection */}
                <button
                  className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10 hover:bg-amber-400'
                      : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {isSelected ? 'Sélectionné' : 'Choisir cette formule'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🏋️‍♂️ SECTION : LES COACHS */}
      <Coachs />

      {/* 💬 SECTION : TÉMOIGNAGES */}
      <Testimonials />

      {/* ❓ SECTION : FAQ INTERACTIVE */}
      <Faq />

      {/* 📅 SECTION FORMULAIRE DE RÉSERVATION */}
      <section className="py-20 bg-zinc-950 px-4 border-t border-zinc-900">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
              Finalisez votre demande
            </h2>
            <p className="text-zinc-400 text-xs mt-1.5">
              Formule actuellement sélectionnée : <span className="text-amber-500 font-bold uppercase">{selectedOfferId.replace('-', ' ')}</span>
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-8 text-center max-w-md mx-auto animate-fade-in">
              <span className="text-4xl inline-block mb-3">✓</span>
              <h3 className="text-lg font-bold text-emerald-400 uppercase tracking-wide">Demande enregistrée !</h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Votre demande de réservation a bien été reçue par l'équipe Jengu. Un coach va examiner vos disponibilités et vous recontactera rapidement.
              </p>
            </div>
          ) : (
            <BookingForm 
              selectedOfferId={selectedOfferId} 
              onSuccess={() => setIsSubmitted(true)} 
            />
          )}
        </div>
      </section>

    </main>
  );
}