const fs = require('fs');
const https = require('https');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

// Check environment variables
if (!process.env.GOOGLE_SHEETS_ID) {
  console.error('GOOGLE_SHEETS_ID is not set in .env.local');
  process.exit(1);
}
if (!process.env.GOOGLE_API_KEY) {
  console.error('GOOGLE_API_KEY is not set in .env.local');
  process.exit(1);
}

async function downloadImage(url, fileName) {
  return new Promise((resolve, reject) => {
    if (!url.includes('drive.google.com')) {
      console.log(`Skipping non-Google Drive URL: ${url}`);
      return resolve();
    }

    const fileId = url.match(/[-\w]{25,}/);
    if (!fileId || !fileId[0]) {
      console.log(`Invalid Google Drive URL: ${url}`);
      return resolve();
    }

    const downloadUrl = `https://drive.google.com/uc?export=view&id=${fileId[0]}`;
    const filePath = path.join(__dirname, '../public/logos', fileName);

    https.get(downloadUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${fileName}`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}/values/Faciliteiten!A1:I100?key=${process.env.GOOGLE_API_KEY}`;
    console.log('Fetching from URL:', sheetsUrl);

    const response = await fetch(sheetsUrl);
    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Sheets API error: ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();
    console.log('Received data:', data);
    
    if (!data.values || !Array.isArray(data.values)) {
      throw new Error('Invalid data structure received from Google Sheets');
    }
    
    // Maak de Logos directory als die nog niet bestaat
    const logosDir = path.join(__dirname, '../public/logos');
    if (!fs.existsSync(logosDir)) {
      fs.mkdirSync(logosDir, { recursive: true });
    }

    // Download alle logo's
    const logoUrls = data.values.slice(1).map(row => row[1]).filter(Boolean);
    console.log('Found logo URLs:', logoUrls);

    for (const url of logoUrls) {
      const fileName = url.split('/').pop();
      console.log(`Downloading ${url} as ${fileName}`);
      await downloadImage(url, fileName);
    }

    console.log('Alle logo\'s zijn gedownload!');
  } catch (error) {
    console.error('Detailed error:', error);
    process.exit(1);
  }
}

main(); 