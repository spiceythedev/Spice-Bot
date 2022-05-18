module.exports = {
    name: 'ticketintro',
    description: "open a ticket",
    aliases: ['intro'],
    permissions: ['MANAGE_CHANNELS'],
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].ticketmanager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const introE = new Spicey.MessageEmbed()
                .setTitle(config['main_config'].servername)
                .setDescription(`Hello my name is ${message.author} i am with ${config['main_config'].servername}'s staff team i will be taking care of your ticket today`)
                .setColor(config['main_config'].colorhex)
                .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

            message.channel.send({ embeds: [introE] })
        }
    }
}