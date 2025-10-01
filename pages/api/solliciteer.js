import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  const { method, body } = req

  try {
    switch (method) {
      case 'POST':
        console.log('=== SOLICITATIE API GESTART ===');
        console.log('Request body:', body);
        
        // Valideer vereiste velden
        const { naam, email, telefoon, linkedin, motivatie, vacatureId } = body;
        
        if (!naam || !email || !telefoon || !linkedin || !motivatie || !vacatureId) {
          console.error('Ontbrekende vereiste velden:', { naam, email, telefoon, linkedin, motivatie, vacatureId });
          return res.status(400).json({ 
            error: 'Alle velden zijn verplicht',
            details: 'Naam, email, telefoon, LinkedIn, motivatie en vacature ID zijn vereist'
          });
        }

        // Valideer email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ 
            error: 'Ongeldig email adres',
            details: 'Voer een geldig email adres in'
          });
        }

        // Valideer LinkedIn URL
        const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
        if (!linkedinRegex.test(linkedin)) {
          return res.status(400).json({ 
            error: 'Ongeldig LinkedIn profiel',
            details: 'Voer een geldig LinkedIn profiel URL in (bijv. https://linkedin.com/in/jouwprofiel)'
          });
        }

        console.log('Validatie geslaagd, voeg sollicitatie toe aan database...');

        // Voeg sollicitatie toe aan Supabase
        const { data: sollicitatie, error: insertError } = await supabase
          .from('sollicitaties')
          .insert([{
            vacature_id: parseInt(vacatureId),
            naam: naam.trim(),
            email: email.trim().toLowerCase(),
            telefoon: telefoon.trim(),
            linkedin: linkedin.trim(),
            motivatie: motivatie.trim(),
            status: 'nieuw',
            created_at: new Date().toISOString()
          }])
          .select()

        if (insertError) {
          console.error('Fout bij toevoegen sollicitatie:', insertError);
          console.error('Error details:', {
            message: insertError.message,
            details: insertError.details,
            hint: insertError.hint,
            code: insertError.code
          });
          
          return res.status(500).json({ 
            error: 'Fout bij opslaan van sollicitatie',
            details: insertError.message
          });
        }

        console.log('Sollicitatie succesvol opgeslagen:', sollicitatie[0]);

        // Stuur bevestigingsemail (optioneel - kan later worden toegevoegd)
        // TODO: Implementeer email notificatie naar werkgever en kandidaat

        return res.status(201).json({ 
          success: true,
          message: 'Je sollicitatie is succesvol verzonden!',
          sollicitatie: sollicitatie[0]
        });

      case 'GET':
        // Haal sollicitaties op (voor admin doeleinden)
        const { data: sollicitaties, error: fetchError } = await supabase
          .from('sollicitaties')
          .select(`
            *,
            vacatures (
              titel,
              bedrijfsnaam
            )
          `)
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error('Fout bij ophalen sollicitaties:', fetchError);
          return res.status(500).json({ 
            error: 'Fout bij ophalen van sollicitaties',
            details: fetchError.message
          });
        }

        return res.status(200).json(sollicitaties || []);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Interne server fout',
      details: error.message
    });
  }
}
