const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });
const messageHandler = require('../src/events/message/messageCreate');

const config = require('./config/config.json')

client.on('ready', async () => {
    console.log(`${client.user.tag} est prêt !`);
});

client.login(config.token);

messageHandler(client); 
