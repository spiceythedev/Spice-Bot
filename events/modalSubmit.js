const config = require('../config.js')
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js')

module.exports = async (Spicey, client, con, modal) => {
    if (modal.customId === 'ticketC') {
        const firstResponse = modal.getTextInputValue('textinput-ticketC')
        await modal.deferReply({ ephemeral: true })

        let permissionOverwriteArray = [{
            id: modal.member.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
        },
        {
            id: modal.guild.id,
            deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
        },
        ]
        config['role_config'].staff.forEach(role => {
            let fat = modal.guild.roles.cache.get(role);
            if (!fat) {
                console.log(`${role} is not in the server`)
            } else {
                let tempArray = {
                    id: role,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }
                permissionOverwriteArray.push(tempArray);
            }
        })
        const channel = await modal.guild.channels.create(`ticket-${modal.user.username}`, {
            type: 'text',
            parent: config['ticket_config'].ticketcategory,
            permissionOverwrites: permissionOverwriteArray
        });

        channel.setTopic(`Support Ticket for ${modal.user.username}`)
        const inTE = new MessageEmbed()
            .setTitle(config['main_config'].servername)
            .setDescription(`Ticket Created in <#${channel.id}>`)
            .setColor(config['main_config'].colorhex)
            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
        await modal.followUp({ embeds: [inTE], ephemeral: true })

        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticketarchive')
                    .setLabel('Archive')
                    .setStyle('SECONDARY'),

                new MessageButton()
                    .setCustomId('ticketdelete')
                    .setLabel('Close')
                    .setStyle('SECONDARY')

            )
        channel.send(`<@&${config['ticket_config'].roletopingonopen}>`)
        const deleteEmbed = new MessageEmbed()
            .setTitle(config['main_config'].servername, config['ticket_config'].ticketimage)
            .setColor(config['main_config'].colorhex)
            .setDescription(`<@${modal.user.id}> ${config['ticket_config'].ticketcreatedembed}`)
            .addField('Reason', `${firstResponse}`)
            .setThumbnail(config['ticket_config'].ticketimage)
            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
        channel.send({ embeds: [deleteEmbed], components: [row1] });
    }

    if (modal.customId === 'ticketCModal') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticketcreate')
                    .setLabel('Create A Ticket')
                    .setEmoji(`${config['ticket_config'].ticketemoji}`)
                    .setStyle(`${config['ticket_config'].ticketbuttoncolor}`)
            )
        const Titl = modal.getTextInputValue('textinput-ticketTitle');
        const Desc = modal.getTextInputValue('textinput-ticketDescription');
        const Img = modal.getTextInputValue('textinput-ticketImage');
        const ticketchannel = client.channels.cache.get(config['ticket_config'].ticketchannel)
        const ticketEmbed = new MessageEmbed()
            .setTitle(Titl)
            .setThumbnail(Img)
            .setDescription(Desc)
            .setColor(config['main_config'].colorhex)
            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
        await modal.reply({ content: 'Embed Created', ephemeral: true })
        ticketchannel.send({ embeds: [ticketEmbed], components: [row] });
    }
}