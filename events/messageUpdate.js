const chalk = require('chalk')

module.exports = async (Spicey, client, con, message, newMessage) => {
    try {
        const config = require('../config.js')
        if (config['logging_config'].enabled) {
            const logChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
            if (message.embeds.length) return;
            const editLog = new Spicey.MessageEmbed()
                .setTitle('Message Action | Edited Message')
                .addField('Edited By', `${message.author}`)
                .addField('Discord ID', `${message.author.id}`)
                .addField('In', `<#${message.channel.id}>`)
                .addField('Old Message', `${message.content}`)
                .setThumbnail(config['logging_config'].logthumbnail)
                .addField('New Message', `\`\`\`\n${message.content}\n\`\`\``)
                .setColor(config['main_config'].colorhex)
                .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
            logChannel.send({ embeds: [editLog] })
        }
    } catch (err) {
        console.log(chalk.redBright(`[ERROR]:`) + `${err}`)
    }
}