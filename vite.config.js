import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

// Get the repository name from package.json or environment variable
const getRepoName = () => {
  // For local development, you can override with an environment variable
  if (process.env.GITHUB_REPOSITORY) {
    return process.env.GITHUB_REPOSITORY.split('/')[1]
  }
  
  // Default to the project name from package.json
  try {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
    return packageJson.name
  } catch (e) {
    return ''
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Set base for GitHub Pages deployment
  // In production, this will be /{repo-name}/
  // In development, this will be /
  base: process.env.NODE_ENV === 'production' ? `/${getRepoName()}/` : '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'update-ollama-models',
      apply: 'build', // Run during build only
      buildStart() {
        try {
          console.log('🔄 Updating Ollama models data...');
          // Use the --experimental-specifier-resolution=node flag to support ESM imports without extensions
          execSync('node --experimental-specifier-resolution=node scripts/updateOllamaModels.js', { stdio: 'inherit' });
          console.log('✅ Ollama models updated successfully.');
        } catch (error) {
          console.error('❌ Error updating Ollama models:', error);
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
