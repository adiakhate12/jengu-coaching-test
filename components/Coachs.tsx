import React from 'react';

const COACHeS = [
  {
    name: "Amadou Diop",
    role: "Head Coach & Fondateur",
    specialty: "Prise de masse & Force",
    bio: "Plus de 8 ans d'expérience dans la transformation physique à Dakar. Passionné et exigeant.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Astou Diallo",
    role: "Coach Certifiée",
    specialty: "Fitness Féminin & Cardio Boxing",
    bio: "Spécialiste du dépassement de soi et de la recomposition corporelle. Ambiance intense garantie !",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=400&q=80"
  }
];

export default function Coachs() {
  return (
    <section className="py-20 bg-zinc-950 text-white border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
            Vos <span className="text-amber-500">Coachs</span> Jengu
          </h2>
          <p className="text-zinc-400 mt-2">Des professionnels certifiés pour vous accompagner vers vos objectifs.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {COACHeS.map((coach, index) => (
            <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-colors flex flex-col sm:flex-row">
              <div className="sm:w-2/5 h-64 sm:h-auto relative bg-zinc-800">
                <img 
                  src={coach.image} 
                  alt={coach.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">{coach.role}</span>
                <h3 className="text-xl font-bold mt-1 text-white">{coach.name}</h3>
                <div className="inline-block bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-full mt-2 font-medium self-start border border-zinc-700">
                  {coach.specialty}
                </div>
                <p className="text-zinc-400 text-sm mt-4 italic leading-relaxed">
                  "{coach.bio}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}