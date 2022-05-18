module.exports = {
    name: 'ticketclaim',
    description: "open a ticket",
    aliases: ['claim'],
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].ticketmanager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
        const claimD = new Spicey.MessageEmbed()
        .setTitle(config['main_config'].servername)
        .setDescription(`<@${message.author.id}> Has Claimed The Ticket`)
        .setTimestamp()
        .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
        .setColor(config['main_config'].colorhex)
    message.channel.setTopic(`Ticket Claimed By ${message.author.tag}`)
    message.channel.send({ embeds: [claimD] })
        }
    }
}