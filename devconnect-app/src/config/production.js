// Production Configuration
export const productionConfig = {
  // GitHub Pages Configuration
  githubPages: {
    apiBaseUrl: 'https://your-backend-url.com', // You'll need to set this
    basePath: '/DevConnect/',
    deploymentType: 'github-pages'
  },
  
  // Full Stack Deployment Configuration
  fullStack: {
    apiBaseUrl: 'https://your-production-domain.com',
    basePath: '/',
    deploymentType: 'full-stack'
  },
  
  // Development Configuration
  development: {
    apiBaseUrl: 'http://localhost:3000',
    basePath: '/',
    deploymentType: 'development'
  }
};

// Get current environment
export const getCurrentConfig = () => {
  if (import.meta.env.DEV) {
    return productionConfig.development;
  }
  
  // Check if we're on GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    return productionConfig.githubPages;
  }
  
  // Default to full stack
  return productionConfig.fullStack;
};
