
module.exports = async (client, message) => {
    const ping = client.ws.ping;
    message.reply(`➡️ Le ping est de : ${ping} ms`);
};


