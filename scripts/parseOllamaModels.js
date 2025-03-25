import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parses the Ollama HTML file to extract model information
 */
function parseOllamaModels() {
  // Path to the HTML file
  const htmlFilePath = path.resolve(__dirname, '../public/ollama.html');
  
  // Check if the file exists
  if (!fs.existsSync(htmlFilePath)) {
    console.error('Error: ollama.html file not found');
    return null;
  }
  
  // Read the HTML file
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
  
  // Load HTML with cheerio
  const $ = cheerio.load(htmlContent);
  
  // Initialize models array
  const models = [];
  
  // Find all model items in the HTML - models are in li elements with attribute x-test-model
  $('li[x-test-model]').each((_, element) => {
    const modelCard = $(element);
    
    // Extract model name from the h2 element inside the model card
    const fullName = modelCard.find('h2 span').first().text().trim();
    if (!fullName) return; // Skip if no name found
    
    const name = fullName.split(' ')[0].toLowerCase(); // Extract first word as model name
    
    // Extract size information - sizes are in spans with attribute x-test-size
    const sizeElements = modelCard.find('span[x-test-size]');
    if (sizeElements.length === 0) return; // Skip if no size information
    
    // Process each size
    sizeElements.each((_, sizeElement) => {
      const sizeText = $(sizeElement).text().trim();
      
      // Parse the size
      let sizeValue = 0;
      let sizeUnit = 'B';
      
      if (sizeText.includes('x')) {
        // Handle mixture format like "8x7B"
        const parts = sizeText.match(/(\d+)x(\d+)([BbMm])/);
        if (parts) {
          const multiplier = parseInt(parts[1]);
          const baseSize = parseFloat(parts[2]);
          sizeValue = multiplier * baseSize;
          sizeUnit = parts[3].toUpperCase();
        }
      } else {
        // Handle standard format like "7B" or "33M"
        const parts = sizeText.match(/(\d+(?:\.\d+)?)([BbMm])/);
        if (parts) {
          sizeValue = parseFloat(parts[1]);
          sizeUnit = parts[2].toUpperCase();
        }
      }
      
      if (sizeValue === 0) return; // Skip if we couldn't parse the size
      
      // Convert to billions for consistent representation
      let parameterSize = sizeValue;
      if (sizeUnit === 'M') {
        parameterSize = sizeValue / 1000; // Convert M to B
      }
      
      // Display size as shown on the website
      let displaySize = sizeText;
      
      models.push({
        name,
        size: displaySize,
        parameterSize // Size in billions of parameters
      });
    });
  });
  
  // Sort models by name and size
  models.sort((a, b) => {
    // Sort by name, then by size
    if (a.name !== b.name) return a.name.localeCompare(b.name);
    return a.parameterSize - b.parameterSize;
  });
  
  // Write the models to a JSON file
  const outputPath = path.resolve(__dirname, '../src/data/ollamaModels.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(models, null, 2));
  
  console.log(`Successfully extracted ${models.length} Ollama models and saved to ${outputPath}`);
  return models;
}

// Execute the function if this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  parseOllamaModels();
}

export default parseOllamaModels; 