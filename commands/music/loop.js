const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'loop',
    description: "Music Command",
    async execute(message, args, cmd, client, Spicey, config) {

        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel('Loop Song')
          .setCustomId('loops')
          .setStyle('SECONDARY'),

          new MessageButton()
          .setLabel('Loop Queue')
          .setCustomId('loopq')
          .setStyle('SECONDARY')
        )

        const loopEmebed = new MessageEmbed()
        .setTitle(`${config['main_config'].servername}`)
        .setDescription('Please Select A Loop Mode')
        .setColor(`${config['main_config'].colorhex}`)
        .setFooter(`${config['main_config'].copyright}`)
        message.channel.send({ embeds: [loopEmebed], components: [row] })

        message.delete()
    }
}