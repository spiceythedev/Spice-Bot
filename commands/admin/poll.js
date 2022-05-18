const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'poll',
    description: "Send a message to a user",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            let channelID = message.mentions.channels.first()
            let theDescription = args.slice(1).join(" ")

            if (!channelID) return message.reply("Plase specify a channel for the poll")
            if (!theDescription) return message.reply("Please specify a question for the poll")

            const pollEmbed = new MessageEmbed()
                .setTitle(`${config['main_config'].servername} Poll`)
                .setDescription(theDescription)
                .setColor(config['main_config'].colorhex)
                .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

            let msgEmbed = await channelID.send({ embeds: [pollEmbed] })
            await msgEmbed.react('✅')
            await msgEmbed.react('❌')
            message.delete();
        }
    }
}