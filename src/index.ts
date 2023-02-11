import { DISCORD_BOT_TOKEN, OPENAI_MAX_TOKENS, OPENAI_MODEL } from "./env";
import { logger } from "./logger";
import { addCommand, login } from "./services/discord";
import { ChatCommand } from "./modules/openai";

(async () => {
    if (!DISCORD_BOT_TOKEN) {
        throw new Error("Bot token not present on env variables, set DISCORD_BOT_TOKEN.")
    }
    
    logger.info("Starting up Discord GPT NodeJS...")
    logger.warn(`Selected model: ${OPENAI_MODEL}`)
    logger.warn(`Max tokens per request: ${OPENAI_MAX_TOKENS}`)

    addCommand(ChatCommand)
    
    await login(DISCORD_BOT_TOKEN)
})()