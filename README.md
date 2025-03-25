# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Mac LLM Compatibility Checker

A web application to check compatibility between Mac hardware configurations and various LLM models for Ollama.

## Features

- Select your Mac model, chip, and RAM configuration
- View compatibility status for various Ollama models
- Filter models by size and compatibility status

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Update Ollama models data
npm run update-models

# Build for production
npm run build
```

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages when changes are merged to the main branch. The deployment is handled by GitHub Actions.

### Setup Instructions

1. Push this repository to GitHub
2. Go to your repository settings
3. Navigate to "Pages" in the sidebar
4. Under "Build and deployment", select "GitHub Actions" as the source
5. The site will be automatically deployed on each push to the main branch

### Manual Deployment

You can also trigger a manual deployment from the "Actions" tab in your GitHub repository by selecting the "Build and Deploy to GitHub Pages" workflow and clicking "Run workflow".

## Customization

To customize the base URL for GitHub Pages deployment, you can modify the `base` property in `vite.config.js`.

## Technology Stack

- React
- Vite
- Tailwind CSS
- GitHub Actions (CI/CD)
