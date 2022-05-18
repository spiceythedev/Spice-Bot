const { MessageEmbed} = require('discord.js')

module.exports = {
    name: 'play',
    description: "Music Commands",
    async execute(message, args, cmd, client, Spicey, config) {
        const song  = args.slice().join(" ")

        if(!message.member.voice.channel) return message.reply('You must be in a voice chat to run this command')
        try {
            const queue = client.distube.getQueue(message)
            client.distube.play(message.member.voice.channel, song, {
                member: message.member,
                textChannel: message.channel,
            })
            const fetchE = new MessageEmbed()
            .setDescription('Fetching Your Song Request')
            .setColor(`${config['main_config'].colorhex}`)
            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001`})
            return message.channel.send({ embeds: [fetchE]})
        } catch(err) {
            const erremebed = new MessageEmbed()
            .setTitle(`${config['main_config'].servername}`)
            .setDescription(`There was an error ${err}`)
            .setColor(`${config['main_config'].colorhex}`)
            .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
            message.channel.send({ embeds: [erremebed] })
        }
        message.delete();
    }
}