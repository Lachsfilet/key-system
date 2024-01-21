const { REST, Routes } = require('discord.js');
const axios = require('axios');
const config = require('./config.json');
const { Client, GatewayIntentBits } = require('discord.js');

const commands = [
  {
    name: 'create-key',
    description: 'creates a product key',
  },
];

const rest = new REST({ version: '10' }).setToken(config.token);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function generateProductKey() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const keyLength = 16;
  let productKey = "";

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    productKey += characters.charAt(randomIndex);
  }

  const formattedKey = productKey.replace(/(.{4})/g, "$1-").slice(0, -1);
  return formattedKey;
  // todo add save system for productkeys with buyer check for product use
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'create-key') {
      await interaction.reply({
        content: `API Key Valid! Here's your product key: ${generateProductKey()}`,
      });
    }
});


client.login(config.token);
