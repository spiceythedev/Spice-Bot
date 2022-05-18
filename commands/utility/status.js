const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'status',
    description: "Dice Command",
    async execute(message, args, cmd, client, Spicey, config) {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        const mes = new MessageEmbed()
        .addField('Status:', '\`🟢 Online\`')
            .addField("Days", `${days}`)
            .addField("Hours", `${hours}`)
            .addField("Minutes", `${minutes}`)
            .addField("Seconds", `${seconds}`)
            .setColor(config['main_config'].colorhex)
            .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
        message.channel.send({ embeds: [mes] })
    }
}