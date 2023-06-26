import 'dotenv/config'


import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import { Qulient } from './types'
import { loadCommands } from './helpers/load-commands.js'

const { DISCORD_TOKEN } = process.env

if (DISCORD_TOKEN === undefined) throw `A Discord bot token is necessary.`

async function run() {
  let client = new Client({ intents: [GatewayIntentBits.Guilds] }) as Qulient

  client = await loadCommands(client)

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = (interaction.client as Qulient).commands.get(interaction.commandName)

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  })

  client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
  })

  client.login(DISCORD_TOKEN)
}

run()