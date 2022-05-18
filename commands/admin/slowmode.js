const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'slowmode',
    description: "Suggest Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const value = Number(args[0]);
            if (!args[0]) return message.reply('Please Specify a Time')
            if (!value || value < -1 || value > 21600) return message.reply('Please Specify A Time above 5 seconds')
            await message.channel.setRateLimitPerUser(value)
            const slowEmbed = new MessageEmbed()
                .setDescription(`✋ Slowmode Enabled in ${message.channel} for ${value} seconds`)
                .setColor(config['main_config'].colorhex)
                .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

            message.channel.send({ embeds: [slowEmbed] }).then((message) => {
                setTimeout(() => {
                    message.delete().catch(e => { });
                }, 5000)
            })

            message.delete()
        }
    }
}