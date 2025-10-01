import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  const { method, query, body } = req

  try {
    switch (method) {
      case 'GET':
        console.log('Fetching vacatures...');
        
        // Eerst proberen met een eenvoudige query
        const { data: vacatures, error: vacaturesError } = await supabase
          .from('vacatures')
          .select('*')

        if (vacaturesError) {
          console.error('Fout bij ophalen vacatures:', vacaturesError);
          console.error('Error details:', {
            message: vacaturesError.message,
            details: vacaturesError.details,
            hint: vacaturesError.hint,
            code: vacaturesError.code
          });
          
          return res.status(500).json({ 
            error: 'Fout bij ophalen van vacatures',
            details: vacaturesError.message,
            code: vacaturesError.code
          })
        }

        console.log('Vacatures opgehaald:', vacatures?.length || 0);
        return res.status(200).json(vacatures || [])

      case 'POST':
        // Nieuwe vacature toevoegen
        const { data: newVacature, error: insertError } = await supabase
          .from('vacatures')
          .insert([{
            titel: body.titel,
            bedrijf_id: body.bedrijf_id || null,
            bedrijfsnaam: body.bedrijfsnaam,
            logo: body.logo,
            locatie: body.locatie,
            type: body.type,
            niveau: body.niveau,
            intro: body.intro,
            status: body.status || 'actief',
            beschrijving: body.beschrijving,
            lat: body.lat,
            lng: body.lng
          }])
          .select()

        if (insertError) {
          console.error('Fout bij toevoegen vacature:', insertError)
          return res.status(500).json({ error: 'Fout bij toevoegen van vacature' })
        }

        return res.status(201).json(newVacature[0])

      case 'PUT':
        // Vacature bijwerken
        const { id } = query
        if (!id) {
          return res.status(400).json({ error: 'Vacature ID is vereist' })
        }

        const { data: updatedVacature, error: updateError } = await supabase
          .from('vacatures')
          .update({
            titel: body.titel,
            bedrijf_id: body.bedrijf_id || null,
            bedrijfsnaam: body.bedrijfsnaam,
            logo: body.logo,
            locatie: body.locatie,
            type: body.type,
            niveau: body.niveau,
            intro: body.intro,
            status: body.status,
            beschrijving: body.beschrijving,
            lat: body.lat,
            lng: body.lng,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()

        if (updateError) {
          console.error('Fout bij bijwerken vacature:', updateError)
          return res.status(500).json({ error: 'Fout bij bijwerken van vacature' })
        }

        return res.status(200).json(updatedVacature[0])

      case 'DELETE':
        // Vacature verwijderen
        const { id: deleteId } = query
        if (!deleteId) {
          return res.status(400).json({ error: 'Vacature ID is vereist' })
        }

        const { error: deleteError } = await supabase
          .from('vacatures')
          .delete()
          .eq('id', deleteId)

        if (deleteError) {
          console.error('Fout bij verwijderen vacature:', deleteError)
          return res.status(500).json({ error: 'Fout bij verwijderen van vacature' })
        }

        return res.status(200).json({ message: 'Vacature succesvol verwijderd' })

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).json({ error: `Method ${method} not allowed` })
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Interne server fout' })
  }
}