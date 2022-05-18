const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'apply',
    description: "Apply Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].managementrole
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const { guild } = message
            const appchannel = client.channels.cache.get(config['staff_application_config'].applicationchannel)


            const row6 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('staff-apply')
                        .setLabel('Apply')
                        .setStyle('SECONDARY')
                )

            const appE = new MessageEmbed()
                .setTitle(`${config['main_config'].servername}`)
                .setDescription(`Press Below To Apply For Staff`)
                .setColor(`${config['main_config'].colorhex}`)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            appchannel.send({ embeds: [appE], components: [row6] })

            message.delete()

        }
    }
}