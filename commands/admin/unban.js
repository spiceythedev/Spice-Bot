const { MessageEmbed } = require('discord.js')


module.exports = {
    name: 'unban',
    description: "Ban Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            let reason = args.slice(1).join(" ")
            let userId = args[0]

            if (!reason) reason = 'No reason provided';
            if (!userId) return message.reply('Please provide an id')

            message.guild.bans.fetch().then(async bans => {
                if (bans.size === 0) return message.reply("No one is banned in this server").then((message) => {
                    setTimeout(() => {
                        message.delete().catch(e => { });
                    }, 5000)
                })
                let BannedUser = bans.find(ban => ban.user.id == userId)
                if (!BannedUser) return message.reply('This user isnt banned').then((message) => {
                    setTimeout(() => {
                        message.delete().catch(e => { });
                    }, 5000)
                })
                await message.guild.members.unban(BannedUser.user, reason)
                const unbanE = new MessageEmbed()
                    .setTitle(config['main_config'].servername)
                    .setDescription(`${userId} Has Been Unbanned`)
                    .setThumbnail(config['logging_config'].logthumbnail)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

                const unbanChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
                const unbanlog = new MessageEmbed()
                    .setTitle('Moderation Action | Member Un Banned')
                    .addField('Member Un Banned', `${userId}`)
                    .addField('Un Banned by', `${message.author}`)
                    .setThumbnail(config['logging_config'].logthumbnail)
                    .addField('Reason', `${reason}`)
                    .addField('Date', `${message.createdAt}`)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                message.channel.send({ embeds: [unbanE] }).then((message) => {
                    setTimeout(() => {
                        message.delete().catch(e => { });
                    }, 5000)
                })
                if (config['logging_config'].enabled) {
                    unbanChannel.send({ embeds: [unbanlog] })
                } 
                message.delete();
            })
        }
    }
}