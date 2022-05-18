const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'snipe',
    description: "Role Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].staff
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const msg = client.snipes.get(message.channel.id)
            const embed = new MessageEmbed()
                .setTitle(config['main_config'].servername)
                .addField('Message Author', `${msg.author}`)
                .setThumbnail(config['logging_config'].logthumbnail)
                .addField('Content', `\`\`\`\n${msg.content}\n\`\`\``)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001`})
                .setColor(config['main_config'].colorhex)
            message.channel.send({ embeds: [embed] }).then((msg) => {
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            })
            message.delete()
        }
    }
}