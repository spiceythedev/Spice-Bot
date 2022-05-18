const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'tos',
    description: "Ban Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].ticketmanager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('tos')
                        .setLabel('Agree')
                        .setStyle('SUCCESS'),
                )


            const tosE = new MessageEmbed()
                .setTitle(`${config['main_config'].servername}'s tos`)
                .setDescription(`${config['misc_config'].tos}`)
                .setColor(`${config['main_config'].colorhex}`)
            const tosPage = await message.channel.send({ embeds: [tosE], components: [row] })

            const col = await tosPage.createMessageComponentCollector({
                componentType: "BUTTON"
            })

            col.on("collect", async i => {
                if (i.customId == 'tos') {
                    const reRollE = new MessageEmbed()
                        .setTitle('tos accepted')
                        .setDescription(`${i.member} has agreed to your tos`)
                        .setColor(`${config['main_config'].colorhex}`)
                        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    tosPage.edit({ embeds: [reRollE], components: [] })
                    i.deferUpdate()
                }
            })
            message.delete()
        }
    }
}