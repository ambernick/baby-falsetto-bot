require('dotenv').config(); //loads env variables

const { Client } = require('discord.js');
const client = new Client();

client.login(process.env.DISCORDJS_BOT_TOKEN)
