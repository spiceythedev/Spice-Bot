const { MessageEmbed, RichPresenceAssets } = require("discord.js")

module.exports = {
  name: 'serverinfo',
  description: "Get Info About a Server",
  aliases: ['server'],
  async execute(message, args, cmd, client, Spicey, config) {
    const { guild, channel } = message
    const serverINfo = new MessageEmbed()
    .setTitle(`Server Info For ${config['main_config'].servername}`)
    .addField('Server Name', `${guild.name}`)
    .addField('Server ID', `${guild.id}`)
    .addField('Server Owner', `<@${guild.ownerId}>`)
    .addField('Server Created', new Date(guild.createdTimestamp).toLocaleDateString())
    .addField('Roles', guild.roles.cache.map(r => r).join(', '), true)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setColor(config['main_config'].colorhex)
    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
    channel.send({ embeds: [serverINfo] }).then((message) => {
      setTimeout(() => {
          message.delete().catch(e => {});
      }, 5000)})
    message.delete();
  }
}