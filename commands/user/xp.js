const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'xp',
    description: "Dice Command",
    async execute(message, args, cmd, client, Spicey, config, con) {
        let target = message.mentions.members.first() || message.author;

        con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
            if(err) console.log(err)

            if(!rows[0]) return message.channel.send('This User Has No Xp')
            let xp = rows[0].xp

            const xpEmbed = new MessageEmbed()
            .setTitle(`Users Xp`)
            .setDescription(`**Current Xp:** ${xp}`)
            .setColor(config['main_config'].colorhex)
            .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

            message.channel.send({ embeds: [xpEmbed] })
        })
    }
}