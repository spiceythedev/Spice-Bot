const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    description: "Suggest Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const ver = client.channels.cache.get(config['misc_config'].suggestionchannel)
        if (!ver) return message.channel.send('the suggestion channel does not exist');
        const suggestion = args.join(' ')

        const suggestEmbed = new MessageEmbed()
            .setTitle(`${message.author.tag}`)
            .setDescription(`${suggestion}`)
            .setColor(config['main_config'].colorhex)
            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('sugg-accept')
                    .setLabel('Accept')
                    .setStyle('SUCCESS'),

                new MessageButton()
                    .setCustomId('sugg-deny')
                    .setLabel('Deny')
                    .setStyle('DANGER')
            )

        const sugPage = await ver.send({ embeds: [suggestEmbed], components: [row] })

        const col = await sugPage.createMessageComponentCollector({
            componentType: "BUTTON"
        })

        col.on("collect", async i => {
            if (!interaction.member.roles.cache.has(config['role_config'].supportteanrole)) return i.reply({ content: 'You do not have sufficient permisions to use these buttons', ephemeral: true })

            if (i.customId == 'sugg-accept') {
                const accEmbed = new MessageEmbed()
                    .setColor(`${config['main_config'].colorhex}`)
                    .setTitle('Suggestion Accepted')
                    .setDescription(`**${suggestion}**\n\n\`This Suggestion by ${message.author.tag} has been ACCEPTED\``)
                    .addFields([
                        { name: 'Accepted By', value: `${i.user.tag}`, inline: true },
                        { name: 'Accepted In', value: `${config['main_config'].servername}`, inline: true },
                    ])
                    .setFooter(`${config['main_config'].copyright} | Made By Spicey#0001`)
                    .setThumbnail(`${config['logging_config'].logthumbnail}`)

                message.author.send({ embeds: [accEmbed] })
                col.stop('Accepted')
            } else if (i.customId == 'sugg-deny') {
                const denyEmbed = new MessageEmbed()
                    .setColor(`${config['main_config'].colorhex}`)
                    .setTitle('Suggestion Denied')
                    .setDescription(`**${suggestion}**\n\n\`This Suggestion by ${message.author.tag} has been DENIED\``)
                    .addFields([
                        { name: 'Denied By', value: `${i.user.tag}`, inline: true },
                        { name: 'Denied In', value: `${config['main_config'].servername}`, inline: true },
                    ])
                    .setFooter(`${config['main_config'].copyright} | Made By Spicey#0001`)
                    .setThumbnail(`${config['logging_config'].logthumbnail}`)

                message.author.send({ embeds: [denyEmbed] })
                col.stop('Denied')
            }
        })

        col.on('end', async (collected, reason) => {

        if(reason === 'Accepted') {
            const accEmbed1 = new MessageEmbed()
                .setColor(`${config['main_config'].colorhex}`)
                .setTitle('Suggestion Accepted')
                .setDescription(`**${suggestion}**\n\n\`This Suggestion by ${message.author.tag} has been ACCEPTED\``)
                .setFooter(`${config['main_config'].copyright} | Made By Spicey#0001`)
                .setThumbnail(`${config['logging_config'].logthumbnail}`)

                sugPage.edit({ embeds: [accEmbed1], components: [] })

            } else if(reason === 'Denied') {

                const denyEmbed1 = new MessageEmbed()
                .setColor(`${config['main_config'].colorhex}`)
                .setTitle('Suggestion Denied')
                .setDescription(`**${suggestion}**\n\n\`This Suggestion by ${message.author.tag} has been DENIED\``)
                .setFooter(`${config['main_config'].copyright} | Made By Spicey#0001`)
                .setThumbnail(`${config['logging_config'].logthumbnail}`)

                sugPage.edit({ embeds: [denyEmbed1], components: [] })
            }
        })
    }
}