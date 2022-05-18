const { MessageButton } = require("discord.js")
const { MessageActionRow } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'invite',
    description: "Invite Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const webEmbed = new MessageEmbed()
        .setTitle(`${config['main_config'].servername}'s Invite`, config['logging_config'].logthumbnail)
        .setDescription(`Click Below To Access ${config['main_config'].servername}'s Discord Invite`)
        .setColor(config['main_config'].colorhex)
        .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

        const row4 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel(`${config['main_config'].servername}'s Invite`)
                .setURL(config['misc_config'].invite)
                .setStyle('LINK')
        )
        
        message.channel.send({ embeds: [webEmbed], components: [row4]} )
        message.delete()
    }
}