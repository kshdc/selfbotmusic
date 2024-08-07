const fs = require('fs');
const path = require('path');

function loadCommandsFromFolder(folderPath) {
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    const commands = {};

    for (const file of commandFiles) {
        const commandName = file.split('.')[0];
        const commandPath = path.join(folderPath, file);
        const command = require(commandPath);
        commands[commandName] = command;
    }

    console.log(`Commandes chargées depuis le dossier : ${folderPath}`);
    return commands;
}

const commandsFolderPath = path.join(__dirname, '../commands/music/');
const utilsCommands = loadCommandsFromFolder(commandsFolderPath);

async function handleCommand(clientDiscord, command, args, message) {
    console.log(`Commande reçue : ${command}`);
    const allCommands = {
        ...utilsCommands
    };

    const commandFunction = allCommands[command];
    if (commandFunction) {
        try {
            await commandFunction(clientDiscord, message); // Transmet seulement `message` si c'est ce que la commande attend
        } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la commande:', error);
        }
    } else {
        console.log(`❌ Commande introuvable : ${command}`);
        message.channel.send('❌ Commande introuvable');
    }
}


module.exports = handleCommand;
