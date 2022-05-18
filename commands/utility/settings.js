const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'settings',
    description: "Dice Command",
    async execute(message, args, cmd, client, Spicey, config, con) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const prefix = global.prefixes.get(message.guild.id)
            const logchannel = global.channellogs.get(message.guild.id)
            const memberid = global.memberId.get(message.guild.id)
            const verifiedId = global.verifiedId.get(message.guild.id)
            const newLog = client.channels.cache.get(logchannel)
            const newMember = message.guild.roles.cache.get(memberid)
            const newVerified = message.guild.roles.cache.get(verifiedId);
            const questo = ('Please Specify A Prefix')
            const questo2 = ('Please Specify A Channel')
            const questo3 = ('Please Specify A Meber ID')
            const questo4 = ('Please Specify A Vefified Role ID')
            const qeusto5 = ('Please Specify A Muted Role ID')
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('cmdPrefix')
                        .setLabel('Set Prefix')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('logChannel')
                        .setLabel('Set Logging Channel')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('memberId')
                        .setLabel('Set Member Role ID')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('verifiedId')
                        .setLabel('Set Verified Role ID')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('mutedId')
                        .setLabel('Set A Muted Role Id')
                        .setStyle('PRIMARY')



                )
            const row3 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('cmdPrefixcurr')
                        .setLabel(`Current Prefix:`)
                        .setStyle('SUCCESS')
                        .setDisabled(true),

                    new MessageButton()
                        .setCustomId('cmdPrefixcurrasd')
                        .setLabel(`${prefix}`)
                        .setStyle('SECONDARY')
                        .setDisabled(true),
                )

            const row8 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('newLogasdasd')
                        .setLabel(`Current Logging Channel:`)
                        .setStyle('SUCCESS')
                        .setDisabled(true),

                    new MessageButton()
                        .setCustomId('newLogasdasdasda')
                        .setLabel(`#${newLog.name}`)
                        .setStyle('SECONDARY')
                        .setDisabled(true)
                )

            const row9 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('newMemberIdsasd')
                        .setLabel(`Current Member Role Name:`)
                        .setStyle('SUCCESS')
                        .setDisabled(true),

                    new MessageButton()
                        .setCustomId('memberIdasdasdasdasd')
                        .setLabel(`${newMember.name}`)
                        .setStyle('SECONDARY')
                        .setDisabled(true)
                )

            const row22 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('newVerifiedasdadaasdasd')
                        .setLabel(`Current Verified Role Name:`)
                        .setStyle('SUCCESS')
                        .setDisabled(true),

                    new MessageButton()
                        .setCustomId('newVerifiedasdasd')
                        .setLabel(`${newVerified.name}`)
                        .setStyle('SECONDARY')
                        .setDisabled(true)
                )
            const dmEmbed = new MessageEmbed()
                .setTitle(`${config['main_config'].servername}`)
                .setDescription(`Spice Bot Settings Menu`)
                .setColor(`${config['main_config'].colorhex}`)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            message.channel.send({ embeds: [dmEmbed], components: [row, row3, row8, row9, row22] })
            client.on('interactionCreate', async (interaction) => {
                if (interaction.customId === 'cmdPrefix') {
                    const per = config['role_config'].manager
                    if (!message.member.roles.cache.some(r => per.includes(r.id))) {
                        message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
                    } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
                        interaction.reply({ content: questo, ephemeral: true })
                        if (message.author.bot) return console.log('I am an idiot')
                        const filter = m => m.author.id == interaction.member;
                        const collector = interaction.channel.createMessageCollector({ filter })
                        collector.on('collect', async (msg) => {
                            if (questo.length == 0) return collector.stop('DONE')
                            const prefixes = msg.content
                            con.query(`UPDATE settings SET cmdPrefix = '${prefixes}' WHERE guildId = '${message.guild.id}'`)
                            collector.stop()
                            const row2 = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId('newPrefixs')
                                        .setLabel(`New Prefix`)
                                        .setStyle('SUCCESS')
                                        .setDisabled(true),
                                    new MessageButton()
                                        .setCustomId('newPrefixsnew')
                                        .setLabel('.')
                                        .setStyle('SECONDARY')
                                        .setDisabled(true)
                                )
                            global.prefixes.set(`${message.guild.id}`, `${prefixes}`)
                            const newPrefixE = new MessageEmbed()
                                .setTitle(`${config['main_config'].servername}`)
                                .setDescription(`Updated The Bots Prefix To ${prefixes}`)
                                .setColor(`${config['main_config'].colorhex}`)
                                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                            interaction.channel.send({ embeds: [newPrefixE], components: [row2], ephemeral: true })
                        })
                    }
                }
                if (interaction.customId === 'logChannel') {
                    const per = config['role_config'].manager
                    if (!message.member.roles.cache.some(r => per.includes(r.id))) {
                        message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
                    } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
                        interaction.reply({ content: questo2, ephemeral: true })
                        const filter = m => m.author.id == interaction.member;
                        const collector = interaction.channel.createMessageCollector({ filter })
                        collector.on('collect', async (msg) => {
                            if (questo2.length == 0) return collector.stop('DONE')
                            const channelsss = msg.content
                            con.query(`UPDATE settings SET modLogId = '${channelsss}' WHERE guildId = '${message.guild.id}'`)
                            collector.stop()
                            const channel = client.channels.cache.get(channelsss)
                            const row4 = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId('newChannels')
                                        .setLabel(`New Channel Name:`)
                                        .setStyle('SUCCESS')
                                        .setDisabled(true),
                                    new MessageButton()
                                        .setCustomId('newChannelsnew')
                                        .setLabel(`${channel.name}`)
                                        .setStyle('SECONDARY')
                                        .setDisabled(true),
                                )
                            const row5 = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId('newChannelss')
                                        .setLabel(`New Channel ID:`)
                                        .setStyle('SUCCESS')
                                        .setDisabled(true),
                                    new MessageButton()
                                        .setCustomId('newChannelsnews')
                                        .setLabel(`${channel.id}`)
                                        .setStyle('SECONDARY')
                                        .setDisabled(true),
                                )
                            global.channellogs.set(`${message.guild.id}`, `${channelsss}`)
                            const newChannelE = new MessageEmbed()
                                .setTitle(`${config['main_config'].servername}`)
                                .setDescription(`Updated The Logging Channel To <#${channelsss}>`)
                                .setColor(`${config['main_config'].colorhex}`)
                                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                            interaction.channel.send({ embeds: [newChannelE], components: [row4, row5], ephemeral: true })
                        })
                    }
                }
                if (interaction.customId === 'memberId') {
                    const per = config['role_config'].manager
                    if (!message.member.roles.cache.some(r => per.includes(r.id))) {
                        message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
                    } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
                        interaction.reply({ content: questo3, ephemeral: true })
                        const filter = m => m.author.id == interaction.member;
                        const collector = interaction.channel.createMessageCollector({ filter })
                        collector.on('collect', async (msg) => {
                            if (questo3.length == 0) return collector.stop('DONE')
                            const membesss = msg.content
                            con.query(`UPDATE settings SET memberId = '${membesss}' WHERE guildId = '${message.guild.id}'`)
                            collector.stop()
                            const membasd = message.guild.roles.cache.get(membesss)
                            const row12 = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId('asdasdNew')
                                        .setLabel(`New Member Role:`)
                                        .setStyle('SUCCESS')
                                        .setDisabled(true),

                                    new MessageButton()
                                        .setCustomId('asdasdasdnEW')
                                        .setLabel(`${membasd.name}`)
                                        .setStyle('SECONDARY')
                                        .setDisabled(true),
                                )
                            global.memberId.set(`${message.guild.id}`, `${membesss}`)
                            const newMemberE = new MessageEmbed()
                                .setTitle(`${config['main_config'].servername}`)
                                .setDescription(`Updated The Member Role To <@&${membesss}>`)
                                .setColor(`${config['main_config'].colorhex}`)
                                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                            interaction.channel.send({ embeds: [newMemberE], components: [row12], ephemeral: true })
                        })
                    }
                }
                if (interaction.customId === 'verifiedId') {
                    const per = config['role_config'].manager
                    if (!message.member.roles.cache.some(r => per.includes(r.id))) {
                        message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
                    } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
                        interaction.reply({ content: questo4, ephemeral: true })
                        const filter = m => m.author.id == interaction.member;
                        const collector = interaction.channel.createMessageCollector({ filter })
                        collector.on('collect', async (msg) => {
                            if (questo3.length == 0) return collector.stop('DONE')
                            const verifedsasd = msg.content
                            con.query(`UPDATE settings SET verifiedId = '${verifedsasd}' WHERE guildId = '${message.guild.id}'`)
                            collector.stop()
                            const veriasd = message.guild.roles.cache.get(verifedsasd)
                            const row114 = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId('asdasdasdasdnew')
                                        .setLabel(`New Member Role:`)
                                        .setStyle('SUCCESS')
                                        .setDisabled(true),

                                    new MessageButton()
                                        .setCustomId('asNew')
                                        .setLabel(`${veriasd.name}`)
                                        .setStyle('SECONDARY')
                                        .setDisabled(true),
                                )
                            global.memberId.set(`${message.guild.id}`, `${veriasd}`)
                            const newMemberE = new MessageEmbed()
                                .setTitle(`${config['main_config'].servername}`)
                                .setDescription(`Updated The Member Role To ${veriasd}`)
                                .setColor(`${config['main_config'].colorhex}`)
                                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                            interaction.channel.send({ embeds: [newMemberE], components: [row114], ephemeral: true })
                        })
                    }
                }
            })
            message.delete()
        }
    }
}