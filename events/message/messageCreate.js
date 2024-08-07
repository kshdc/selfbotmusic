const handleCommand = require('../../CommandHandler/index');
const config = require('../../config/config.json'); 

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        try {
            if (!message || !message.content.startsWith(config.prefix)) {
                return;
            }

            const isAuthorized = config.authorized_users.length === 0 || config.authorized_users.includes(message.author.id);

            if (!isAuthorized) {
                console.log(`❌ Utilisateur non autorisé : ${message.author.id}`);
                return;
            }
            const args = message.content.slice(config.prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            await handleCommand(client, command, args, message);
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    });
};
