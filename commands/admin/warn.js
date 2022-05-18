const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'warn',
    description: "This mutes a member",
    async execute(message, args, cmd, client, Spicey, config, con) {
        const per = config['role_config'].staff
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const reason = args.slice(1).join(" ");
            const target = message.mentions.users.first();
            if (target) {
                let memberTarget = message.guild.members.cache.get(target.id);

                const muteE = new MessageEmbed()
                    .setDescription(`<@${memberTarget.user.id}> has been Warned`)
                    .addField('Warned For', `${reason}`)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                message.channel.send({ embeds: [muteE] })

                const c = new MessageEmbed()
                    .setTitle(`You Have Been Warned In ${config['main_config'].servername}`)
                    .addField('Member Warned', `${memberTarget}`)
                    .addField('Warned by', `${message.author}`)
                    .addField('Date', `${message.createdAt}`)
                    .addField('Reason', `${reason}`)
                    .setThumbnail(config['logging_config'].logthumbnail)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                await memberTarget.send({ embeds: [c] })

                const warnchannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
                const warnlog = new MessageEmbed()
                    .setTitle('Moderation Action | User Warned')
                    .addField('Member Warned', `${memberTarget}`)
                    .addField('Warned by', `${message.author}`)
                    .addField('Date', `${message.createdAt}`)
                    .addField('Reason', `${reason}`)
                    .setThumbnail(config['logging_config'].logthumbnail)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    .setColor(config['main_config'].colorhex)
                if (config['logging_config'].enabled) {
                    warnchannel.send({ embeds: [warnlog] })
                }
                await con.query(`SELECT * FROM users WHERE userId='${memberTarget}'`, async (err, row) => {
                    if (err) throw err;
                    await con.query(`UPDATE users SET warns = warns + 1 WHERE userid='${memberTarget}'`, async (err, row) => { });
                });
                message.delete();
            }
        }
    }
}
