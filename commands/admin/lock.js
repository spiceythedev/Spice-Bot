const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'lock',
    description: "lock Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Toggle:')
                    .setStyle('SECONDARY')
                    .setCustomId('toggle2')
                    .setDisabled(true),

                new MessageButton()
                .setCustomId('locktrue')
                .setLabel('Channel Lock')
                .setStyle('SUCCESS')
            )
            
            const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Toggle:')
                    .setStyle('SECONDARY')
                    .setCustomId('toggle1')
                    .setDisabled(true),

                new MessageButton()
                .setCustomId('lockfalse')
                .setLabel('Channel Unlock')
                .setStyle('SUCCESS')
            )

            const electE = new MessageEmbed()
            .setTitle(config['main_config'].servername)
            .setDescription('Choose A Setting For The Current Channel')
            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            .setColor(config['main_config'].colorhex)

            message.channel.send({ embeds: [electE], components: [row, row2]})

            message.delete();
        }
    }
}