import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Solution sécurisée pour le build
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummyKeyForBuild_123');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, locationPreference, additionalNotes, selectedOfferId } = body;

    // Structure du contenu de l'email d'alerte
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #27272a; background-color: #09090b; color: #f4f4f5; border-radius: 12px;">
        <h2 style="color: #f59e0b; text-transform: uppercase; border-bottom: 2px solid #27272a; padding-bottom: 10px; margin-top: 0;">
          🏋️‍♂️ Nouvelle Réservation JENGU
        </h2>
        <p style="font-size: 16px;">Un nouveau client souhaite s'inscrire depuis le site internet à Dakar.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272a; font-weight: bold; color: #a1a1aa; width: 40%;">Formule Choisie :</td>
            <td style="padding: 10px; border-bottom: 1px solid #27272a; font-weight: bold; color: #f59e0b; text-transform: uppercase;">${selectedOfferId.replace('-', ' ')}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Nom complet :</td>
            <td style="padding: 10px; border-bottom: 1px solid #27272a; font-weight: bold;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Téléphone :</td>
            <td style="padding: 10px; border-bottom: 1px solid #27272a; font-weight: bold;"><a href="tel:${phone}" style="color: #f59e0b; text-decoration: none;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Adresse Email :</td>
            <td style="padding: 10px; border-bottom: 1px solid #27272a;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Lieu préféré :</td>
            <td style="padding: 10px; border-bottom: 1px solid #27272a; text-transform: capitalize;">${locationPreference || 'Non spécifié'}</td>
          </tr>
        </table>

        <div style="margin-top: 25px; padding: 15px; bg-color: #18181b; border-left: 4px solid #f59e0b; border-radius: 4px; background: #18181b;">
          <h4 style="margin: 0 0 8px 0; color: #a1a1aa;">Objectifs & Disponibilités :</h4>
          <p style="margin: 0; font-style: italic; font-size: 14px; line-height: 1.5; color: #e4e4e7;">
            ${additionalNotes || 'Aucune note additionnelle laissée.'}
          </p>
        </div>

        <p style="margin-top: 30px; font-size: 12px; color: #71717a; text-center: center;">
          Dépêchez-vous de le recontacter pour bloquer ses créneaux !
        </p>
      </div>
    `;

    // Envoi de l'email via Resend
    // Note : Avec le compte gratuit de base, tu peux envoyer des mails UNIQUEMENT à ta propre adresse (onboarding@resend.dev)
    // Pour envoyer à n'importe qui, il faudra juste valider ton nom de domaine plus tard.
   await resend.emails.send({
      from: 'Jengu Coaching <onboarding@resend.dev>',
      to: 'astoudiakhate2@gmail.com', // 👈 Écris ton vrai email personnel ici pour recevoir l'alerte !
      subject: `🚨 Nouvelle demande - ${fullName} (${selectedOfferId.replace('-', ' ')})`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur d'envoi Resend :", error);
    return NextResponse.json({ success: false, error: "Erreur lors de l'envoi de l'email" }, { status: 500 });
  }
}