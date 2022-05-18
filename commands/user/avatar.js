const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    description: "Avatar Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const pingeduser = (message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!pingeduser) return message.reply('Please specify a user')
        const avatarEmbed = new MessageEmbed()
        .setTitle(`${pingeduser.tag}'s Avatar:`)
        .setImage(`${pingeduser.displayAvatarURL({ dynamic: true})}`)
        .setColor(config['main_config'].colorhex)
        .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
        message.channel.send({ embeds: [avatarEmbed] }).then((message) => {
            setTimeout(() => {
                message.delete().catch(e => {});
            }, 5000)})
        message.delete();
    }
}