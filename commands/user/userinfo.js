const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'userinfo',
  description: "Get Info About a member",
  aliases: ['user', 'whois'],
  async execute(message, args, cmd, client, Spicey, config, con) {
    const user = message.mentions.users.first() || message.member.user
    const member = message.guild.members.cache.get(user.id)

    con.query(`SELECT * FROM users WHERE userId = '${user.id}'`, (err, row) => {
      let warns = row[0].warns
      let kicks = row[0].kicks
      let bans = row[0].bans
      let mutes = row[0].mutes

    const userinfoEmbed = new MessageEmbed()
    .setTitle(`User Info For ${user.username}`)
    .addField('Username', `${user.tag}`)
    .addField('ID', `${user.id}`)
    .addField('Nickname', 'None' || `${member.nickname}`)
    .addField('Joined Server', new Date(member.joinedTimestamp).toLocaleDateString())
    .addField('Account Created', new Date(user.createdTimestamp).toLocaleDateString())
    .addField('Roles', member.roles.cache.map(r => r).join(', '), true)
    .addField('Warns', `${warns}`)
    .addField('Kicks', `${kicks}`)
    .addField('Bans', `${bans}`)
    .addField('Mutes', `${mutes}`)
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setColor(config['main_config'].colorhex)
    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
    message.channel.send({ embeds: [userinfoEmbed] }).then((message) => {
      setTimeout(() => {
          message.delete().catch(e => {});
      }, 15000)})
    })
    message.delete();
  }
}