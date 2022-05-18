const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'ban',
    description: "Ban Command",
    async execute(message, args, cmd, client, Spicey, config, con) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            let member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            if (!args[0]) return message.channel.send('Please mention someone to ban.');
            if (!member) return message.channel.send(`${args[0]} is not a member.`);
            if (!reason) return message.channel.send('Specify a reason.');


            const row93 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Ban')
                        .setCustomId('ban-bad')
                        .setStyle('DANGER')
                )

            const row92 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Unban')
                        .setCustomId('unban-bad')
                        .setStyle('DANGER')
                )

            const banEmbed = new MessageEmbed()
                .setTitle(config['main_config'].servername)
                .setDescription(`Would You Like To Ban <#${member.user.tag}>`)
                .addField('Ban Reason', `${reason}`)
                .setColor(config['main_config'].colorhex)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            message.channel.send({ embeds: [banEmbed], components: [row93] })


            client.on('interactionCreate', async (interaction) => {
                let reason = args.slice(1).join(" ");
                if (interaction.customId === 'ban-bad') {
                    const banChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
                    let x = new MessageEmbed()
                        .setTitle('Moderation Action | Member Banned')
                        .addField('Member Banned', `${member}`)
                        .addField('Banned by', `${message.author}`)
                        .setThumbnail(config['logging_config'].logthumbnail)
                        .addField('Reason', `${reason}`)
                        .addField('Date', `${message.createdAt}`)
                        .setColor(config['main_config'].colorhex)
                        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

                    let b = new MessageEmbed()
                        .setTitle(`You Have Been Banned From ${config['main_config'].servername}`)
                        .addField('Member Banned', `${member}`)
                        .addField('Banned by', `${message.author}`)
                        .addField('Reason', `${reason}`)
                        .setThumbnail(config['logging_config'].logthumbnail)
                        .addField('Date', `${message.createdAt}`)
                        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                        .setColor(config['main_config'].colorhex)
                    if (config['logging_config'].enabled) {
                        banChannel.send({ embeds: [x], components: [row92] })
                    }
                    await member.send({ embeds: [b] })
                    await member.ban({ reason: [reason] })
                    const banNut = new MessageEmbed()
                        .setTitle(`${config['main_config'].servername}`)
                        .setDescription(`I have banned ${member.user.tag} for ${reason}`)
                        .setColor(config['main_config'].colorhex)
                        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    interaction.reply({ embeds: [banNut], ephemeral: true })
                    await con.query(`SELECT * FROM users WHERE userId='${member.id}'`, async (err, row) => {
                        if (err) throw err;
                        await con.query(`UPDATE users SET bans = bans + 1 WHERE userid='${member.id}'`, async (err, row) => { });
                    });
                }

                if (interaction.customId === 'unban-bad') {
                    message.guild.bans.fetch().then(async bans => {
                        if (bans.size === 0) return interaction.channel.send("No one is banned in this server").then((message) => {
                            setTimeout(() => {
                                message.delete().catch(e => { });
                            }, 5000)
                        })
                        let BannedUser = bans.find(ban => ban.user.id == member)
                        if (!BannedUser) return interaction.channel.send('This user isnt banned').then((message) => {
                            setTimeout(() => {
                                message.delete().catch(e => { });
                            }, 5000)
                        })
                        await message.guild.members.unban(BannedUser.user, reason)
                        const unbanE = new MessageEmbed()
                            .setTitle(config['main_config'].servername)
                            .setDescription(`${member} Has Been Unbanned`)
                            .setThumbnail(config['logging_config'].logthumbnail)
                            .setColor(config['main_config'].colorhex)
                            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

                        const unbanChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
                        const unbanlog = new MessageEmbed()
                            .setTitle('Moderation Action | Member Un Banned')
                            .addField('Member Un Banned', `${member}`)
                            .addField('Un Banned by', `${message.author}`)
                            .setThumbnail(config['logging_config'].logthumbnail)
                            .addField('Reason', `${reason}`)
                            .addField('Date', `${message.createdAt}`)
                            .setColor(config['main_config'].colorhex)
                            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                        interaction.reply({ embeds: [unbanE], ephemeral: true })
                        if (config['logging_config'].enabled) {
                            unbanChannel.send({ embeds: [unbanlog] })
                        }
                    })
                }
            })
        }
    }
}
