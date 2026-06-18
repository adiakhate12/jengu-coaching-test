import React from 'react';

const REVIEWS = [
  {
    name: "Moustapha",
    program: "Formule Impact+",
    text: "Une transformation incroyable en seulement 3 mois. Le suivi personnalisé d'Amadou change absolument tout par rapport aux salles classiques à Dakar.",
    stars: 5
  },
  {
    name: "Khady",
    program: "Personal Training",
    text: "Le concept à domicile est parfait pour mon emploi du temps chargé. Les séances de Cardio Boxing me permettent de me défouler à fond !",
    stars: 5
  },
  {
    name: "Ibrahima",
    program: "Cardio Boxing",
    text: "Équipe super professionnelle, rigoureuse et à l'écoute. On souffre pendant la séance, mais les résultats sont là très rapidement.",
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-zinc-900/30 text-white border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
            Ils ont choisi <span className="text-amber-500">Confidence</span>
          </h2>
          <p className="text-zinc-400 mt-2">Découvrez les retours de notre communauté Jengu.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform">
              <div>
                <div className="flex text-amber-500 mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/60">
                <h4 className="font-bold text-white text-base">{review.name}</h4>
                <p className="text-xs text-amber-500/80 font-medium mt-0.5">{review.program}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}