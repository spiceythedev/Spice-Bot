const chalk = require('chalk')

module.exports = async (Spicey, client, con, message) => {
        const config = require('../config.js')
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author.tag,
            member: message.member,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null
        });
        if (config['logging_config'].enabled) {
            const logChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
            const deletelog = new Spicey.MessageEmbed()
                .setTitle('Message Action | Deleted Message')
                .addField('Deleted By', `${message.author}`)
                .addField('Discord ID', `${message.author.id}`)
                .addField('In', `<#${message.channel.id}>`)
                .addField('Content', `\`\`\`\n${message.content}\n\`\`\``)
                .setThumbnail(config['logging_config'].logthumbnail)
                .setColor(config['main_config'].colorhex)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            logChannel.send({ embeds: [deletelog] })
        }
}