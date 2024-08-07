const play = require('play-dl');
const config = require('../../config/config.json');
const ytdl = require('@distube/ytdl-core');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const guild = client.guilds.cache.get(message.guild.id);
    const voiceChannel = message.member.voice.channel;

    if (!guild) {
        return message.reply('❌ Vous devez être dans un serveur.');
    }

    if (!voiceChannel) {
        return message.reply('❌ Vous devez être dans un salon vocal pour que le bot puisse vous rejoindre.');
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const textAfterPlay = args.slice(1).join(' ');

    if (!textAfterPlay) {
        return message.reply('❌ Vous devez spécifier le titre après `play`. Exemple : `+play <musique>`.');
    }

    try {
        const video = await play.search(textAfterPlay, { limit: 1 });
        if (!video || !video[0]) {
            return message.reply(`❌ Aucune vidéo trouvée pour "${textAfterPlay}".`);
        }

        const videoUrl = video[0].url;
        const videoAutor = video[0].author;
        const videoTitle = video[0].title;
        console.log(`${videoUrl}`);

        
        const connection = await client.voice.joinChannel(voiceChannel, {
          selfMute: false,
          selfDeaf: false,
          selfVideo: false,
        });


        const dispatcher = connection.playAudio(
          ytdl(videoUrl, {
            quality: 'highestaudio',
          }),
        );
        dispatcher.on('start', () => {
            console.log(`${client.user.username} commence à jouer.`);
            dispatcher.setVolume(0.5);
        });

        dispatcher.on('finish', () => {
            console.log(`${client.user.username} a terminé la lecture.`);
            connection.disconnect();
        });

        dispatcher.on('error', error => {
            console.error(error);
            message.reply('❌ Oups ! Un problème technique.');
            connection.disconnect();
        });

        message.reply(`🔊 **${videoTitle}** est maintenant en cours de lecture !`);
    } catch (error) {
        console.error(error);
        message.reply('❌ Oups ! Un problème est survenu.');
    }
};
