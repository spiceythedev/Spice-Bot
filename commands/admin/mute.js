const { MessageEmbed, DiscordAPIError } = require('discord.js');
const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "This mutes a member",
    async execute(message, args, cmd, client, Spicey, config, con) {
        let reason = args.slice(1).join(" ");
        const per = config['role_config'].staff
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const target = message.mentions.users.first();
            if (target) {
                const permms = config['role_config'].muted
                let mainRole = message.guild.roles.cache.find(role => role.id === global.memberId.get(message.guild.id));
                let muteRole = message.guild.roles.cache.find(r => permms.includes(r.id));

                let memberTarget = message.guild.members.cache.get(target.id);

                if (!args[2]) {
                    memberTarget.roles.remove(mainRole.id);
                    memberTarget.roles.add(muteRole.id);
                    const muteE = new MessageEmbed()
                        .setDescription(`<@${memberTarget.user.id}> has been muted ${reason}`)
                        .setColor(config['main_config'].colorhex)
                        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    message.channel.send({ embeds: [muteE] })
                    let x = new MessageEmbed()
                        .setTitle('Moderation Action | Member Muted')
                        .addField('Member Muted', `${target}`)
                        .addField('Muted by', `${message.author}`)
                        .setThumbnail(config['logging_config'].logthumbnail)
                        .addField('Reason', `${reason}`)
                        .addField('Date', `${message.createdAt}`)
                        .setColor(config['main_config'].colorhex)
                        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    const logChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
                    logChannel.send({ embeds: [x] })
                } else if (args[2]) {
                    memberTarget.roles.remove(mainRole.id);
                    memberTarget.roles.add(muteRole.id);
                    const muteE = new MessageEmbed()
                        .setDescription(`<@${memberTarget.user.id}> has been muted for ${args[1]} for ${ms(ms(args[2]))}`)
                        .setColor(config['main_config'].colorhex)
                        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    message.channel.send({ embeds: [muteE] })
                    let x = new MessageEmbed()
                        .setTitle('Moderation Action | Member Muted')
                        .addField('Member Muted', `${target}`)
                        .addField('Muted by', `${message.author}`)
                        .setThumbnail(config['logging_config'].logthumbnail)
                        .addField('Reason', `${args[1]}`)
                        .addField('Lenght', `${args[2]}`)
                        .addField('Date', `${message.createdAt}`)
                        .setColor(config['main_config'].colorhex)
                        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    const logChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
                    if (config['logging_config'].enabled) {
                        logChannel.send({ embeds: [x] })
                    }
                    setTimeout(async function () {
                        memberTarget.roles.remove(muteRole.id);
                        memberTarget.roles.add(mainRole.id);
                    }, ms(args[2]));
                    await con.query(`SELECT * FROM users WHERE userId='${memberTarget}'`, async (err, row) => {
                        if (err) throw err;
                        await con.query(`UPDATE users SET mutes = mutes + 1 WHERE userid='${memberTarget}'`, async (err, row) => { });
                    });
                } else {
                    message.channel.send('Cant find that member!')
                }
                message.delete();
            }
        }
    }
}

