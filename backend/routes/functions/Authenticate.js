import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const API_KEY = process.env.API_KEY || "q9328wh3y4tn3ycq89rnyh8oqu4mr98t4w9q8nry0";


export function Authenticate(key) {
    return key === API_KEY
}