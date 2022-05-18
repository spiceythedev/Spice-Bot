const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");


module.exports = {
    name: 'ticket',
    description: "open a ticket",
    permissions: ['ADMINISTRATOR'],
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const asd = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Start Embed')
                        .setStyle('SECONDARY')
                        .setCustomId('AIDS')
                )
            const modea = new MessageEmbed()
                .setTitle('Start Ticket Embed Creation Proccess')
                .setDescription('Click Below To Start The Ticket Embed Creation Process')
                .setColor(config['main_config'].colorhex)
            message.channel.send({ embeds: [modea], components: [asd] })
            client.on('interactionCreate', (interaction) => {
                if (interaction.customId === 'AIDS') {
                    const { Modal, TextInputComponent, showModal } = require('discord-modals');

                    const modal = new Modal()
                        .setCustomId('ticketCModal')
                        .setTitle('Ticket Embed Creator')
                        .addComponents(
                            new TextInputComponent()
                                .setCustomId('textinput-ticketTitle')
                                .setLabel('Ticket Embed Title')
                                .setStyle('SHORT')
                                .setMinLength(4)
                                .setMaxLength(10)
                                .setPlaceholder('Write Title Here')
                                .setRequired(true),
                            new TextInputComponent()
                                .setCustomId('textinput-ticketDescription')
                                .setLabel('Ticket Embed Description')
                                .setStyle('LONG')
                                .setMinLength(4)
                                .setMaxLength(100)
                                .setPlaceholder('Write Description Here')
                                .setRequired(true),
                            new TextInputComponent()
                                .setCustomId('textinput-ticketImage')
                                .setLabel('Ticket Embed Image Link')
                                .setStyle('SHORT')
                                .setMinLength(4)
                                .setMaxLength(100)
                                .setPlaceholder('Paste Image Link')
                                .setRequired(true)
                        )

                    showModal(modal, {
                        client: client,
                        interaction: interaction
                    });
                }
            })
        }
    }
}