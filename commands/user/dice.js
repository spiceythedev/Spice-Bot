const { MessageEmbed, MessageActionRow, MessageButton, Interaction } = require("discord.js");

module.exports = {
    name: 'dice',
    description: "Dice Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const dice = () => Math.floor(Math.random() * 100) + 1;

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('roll')
                    .setLabel('Re-Roll')
                    .setStyle('SECONDARY'),
            )

        const diceE = new MessageEmbed()
            .setTitle(`🎲 ${message.author.tag}`)
            .setDescription(`You Rolled A ` + dice())
            .setColor(config['main_config'].colorhex)
            .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

        const sugPage = await message.channel.send({ embeds: [diceE], components: [row] })

        const col = await sugPage.createMessageComponentCollector({
            componentType: "BUTTON"
        })

        col.on("collect", async i => {
            if (i.customId == 'roll') {
                const reRollE = new MessageEmbed()
                    .setTitle(`🎲 ${message.author.tag}`)
                    .setDescription(`You Rolled A ` + dice())
                    .setColor(config['main_config'].colorhex)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    sugPage.edit({ embeds: [reRollE], components: [row] })
                    i.deferUpdate()
            }
        })
    }
}