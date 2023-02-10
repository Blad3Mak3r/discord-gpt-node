import express, { Application } from "express";
import { REST, Client, GatewayIntentBits } from "discord.js";
import { APP_HOST, APP_PORT, DISCORD_BOT_TOKEN } from "./env";
import { logger } from "./logger";
import { addCommand, login } from "./services/discord";
import { ChatCommand } from "./modules/openai";

if (!DISCORD_BOT_TOKEN) {
    throw new Error("Bot token not defined.")
}

logger.info("Adding commands:")
addCommand(ChatCommand)

const app = express()

app.listen(APP_PORT, APP_HOST, async () => {
    logger.info(`Server ready at ${APP_HOST}:${APP_PORT}`)

    await login(DISCORD_BOT_TOKEN!!)
})
