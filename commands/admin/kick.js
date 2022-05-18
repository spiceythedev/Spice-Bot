const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: 'kick',
    description: "kick Command",
    async execute(message, args, cmd, client, Spicey, config, con) {
        const per = config['role_config'].staff
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            let member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            if (!args[0]) return message.channel.send('Please mention someone to kick.');
            if (!member) return message.channel.send(`${args[0]} is not a member.`);
            if (!reason) return message.channel.send('Specify a reason.');

            const kickEmbed = new MessageEmbed()
                .setTitle(config['main_config'].servername)
                .setDescription(`${member.user.tag} Has Been Kicked for ${reason}`)
                .setColor('RED')
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            message.channel.send({ embeds: [kickEmbed] }).then((message) => {
                setTimeout(() => {
                    message.delete().catch(e => { });
                }, 5000)
            })

            const kickChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
            if (member.kickable) {
                let x = new MessageEmbed()
                    .setTitle('Moderation Action | Member Kicked')
                    .addField('Member Kicked', `${member}`)
                    .addField('Kicked by', `${message.author}`)
                    .setThumbnail(config['logging_config'].logthumbnail)
                    .addField('Reason', `${reason}`)
                    .addField('Date', `${message.createdAt}`)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

                let b = new MessageEmbed()
                    .setTitle(`You Have Been Kicked From ${config['main_config'].servername}`)
                    .addField('Member Kicked', `${member}`)
                    .addField('Kicked by', `${message.author}`)
                    .addField('Reason', `${reason}`)
                    .setThumbnail(config['logging_config'].logthumbnail)
                    .addField('Date', `${message.createdAt}`)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    .setColor(config['main_config'].colorhex)
                if (config['logging_config'].enabled) {
                    kickChannel.send({ embeds: [x] })
                }
                await member.send({ embeds: [b] })
                await member.kick(reason);
                await con.query(`SELECT * FROM users WHERE userId='${member.id}'`, async (err, row) => {
                    if (err) throw err;
                    await con.query(`UPDATE users SET kicks = kicks + 1 WHERE userid='${member.id}'`, async (err, row) => { });
                });

            }
            message.delete();
        }
    }
}