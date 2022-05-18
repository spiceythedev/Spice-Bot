const chalk = require('chalk')

module.exports = async (Spicey, client, con, role) => {
    try {
        const config = require('../config.js')
        if (config['logging_config'].enabled) {
            const AuditLogFetch = await role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" });
            const Entry = AuditLogFetch.entries.first();
            const logChannel = client.channels.cache.get(global.channellogs.get(role.guild.id))
            const editLog = new Spicey.MessageEmbed()
                .setTitle('Guild Action | Role Created')
                .setThumbnail(config['logging_config'].logthumbnail)
                .addField('Created By', `<@${Entry.executor.id}>`)
                .addField('Role Name', `\`\`\`\n${role.name}\n\`\`\``)
                .setColor(config['main_config'].colorhex)
                .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
            logChannel.send({ embeds: [editLog] })
        }
    } catch (err) {
        console.log(chalk.redBright(`[ERROR]:`) + `${err}`)
    }
}