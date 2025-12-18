#!/usr/bin/env node

// Smart server starter with auto-port detection
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting Disaster Management Backend Server...');
console.log('🔍 Auto-port detection enabled');
console.log('📊 Will automatically find available ports starting from 5000');
console.log('');

// Start the server
const serverProcess = spawn('node', ['server.js'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

// Handle process events
serverProcess.on('close', (code) => {
  if (code !== 0) {
    console.log(`\n❌ Server process exited with code ${code}`);
  } else {
    console.log('\n✅ Server stopped gracefully');
  }
});

serverProcess.on('error', (error) => {
  console.error('❌ Failed to start server:', error.message);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  serverProcess.kill('SIGTERM');
});
