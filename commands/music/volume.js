const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'volume',
    description: "Music Commands",
    async execute(message, args, cmd, client, Spicey, config) {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
      const volume = parseInt(args[0])
      if (isNaN(volume)) return message.channel.send(`Please enter a valid number!`)
      queue.setVolume(volume)
      const volumeE = new MessageEmbed()
      .setColor(`${config['main_config'].colorhex}`)
      .setDescription(`Volume set to \`${volume}\``)
      .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
      message.channel.send({ embeds: [volumeE] })
    }
  }