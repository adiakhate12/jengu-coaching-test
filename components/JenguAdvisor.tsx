'use client';

import React, { useState } from 'react';

interface QuizAnswers {
  goal: string;
  level: string;
  availability: string;
  preference: string;
}

export default function JenguAdvisor() {
  const [step, setStep] = useState<number>(0); // 0: Intro, 1-4: Questions, 5: Résultat
  const [answers, setAnswers] = useState<QuizAnswers>({
    goal: '',
    level: '',
    availability: '',
    preference: '',
  });

  const handleAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setAnswers({ goal: '', level: '', availability: '', preference: '' });
    setStep(0);
  };

  // Logique de recommandation Jengu
  const getRecommendation = () => {
    if (answers.preference === 'collective') {
      return {
        id: 'cardio-boxing',
        title: 'Cardio Boxing (8 000 FCFA / séance)',
        reason: "Vous cherchez l'énergie d'un groupe pour vous défouler, brûler des calories et évacuer le stress. C'est la formule collective idéale à Dakar !",
      };
    }
    if (answers.goal === 'global' || answers.level === 'debutant') {
      return {
        id: 'programme-confidence-body',
        title: 'Programme Confidence Body (Sur devis)',
        reason: "Votre profil demande un accompagnement holistique (sport, mental, nutrition). Pour une reprise en douceur ou une transformation profonde à long terme, cette formule sur-mesure est parfaite.",
      };
    }
    if (answers.availability === 'fixes') {
      return {
        id: 'formule-impact',
        title: 'Formule Impact+ (200 000 FCFA / mois)',
        reason: "Vous avez besoin d'une structure rigide avec 3 séances par semaine à jours fixes pour ancrer votre routine sportive et maximiser vos résultats rapidement.",
      };
    }
    return {
      id: 'personal-training',
      title: 'Personal Training (100 000 FCFA / 10 séances)',
      reason: "Vous recherchez un maximum de flexibilité pour planifier vos séances (domicile ou extérieur) selon votre emploi du temps changeant.",
    };
  };

  const recommendation = step === 5 ? getRecommendation() : null;

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🤖</span>
        <h3 className="text-lg font-black tracking-wider text-amber-500 uppercase">
          Conseiller Virtuel Jengu
        </h3>
      </div>

      {/* STEP 0 : INTRO */}
      {step === 0 && (
        <div className="text-center py-4">
          <p className="text-zinc-300 text-sm md:text-base mb-6">
            Vous hésitez sur la formule à choisir ? Répondez à 4 questions rapides pour trouver le programme Jengu idéal pour votre profil.
          </p>
          <button
            onClick={() => setStep(1)}
            className="bg-amber-500 text-black font-black text-xs uppercase tracking-widest py-3 px-6 rounded-xl hover:bg-amber-400 transition"
          >
            Démarrer le questionnaire
          </button>
        </div>
      )}

      {/* STEP 1 : OBJECTIF */}
      {step === 1 && (
        <div>
          <h4 className="text-base font-bold text-white mb-4">1. Quel est votre objectif principal ?</h4>
          <div className="grid grid-cols-1 gap-3">
            <button onClick={() => handleAnswer('goal', 'forme')} className="quiz-btn">Remise en forme / Tonification</button>
            <button onClick={() => handleAnswer('goal', 'poids')} className="quiz-btn">Perte de poids / Cardio</button>
            <button onClick={() => handleAnswer('goal', 'global')} className="quiz-btn">Transformation globale (Physique & Mental)</button>
          </div>
        </div>
      )}

      {/* STEP 2 : NIVEAU */}
      {step === 2 && (
        <div>
          <h4 className="text-base font-bold text-white mb-4">2. Quel est votre niveau sportif actuel ?</h4>
          <div className="grid grid-cols-1 gap-3">
            <button onClick={() => handleAnswer('level', 'debutant')} className="quiz-btn">Débutant (Reprise en douceur / Après blessure)</button>
            <button onClick={() => handleAnswer('level', 'intermediaire')} className="quiz-btn">Intermédiaire (Pratique occasionnelle)</button>
            <button onClick={() => handleAnswer('level', 'avance')} className="quiz-btn">Avancé / Athlète</button>
          </div>
        </div>
      )}

      {/* STEP 3 : DISPONIBILITÉS */}
      {step === 3 && (
        <div>
          <h4 className="text-base font-bold text-white mb-4">3. Quel est votre rythme de disponibilité ?</h4>
          <div className="grid grid-cols-1 gap-3">
            <button onClick={() => handleAnswer('availability', 'variables')} className="quiz-btn">Variable d'une semaine à l'autre (Emploi du temps chargé)</button>
            <button onClick={() => handleAnswer('availability', 'fixes')} className="quiz-btn">Fixe (Besoin de créneaux réguliers pour garder le rythme)</button>
          </div>
        </div>
      )}

      {/* STEP 4 : PRÉFÉRENCE */}
      {step === 4 && (
        <div>
          <h4 className="text-base font-bold text-white mb-4">4. Comment préférez-vous vous entraîner ?</h4>
          <div className="grid grid-cols-1 gap-3">
            <button onClick={() => handleAnswer('preference', 'solo')} className="quiz-btn">Seul(e) avec mon Coach dédié</button>
            <button onClick={() => handleAnswer('preference', 'collective')} className="quiz-btn">En petit groupe / Ambiance collective</button>
          </div>
        </div>
      )}

      {/* STEP 5 : RÉSULTAT */}
      {step === 5 && recommendation && (
        <div className="text-center animate-fade-in">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Votre recommandation Jengu</p>
          <h4 className="text-xl md:text-2xl font-black text-amber-500 mb-4 uppercase">
            {recommendation.title}
          </h4>
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-left mb-6">
            <p className="text-zinc-300 text-sm leading-relaxed italic">
              "{recommendation.reason}"
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                const el = document.getElementById('booking-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-amber-500 text-black font-black text-xs uppercase tracking-widest py-3 px-5 rounded-xl hover:bg-amber-400 transition"
            >
              Sélectionner pour réserver
            </button>
            <button
              onClick={resetQuiz}
              className="bg-zinc-800 text-zinc-400 font-medium text-xs uppercase tracking-widest py-3 px-5 rounded-xl hover:bg-zinc-700 transition"
            >
              Recommencer ↺
            </button>
          </div>
        </div>
      )}

      {/* CSS local temporaire pour éviter d'alourdir les classes Tailwind */}
      <style jsx>{`
        .quiz-btn {
          width: 100%;
          text-align: left;
          background-color: rgb(24 24 27 / 0.5);
          border: 1px solid rgb(39 39 42);
          color: rgb(212 212 216);
          padding: 1rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .quiz-btn:hover {
          border-color: #f59e0b;
          color: white;
          background-color: rgb(24 24 27 / 0.8);
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}