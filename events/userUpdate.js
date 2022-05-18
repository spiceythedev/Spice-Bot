const chalk = require('chalk')

module.exports = async (Spicey, client, con, oldUser, newUser) => {
    try {
        const config = require('../config.js')
        if (config['logging_config'].enabled) {
            const logChannel = client.channels.cache.get(global.channellogs.get(`${config['main_config'].serverid}`))
            if (oldUser.displayAvatarURL() != newUser.displayAvatarURL()) {
                const editLog = new Spicey.MessageEmbed()
                    .setTitle(`User Action | User Updated`)
                    .setDescription(`${newUser.tag} has updated their avatar.`)
                    .setImage(`${newUser.displayAvatarURL({ dynamic: true })}`)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
                logChannel.send({ embeds: [editLog] })

            } else {
                logembed = new Spicey.MessageEmbed()
                    .setTitle(`User Action | User Updated`)
                    .setThumbnail(config['logging_config'].logthumbnail)
                    .addField(`User:`, `${newUser.tag}`)
                    .addField(`Before Changes:`, `**Tag:** ${oldUser.tag}\n**ID:** ${oldUser.id}\n**Username:** ${oldUser.username}\n**#:** ${oldUser.discriminator}`)
                    .addField(`After Changes:`, `**Tag:** ${newUser.tag}\n**ID:** ${newUser.id}\n**Username:** ${newUser.username}\n**#:** ${newUser.discriminator}`)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
                logChannel.send({ embeds: [logembed] })
            }
        }
    } catch (err) {
        console.log(chalk.redBright(`[ERROR]:`) + `${err}`)
    }
}