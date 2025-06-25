const fs = require('fs');
const path = require('path');

// Lees alle logo's in de public/logos map
const logosDir = path.join(process.cwd(), 'public', 'logos');
const logos = fs.readdirSync(logosDir)
  .filter(file => file.endsWith('.png'));

// Converteer elke logo naar Base64
const logoData = {};
logos.forEach(logo => {
  const filePath = path.join(logosDir, logo);
  const base64 = fs.readFileSync(filePath, { encoding: 'base64' });
  const fileName = path.basename(logo, '.png');
  logoData[fileName] = `data:image/png;base64,${base64}`;
});

// Print de resultaten
console.log('Kopieer deze data naar je Google Sheet:');
console.log('----------------------------------------');
Object.entries(logoData).forEach(([name, base64]) => {
  console.log(`${name}:`);
  console.log(base64);
  console.log('----------------------------------------');
}); 