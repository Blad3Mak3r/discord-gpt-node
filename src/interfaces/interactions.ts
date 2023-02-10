import { ChatInputCommandInteraction, Interaction } from "discord.js"

export interface InteractionHandler {
    path: string
    handle: (interaction: ChatInputCommandInteraction) => Promise<void>
}