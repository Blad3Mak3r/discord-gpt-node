import * as dotenv from "dotenv";
import path from "path";

dotenv.config()

export const APP_HOST = process.env.HOST || '0.0.0.0'
export const APP_PORT = parseInt(process.env.PORT || '8080')
export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export const FOLDER_LOGS = process.env.FOLDER_LOGS || process.env.NODE_ENV === "production" ? path.join(__dirname, 'logs') : path.join(__dirname, "..", 'logs') 