// Quick test to check if all imports work
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

console.log('✅ All imports working correctly!');
console.log('✅ express:', typeof express);
console.log('✅ createServer:', typeof createServer);
console.log('✅ Server:', typeof Server);

const app = express();
const server = createServer(app);
const io = new Server(server);

console.log('✅ Server objects created successfully!');
console.log('✅ Ready to start the main server!');

process.exit(0);
