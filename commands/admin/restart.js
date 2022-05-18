const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'restart',
    description: "Restart Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
        client.destroy()
        client.login(config['main_config'].token )

        const rEmbed = new MessageEmbed()
        .setDescription('I Have Restarted')
        .setColor(config['main_config'].colorhex)
        .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

        message.channel.send({ embeds: [rEmbed] })
        }
    }
}