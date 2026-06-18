'use client';

import { useState } from 'react';

// Données fictives réalistes pour le test de Jengu à Dakar
const initialReservations = [
  {
    id: '1',
    clientName: 'Moussa Diop',
    email: 'moussa.diop@gmail.com',
    phone: '+221 77 123 45 67',
    offer: 'Forme & Tonus (Premium)',
    date: '2026-06-20',
    time: '08:30',
    status: 'En attente',
    goal: 'Perte de poids et renforcement musculaire.',
  },
  {
    id: '2',
    clientName: 'Awa Ndiaye',
    email: 'awa.nd@outlook.com',
    phone: '+221 76 987 65 43',
    offer: 'Performance Plus (Elite)',
    date: '2026-06-19',
    time: '18:00',
    status: 'Confirmé',
    goal: 'Préparation pour un marathon et suivi nutritionnel.',
  },
  {
    id: '3',
    clientName: 'Amadou Sow',
    email: 'amadou.sow@innov.sn',
    phone: '+221 70 555 44 33',
    offer: 'Jengu Start',
    date: '2026-06-22',
    time: '12:00',
    status: 'Confirmé',
    goal: 'Reprise du sport en douceur après blessure.',
  },
];

export default function CoachDashboard() {
  const [reservations, setReservations] = useState(initialReservations);
  const [filter, setFilter] = useState('Tous');

  // Changer le statut d'une réservation (Simulé)
  const handleStatusChange = (id: string, newStatus: string) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
  };

  const filteredReservations = reservations.filter((res) => {
    if (filter === 'Tous') return true;
    return res.status === filter;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 sm:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Espace Coach — Jengu
          </h1>
          <p className="text-neutral-400 mt-1">Gestion et planification de vos séances de coaching à Dakar.</p>
        </div>
        <div className="flex items-center gap-3 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-neutral-300">Coach connecté : Jengu Staff</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Cartes de Statistiques Rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
            <p className="text-sm font-medium text-neutral-400">Total Réservations</p>
            <p className="text-3xl font-bold mt-2 text-amber-500">{reservations.length}</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
            <p className="text-sm font-medium text-neutral-400">Séances Confirmées</p>
            <p className="text-3xl font-bold mt-2 text-emerald-500">
              {reservations.filter((r) => r.status === 'Confirmé').length}
            </p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
            <p className="text-sm font-medium text-neutral-400">En Attente de Validation</p>
            <p className="text-3xl font-bold mt-2 text-amber-500 animate-pulse">
              {reservations.filter((r) => r.status === 'En attente').length}
            </p>
          </div>
        </div>

        {/* Filtres de Statut */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['Tous', 'Confirmé', 'En attente', 'Annulé'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                filter === status
                  ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:bg-neutral-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Liste / Grille des réservations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReservations.length === 0 ? (
            <div className="col-span-full bg-neutral-900 border border-dashed border-neutral-800 rounded-2xl p-12 text-center text-neutral-500">
              Aucune demande de réservation trouvée pour le filtre "{filter}".
            </div>
          ) : (
            filteredReservations.map((res) => (
              <div
                key={res.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Badge de Statut & Offre */}
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className="text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {res.offer}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                        res.status === 'Confirmé'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : res.status === 'En attente'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>

                  {/* Infos Client */}
                  <h3 className="text-xl font-bold text-white mb-1">{res.clientName}</h3>
                  <p className="text-sm text-neutral-400 mb-4">
                    {res.phone} • {res.email}
                  </p>

                  {/* Date & Heure du RDV */}
                  <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/60 flex gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-neutral-500 block text-xs uppercase font-semibold">Date</span>
                      <span className="text-neutral-200 font-medium">{res.date}</span>
                    </div>
                    <div className="border-l border-neutral-800 pl-4">
                      <span className="text-neutral-500 block text-xs uppercase font-semibold">Heure</span>
                      <span className="text-neutral-200 font-medium">{res.time}</span>
                    </div>
                  </div>

                  {/* Objectif du Client */}
                  {res.goal && (
                    <div className="mb-6">
                      <span className="text-neutral-500 block text-xs uppercase font-semibold mb-1">Objectif</span>
                      <p className="text-sm text-neutral-300 italic">"{res.goal}"</p>
                    </div>
                  )}
                </div>

                {/* Actions du Coach */}
                <div className="flex gap-2 pt-4 border-t border-neutral-800/60">
                  {res.status !== 'Confirmé' && (
                    <button
                      onClick={() => handleStatusChange(res.id, 'Confirmé')}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-xl text-sm transition-all"
                    >
                      Accepter
                    </button>
                  )}
                  {res.status !== 'Annulé' && (
                    <button
                      onClick={() => handleStatusChange(res.id, 'Annulé')}
                      className="flex-1 bg-neutral-800 hover:bg-rose-950 hover:text-rose-400 text-neutral-400 font-medium py-2 rounded-xl text-sm transition-all"
                    >
                      Refuser
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}