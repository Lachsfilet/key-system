const { REST, Routes } = require('discord.js');
const axios = require('axios');
const config = require('./config.json');
const api = require('./apikey.json');
const { Client, GatewayIntentBits } = require('discord.js');

const commands = [
  {
    name: 'create-key',
    description: 'creates a product key',
  },
];

const rest = new REST({ version: '10' }).setToken(config.token);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const apiUrl = 'http://localhost:3000/create-key';

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(config.client_id), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error refreshing application (/) commands:', error.message);
  }
})();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'create-key') {
    try {
      const response = await axios.post(apiUrl, { apiKey: api.apiKey });
      console.log('API Response:', response.data);

      await interaction.reply({
        content: `API Key Valid! Here's your product key: ${response.data.productKey}`,
      });
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
      }
      await interaction.reply('An error occurred while processing the command.');
    }
  }
});


client.login(config.token);
