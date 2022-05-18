const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ticketuserremove',
    description: "open a ticket",
    aliases: ['removeuser', 'ticketremove', 'remove'],
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].ticketmanager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            let pingeduser = (message.mentions.users.first())
            if(!pingeduser) return message.reply('Please Specify Someone To Add To The Ticket')
            if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You Need To Be In A Ticket Channel To Run This Command.`).then(msg => msg.delete({ timeout: 10000 })).catch();
            message.channel.permissionOverwrites.edit(pingeduser, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
            });
            const addEmebed = new MessageEmbed()
                .setTitle(`${pingeduser.username} Has Been Removed From The Ticket`)
                .setDescription(`${pingeduser} Has Been Removed From the ticket`)
                .setColor(config['main_config'].colorhex)
                .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
            message.channel.send({ embeds: [addEmebed] })
        }
    }
}
