import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export default async function handler(req, res) {
    try {
        console.log("Sheets API route aangeroepen");

        if (!process.env.GOOGLE_SHEETS_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            throw new Error("Omgevingsvariabelen ontbreken. Controleer je .env.local bestand.");
        }

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID, serviceAccountAuth);
        await doc.loadInfo();
        console.log(`Spreadsheet geladen: ${doc.title}`);

        const sheet = doc.sheetsByIndex[0]; 
        const rows = await sheet.getRows();
        
        // Debugging: Bekijk de structuur van de eerste rij
        console.log("Eerste rij in Google Sheets:", rows[0]);

        const bedrijven = rows.map(row => ({
            naam: row._rawData[0] || "Onbekend", 
            logo: row._rawData[1] || "",
            locatie: row._rawData[2] || "Geen locatie opgegeven",
            branche: row._rawData[3] || "",
            type: row._rawData[4] || "",
            website: row._rawData[5] || "",
            latitude: row._rawData[6] || "",
            longitude: row._rawData[7] || "",
        }));

        console.log("Opgehaalde bedrijfsgegevens:", bedrijven);
        res.status(200).json(bedrijven);
    } catch (error) {
        console.error("Fout in API:", error);
        res.status(500).json({ error: error.message });
    }
}