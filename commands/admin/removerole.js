const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'removerole',
    description: "Role Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const targetUser = message.mentions.users.first()
            if (!targetUser) {
                message.reply('Please specify a user to give a role to')
                return;
            }

            args.shift()

            const roleName = args.join(' ')
            const { guild } = message
            const role = guild.roles.cache.find((role) => {
                return role.name === roleName
            })
            if (!role) {
                message.reply(`There is no role named "${roleName}"`).then((message) => {
                    setTimeout(() => {
                        message.delete().catch(e => { });
                    }, 5000)
                })
                return;
            }

            const member = guild.members.cache.get(targetUser.id)

            if (member.roles.cache.get(role.id)) {
                member.roles.remove(role)
                const norole = new MessageEmbed()
                    .setTitle(config['main_config'].servername)
                    .setDescription(`That user no longer has the **${roleName}** role`)
                    .setThumbnail(config['logging_config'].logthumbnail)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
                message.reply({ embeds: [norole] }).then((message) => {
                    setTimeout(() => {
                        message.delete().catch(e => { });
                    }, 5000)
                })
                message.delete()
            } else {
                const isrole = new MessageEmbed()
                    .setTitle(config['main_config'].servername)
                    .setDescription(`That user does not have the **${roleName}** role`)
                    .setThumbnail(config['logging_config'].logthumbnail)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
                message.reply({ embeds: [isrole] }).then((message) => {
                    setTimeout(() => {
                        message.delete().catch(e => { });
                    }, 5000)
                })
                message.delete()
            }
            const logChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
            const rolelog = new MessageEmbed()
                .setTitle('User Action | Role Removed')
                .addField('User', targetUser)
                .addField('Discord ID', targetUser.id)
                .addField('Role Name', role.name)
                .addField('Role ID', role.id)
                .setThumbnail(config['logging_config'].logthumbnail)
                .setColor(config['main_config'].colorhex)
                .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
            logChannel.send({ embeds: [rolelog] })
        }
    }
}