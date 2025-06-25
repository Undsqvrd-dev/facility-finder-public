import { companyLogos } from '../../config/logos';

export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}/values/Faciliteiten!A1:I100?key=${process.env.GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Google Sheets API fout: ${response.statusText}`);
    }

    const data = await response.json();

    // Debugging: Log de ruwe data om te zien wat erin zit
    console.log("Headers:", data.values[0]); // Log de kolomnamen
    console.log("Eerste rij data:", data.values[1]); // Log de eerste rij met data
    console.log("Logo URL van eerste rij:", data.values[1][1]); // Log specifiek de logo URL

    // Controleer of data.values bestaat
    if (!data.values || !Array.isArray(data.values)) {
      console.error("Fout: Google Sheets data is ongeldig!", data);
      return res.status(500).json({ error: "Ongeldige gegevensstructuur ontvangen" });
    }

    // Helper functie om logo URLs correct te formatteren
    function formatGoogleDriveUrl(url) {
      console.log("Originele URL:", url);

      if (!url || typeof url !== 'string') {
        console.log("Ongeldige URL, gebruik placeholder");
        return '/placeholder-logo.svg';
      }

      url = url.trim().replace(/['"]/g, '');
      console.log("URL na trim:", url);

      // Als het een Google Drive URL is
      if (url.includes('drive.google.com')) {
        const fileId = url.match(/[-\w]{25,}/);
        if (fileId) {
          const formattedUrl = `https://drive.google.com/uc?export=view&id=${fileId[0]}`;
          console.log("Google Drive URL geformatteerd:", formattedUrl);
          return formattedUrl;
        }
      }

      // Als het een lokaal pad is (met of zonder leading slash)
      if (url.includes('logos/')) {
        // Haal de bestandsnaam uit het pad
        const filename = url.split('/').pop();
        const formattedUrl = `/logos/${filename}`;
        console.log("Lokaal pad geformatteerd:", formattedUrl);
        return formattedUrl;
      }

      console.log("Geen geldig pad gevonden, gebruik placeholder");
      return '/placeholder-logo.svg';
    }

    // Verwerk de data uit de spreadsheet
    const facilities = data.values.slice(1).map((row, index) => {
      const facility = {
        id: index + 1,
        naam: row[0] || "Onbekend",
        logo: formatGoogleDriveUrl(row[1]),
        locatie: row[2] || "Onbekend",
        branche: row[3] || "Onbekend",
        type: row[4] || "Onbekend",
        website: row[5] || "",
        lat: row[6] ? parseFloat(row[6].replace(',', '.')) : null,
        lng: row[7] ? parseFloat(row[7].replace(',', '.')) : null,
        omschrijving: row[8] || ""
      };
      
      console.log(`Facility ${facility.naam} - Logo pad:`, facility.logo);
      return facility;
    });

    // Log de volledige response voor debugging
    console.log("API Response:", JSON.stringify(facilities, null, 2));

    res.status(200).json(facilities);
  } catch (error) {
    console.error("Fout bij ophalen van faciliteiten:", error);
    res.status(500).json({ error: "Kon data niet ophalen" });
  }
}