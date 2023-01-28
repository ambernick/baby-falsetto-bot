require('dotenv').config(); //loads env variables

const fs = require('node:fs');
const path = require('node:path');
//create Client class to use discord library/ client instants
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds] });

//create events that happen through discord
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`)
});

client.on('message', (message) => {
    console.log(`[${message.author.tag}]: ${message.content}`);
})

client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
});
//login with client token
client.login(process.env.DISCORDJS_BOT_TOKEN)

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);

  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}