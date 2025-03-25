import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import parseOllamaModels from './parseOllamaModels.js';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Downloads the latest HTML from Ollama's library page
 */
function downloadOllamaHTML() {
  const url = 'https://ollama.com/library';
  const outputPath = path.resolve(__dirname, '../public/ollama.html');
  
  console.log(`Downloading Ollama library HTML from ${url}...`);
  
  // Create directory if it doesn't exist
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        fs.writeFileSync(outputPath, data);
        console.log(`Successfully downloaded and saved to ${outputPath}`);
        resolve(outputPath);
      });
    }).on('error', (err) => {
      console.error('Error downloading HTML:', err.message);
      reject(err);
    });
  });
}

// Execute the function if this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  downloadOllamaHTML()
    .then(() => {
      // After downloading, run the parser
      return parseOllamaModels();
    })
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}

export default downloadOllamaHTML; 