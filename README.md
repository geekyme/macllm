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

This project is configured to automatically deploy to GitHub Pages in the following ways:

1. **Automatic daily deployments**: The site is automatically built and deployed every day at midnight UTC to ensure data stays current.
2. **On push to main**: Any changes merged to the main branch trigger a deployment.
3. **Manual triggers**: Deployments can be manually triggered from the GitHub Actions tab.

The deployment process fetches the latest Ollama model data during each build, ensuring the compatibility information is always up-to-date.

### Setup Instructions

1. Push this repository to GitHub
2. Go to your repository settings
3. Navigate to "Pages" in the sidebar
4. Under "Build and deployment", select "GitHub Actions" as the source
5. The site will be automatically deployed on each push to the main branch and daily at midnight UTC

### Manual Deployment

You can also trigger a manual deployment from the "Actions" tab in your GitHub repository by selecting the "Build and Deploy to GitHub Pages" workflow and clicking "Run workflow".

## Customization

To customize the base URL for GitHub Pages deployment, you can modify the `base` property in `vite.config.js`.

## Technology Stack

- React
- Vite
- Tailwind CSS
- GitHub Actions (CI/CD)
