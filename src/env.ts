import * as dotenv from "dotenv";
import path from "path";

dotenv.config()

export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

export const FOLDER_LOGS = process.env.FOLDER_LOGS || process.env.NODE_ENV === "production" ? path.join(__dirname, 'logs') : path.join(__dirname, "..", 'logs') 

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const OPENAI_MAX_TOKENS = parseInt(process.env.OPENAI_MAX_TOKENS || "500")
export const OPENAI_MODEL = process.env.OPENAI_MODEL || "text-davinci-003"