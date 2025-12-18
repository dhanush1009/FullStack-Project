// API Configuration utility to automatically detect backend port
import fs from 'fs';
import path from 'path';

// Default configuration
const DEFAULT_CONFIG = {
  port: 5000,
  url: 'http://localhost:5000'
};

// Function to read server configuration
const getServerConfig = () => {
  try {
    // Try to read the server config file from backend directory
    const configPath = path.join(process.cwd(), '..', 'backend', 'server-config.json');
    
    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(configData);
      console.log(`📡 Found backend server running on port ${config.port}`);
      return config;
    }
  } catch (error) {
    console.warn('⚠️  Could not read server config, using default:', error.message);
  }
  
  // Fallback to default configuration
  console.log('📡 Using default backend configuration');
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
  const config = getServerConfig();
  
  // Test the configured URL first
  if (await testConnection(config.url)) {
    return config;
  }
  
  // If configured URL doesn't work, try common ports
  const commonPorts = [5000, 5001, 5002, 5003, 3000, 8000];
  
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
