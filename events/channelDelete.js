const chalk = require('chalk')
module.exports = async (Spicey, client, con, channel) => {
    try {
        const config = require('../config.js')
        if (config['logging_config'].enabled) {
            const AuditLogFetch = await channel.guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_DELETE" });
            const Entry = AuditLogFetch.entries.first();
            const logChannel = client.channels.cache.get(global.channellogs.get(channel.guild.id))
            const channellog = new Spicey.MessageEmbed()
                .setTitle('Guild Action | Channel Deleted')
                .addField('Deleted By', `<@${Entry.executor.id}>`)
                .addField('Channel Name', `${channel.name}`)
                .addField('Channel Category', `${channel.parent}`)
                .setThumbnail(config['logging_config'].logthumbnail)
                .setColor(config['main_config'].colorhex)
                .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
                logChannel.send({ embeds: [channellog] })
        }
    } catch (err) {
        console.log(chalk.redBright(`[ERROR]:`) + `${err}`)
    }
}