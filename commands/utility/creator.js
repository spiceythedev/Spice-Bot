const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'creator',
    description: "Creator Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const creatorEmbed = new MessageEmbed()
            .setColor(config['main_config'].colorhex)
            .setTitle(config['main_config'].servername)
            .setDescription("`Spicey#0001:` Main Code \n `Hyperz#0001:` Command Design Inspiration & Help Command")
            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

        message.channel.send({ embeds: [creatorEmbed] }).then((message) => {
            setTimeout(() => {
                message.delete().catch(e => { });
            }, 5000)
        })
        message.delete()
    }
}