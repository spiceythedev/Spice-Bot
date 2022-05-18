const { MessageButton, MessageActionRow, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'verify',
    description: "Send a message to a user",
    async execute(message, args, cmd, client, Spicey, config, con) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('verify')
                        .setLabel('Verify')
                        .setStyle('PRIMARY')
                )
            const ver = client.channels.cache.get(config['verification_config'].verificationchannel)

            const vEmbed = new MessageEmbed()
                .setTitle(`${config['main_config'].servername}'s Verification`)
                .setColor(config['main_config'].colorhex)
                .setThumbnail(config['logging_config'].logthumbnail)
                .setDescription(args.join(" "))
                .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
            ver.send({ embeds: [vEmbed], components: [row] });
        }
    }
}