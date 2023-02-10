import winston from "winston";
import { FOLDER_LOGS } from "./env";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', dirname: FOLDER_LOGS, level: "error" }),
        new winston.transports.File({ filename: 'calvoia.log', dirname: FOLDER_LOGS }),
        new winston.transports.Console({ format: winston.format.simple() })
    ]
})