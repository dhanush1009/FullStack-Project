# Auto-Port Detection System

## Overview
The Disaster Management System now includes intelligent auto-port detection that automatically finds available ports when the default port 5000 is already in use. This eliminates the `EADDRINUSE` error and ensures the server always starts successfully.

## Features

### 🔍 **Automatic Port Detection**
- Starts with port 5000 by default
- If port 5000 is busy, automatically tries 5001, 5002, etc.
- Tests up to 100 consecutive ports to find an available one
- Clear console messages showing which ports are being tested

### 📝 **Server Configuration Tracking**
- Creates `server-config.json` file with current server details
- Includes port number, URL, start time, and original port attempted
- Helps frontend applications discover the correct backend URL

### 🏥 **Health Check Endpoint**
- Added `/api/health` endpoint for server status checking
- Returns server port, status, and timestamp
- Enables frontend auto-discovery of backend server

### 🚀 **Smart Server Starter**
- `start-server.js` script for enhanced server management
- Graceful shutdown handling
- Better error reporting and logging

## How It Works

### Backend Auto-Port Detection
```javascript
// The server automatically finds available ports
const findAvailablePort = async (startPort) => {
  let currentPort = startPort;
  
  while (currentPort < startPort + 100) {
    const available = await isPortAvailable(currentPort);
    if (available) {
      return currentPort;
    }
    console.log(`⚠️  Port ${currentPort} is already in use, trying port ${currentPort + 1}...`);
    currentPort++;
  }
  
  throw new Error(`No available ports found between ${startPort} and ${startPort + 99}`);
};
```

### Server Configuration File
```json
{
  "port": 5001,
  "url": "http://localhost:5001",
  "startTime": "2025-10-08T04:50:43.637Z",
  "originalPort": 5000
}
```

### Health Check Response
```json
{
  "status": "ok",
  "port": 5001,
  "timestamp": "2025-10-08T04:50:43.637Z",
  "message": "Disaster Management Backend Server is running"
}
```

## Usage

### Starting the Server
```bash
# Method 1: Direct start (with auto-port detection)
node server.js

# Method 2: Using the smart starter script
node start-server.js

# Method 3: Using npm script
npm start
```

### Console Output Examples

**Successful start on default port:**
```
✅ Twilio SMS configured
🚀 Server successfully started on http://localhost:5000
📧 Email configured for: your-email@gmail.com
👤 Admin email: admin@example.com
🔗 Socket.IO server ready for real-time updates
🔄 Server will automatically find available ports if needed
📝 Server configuration saved to server-config.json
✅ MongoDB connected
✅ Email server is ready to send messages
```

**Auto-port detection in action:**
```
✅ Twilio SMS configured
⚠️  Port 5000 is already in use, trying port 5001...
🚀 Server successfully started on http://localhost:5001
📍 Note: Originally tried port 5000, but it was in use
📧 Email configured for: your-email@gmail.com
👤 Admin email: admin@example.com
🔗 Socket.IO server ready for real-time updates
🔄 Server will automatically find available ports if needed
📝 Server configuration saved to server-config.json
✅ MongoDB connected
✅ Email server is ready to send messages
```

## Frontend Integration

### API Configuration Utility
The system includes `src/utils/apiConfig.js` for frontend applications to automatically discover the backend server:

```javascript
import { getApiBaseUrl } from './utils/apiConfig.js';

// Automatically detect backend URL
const apiUrl = await getApiBaseUrl();
console.log('Backend server found at:', apiUrl);

// Use in API calls
const response = await fetch(`${apiUrl}/api/volunteers`);
```

### Manual Port Configuration
You can still specify a custom port using environment variables:
```bash
PORT=3000 node server.js
```

## Benefits

### ✅ **No More Port Conflicts**
- Eliminates `EADDRINUSE` errors completely
- Server always starts successfully
- Multiple instances can run simultaneously for testing

### ✅ **Developer Friendly**
- Clear console messages about port selection
- Automatic configuration file generation
- Health check endpoint for monitoring

### ✅ **Production Ready**
- Respects `PORT` environment variable
- Graceful error handling
- Comprehensive logging

### ✅ **Frontend Compatible**
- Auto-discovery utilities for frontend applications
- Configuration file for port tracking
- Health check endpoint for status monitoring

## Troubleshooting

### If Server Still Won't Start
1. **Check if 100+ consecutive ports are busy:**
   - The system tries ports 5000-5099 by default
   - If all are busy, you'll see an error message
   - Try restarting your computer or killing unnecessary processes

2. **Permission Issues:**
   - On some systems, ports below 1024 require admin privileges
   - The system starts from port 5000 to avoid this issue

3. **Network Configuration:**
   - Ensure localhost/127.0.0.1 is properly configured
   - Check firewall settings if needed

### Monitoring Server Status
```bash
# Check health endpoint
curl http://localhost:5000/api/health

# Check server config file
cat backend/server-config.json
```

## Configuration Files

### server-config.json
Automatically generated file containing:
- Current server port
- Full server URL
- Server start timestamp
- Original port that was attempted

### Environment Variables
- `PORT`: Override default starting port
- `NODE_ENV`: Set environment (development/production)

## Multiple Server Instances

The auto-port detection allows running multiple server instances simultaneously:

```bash
# Terminal 1
node server.js  # Starts on port 5000

# Terminal 2  
node server.js  # Automatically starts on port 5001

# Terminal 3
node server.js  # Automatically starts on port 5002
```

This is particularly useful for:
- Development and testing
- Load balancing setups
- Backup server instances
- Different environment configurations

## Future Enhancements

- **Port Range Configuration**: Allow custom port ranges
- **Service Discovery**: Integration with service discovery systems
- **Load Balancer Integration**: Automatic registration with load balancers
- **Docker Support**: Enhanced container deployment with port mapping
