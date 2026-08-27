import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the serverless function handler
import chatHandler from './api/chat.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static frontend files from the current directory
app.use(express.static(__dirname));

// Mount the serverless function logic on /api/chat
app.post('/api/chat', async (req, res) => {
    // Vercel serverless functions expect req and res, which match Express perfectly
    await chatHandler(req, res);
});

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Local dev server running on http://localhost:${PORT}`);
    console.log(`⚙️  API Endpoint mapped: POST /api/chat`);
    console.log(`=========================================`);
});
