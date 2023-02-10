import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "../env";
import { InteractionHandler } from "../interfaces/interactions";
import { logger } from "../logger";

if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API Key not defined.")
}

const cfg = new Configuration({
    apiKey: OPENAI_API_KEY!!
})

export const client = new OpenAIApi(cfg)

export const ChatCommand: InteractionHandler = {
    path: "chat",
    async handle(interaction) {
        const prompt = interaction.options.getString("prompt")

        if (!prompt) {
            await interaction.reply("No prompt defined.")
            return
        }

        await interaction.deferReply()

        const result = await client.createCompletion({
            user: interaction.user.id,
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 500
        })

        if (result.status !== 200) {
            logger.error(`Received non 200 status code on openai request: [${result.status}] ${result.statusText}`)
            await interaction.followUp(`Received non-success status code ${result.status}: ${result.statusText}`)
            return
        }

        await interaction.followUp(`> **${prompt}** - <@!${interaction.user.id}>${result.data.choices[0].text}`)
    },
}