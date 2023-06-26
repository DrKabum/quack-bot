import { BotCommand } from '../types.js'
import { SlashCommandBuilder } from "discord.js";

const userCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides user informations'),
  async execute(interaction) {
    await interaction.reply(`This command was run by ${interaction.user.username}, ${interaction.user.createdAt}`)
  }
}

export default userCommand