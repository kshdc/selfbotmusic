const { getVoiceConnection } = require('@discordjs/voice');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const voiceChannel = message.member.voice.channel;
    const guild = client.guilds.cache.get(message.guild.id);
    
    if (!voiceChannel) {
        return message.reply('❌ Vous devez être dans un salon vocal.');
    }

    const connection = getVoiceConnection(guild.id);

    if (!connection) {
        return message.reply('❌ Je ne suis pas connecté à un salon vocal.');
    }

    connection.destroy();
    message.reply('👋 Je viens de quitter le salon vocal.');
};
