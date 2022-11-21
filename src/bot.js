require('dotenv').config(); //loads env variables

//create Client class to use discord library
const { Client } = require('discord.js');
const client = new Client();

//create events that happen through discord
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`)
});

client.on('message', (message) => {
    console.log(`[${message.author.tag}]: ${message.content}`);
})

client.login(process.env.DISCORDJS_BOT_TOKEN)

const opts = {
    identity: {
      username: '<babyfalsettobot>',
      password: '<>'
    },
    channels: [
      '<falsettovibrato>'
    ]
  };

  