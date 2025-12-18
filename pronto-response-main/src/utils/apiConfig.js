// API Configuration utility to automatically detect backend port

// Get API URL based on environment
const getApiUrl = () => {
  // Production: Use environment variable (set in Vercel)
  if (import.meta.env.PROD && import.meta.env.VITE_API_URL) {
    console.log('📡 Using production API:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  // Development: Use localhost
  console.log('📡 Using local development API: http://localhost:5003');
  return 'http://localhost:5003';
};

// Default configuration
const DEFAULT_CONFIG = {
  port: 5003,
  url: getApiUrl()
};

// Function to read server configuration
const getServerConfig = () => {
  return DEFAULT_CONFIG;
};

// Function to test if a port is reachable
const testConnection = async (url) => {
  try {
    const response = await fetch(`${url}/api/health`, { 
      method: 'GET',
      timeout: 2000 
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Function to find active backend server
const findActiveBackend = async () => {
  // In production, always use the configured URL
  if (import.meta.env.PROD) {
    return DEFAULT_CONFIG;
  }
  
  // In development, try to find the backend
  const config = getServerConfig();
  
  // Test the configured URL first
  if (await testConnection(config.url)) {
    return config;
  }
  
  // If configured URL doesn't work, try common ports
  const commonPorts = [5003, 5002, 5001, 5000, 3000, 8000];
  
  for (const port of commonPorts) {
    const testUrl = `http://localhost:${port}`;
    if (await testConnection(testUrl)) {
      console.log(`📡 Found active backend on port ${port}`);
      return { port, url: testUrl };
    }
  }
  
  // If nothing works, return default and let the app handle the error
  console.warn('⚠️  No active backend found, using default configuration');
  return DEFAULT_CONFIG;
};

// Export the API base URL
export const getApiBaseUrl = async () => {
  const config = await findActiveBackend();
  return config.url;
};

// Export for immediate use (synchronous)
export const API_BASE_URL = getServerConfig().url;

export default {
  getApiBaseUrl,
  API_BASE_URL,
  findActiveBackend,
  getServerConfig
};
