import { ChatInputCommandInteraction, Client, Collection, GatewayIntentBits, Interaction } from "discord.js";
import { InteractionHandler } from "../interfaces/interactions";
import { logger } from "../logger";

const intents = [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
]

const client = new Client({ rest: { version: '10' }, intents:  intents, shardCount: 1, shards: "auto"})

const commands = new Collection<string, InteractionHandler>()

client.on('ready', (c) => {
    logger.info(`Logged in as ${c.user.tag}!`)
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    const path = buildPathFromCommand(interaction);

    logger.info(`Received interaction for command ${path}`)

    await commands.get(path)?.handle(interaction)
})

function buildPathFromCommand(interaction: ChatInputCommandInteraction): string {
    return interaction.commandName.toLowerCase()
}

client.on("error", (e) => {
    logger.error(e)
})

export function addCommand(handler: InteractionHandler) {
    const path = handler.path.toLowerCase()
    if (commands.has(path)) {
        logger.error(`InteractionHandler with path '${path}' already exists.`)
        return process.exit(1)
    }

    commands.set(path, handler)
    logger.info(`Added command ${path} successfully!`)
}

export async function login(token: string) {
    logger.info("Initializing loggin process...")
    await client.login(token)
}