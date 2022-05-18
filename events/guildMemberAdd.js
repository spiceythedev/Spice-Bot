const { MessageEmbed, MessageAttachment } = require('discord.js')
const ms = require('ms')
const config = require('../config.js')
const chalk = require('chalk')
module.exports = async (Spicey, client, con, member) => {


    await con.query(`SELECT * FROM users WHERE userId = '${member.id}'`, async (err, row) => {
        if (err) throw err;

        if (row.length < 1) {
            con.query(`INSERT INTO users (userId, warns, bans, kicks, mutes) VALUES ('${member.id}', 0, 0, 0, 0)`, async (err, row) => {
                if (err) throw err;
            })
        }
    })


    if (config['userjoin_config'].enabled) {
        try {
            const Canvas = require("discord-canvas")
            const joinLogChanel = client.channels.cache.get(config['userjoin_config'].welcomechannel)
            const image = await new Canvas.Welcome()
                .setUsername(`${member.user.username}`)
                .setDiscriminator(`${member.user.discriminator}`)
                .setMemberCount(`${member.guild.memberCount}`)
                .setGuildName(config['main_config'].servername)
                .setAvatar(`${member.user.displayAvatarURL({ format: 'png' })}`)
                .setColor("border", "#34068A")
                .setColor("username-box", "#68048a")
                .setColor("discriminator-box", "#68048a")
                .setColor("message-box", "#68048a")
                .setColor("title", "#68048a")
                .setColor("avatar", "#550dd1")
                .setBackground(config['userjoin_config'].welcomeimage)
                .toAttachment();

            const attachment = new MessageAttachment(image.toBuffer(), "welcome-image.png");
            joinLogChanel.send({ content: `<@${member.user.id}> (${member.user.tag}) has joined the server`, files: [attachment] });
        } catch (err) {
        }
    }
    if (config['auto_roles_config'].enabled) {
        try {
            const vrole = member.guild.roles.cache.get(config['auto_roles_config'].autoroleid)
            await member.roles.add(vrole)
        } catch (err) {
            console.log(chalk.redBright(`[ERROR]:`) + `${err}`)
        }
    }
    if (config['alt_config'].enabled) {
        try {
            const alttime = ms(config['alt_config'].alttime);
            const createdAt = new Date(member.user.createdAt).getTime();
            const difference = Date.now() - createdAt;
            if (difference < alttime) {
                const alte = new MessageEmbed()
                    .setTitle(`${config['main_config'].servername}`)
                    .setDescription(`You Have Been Detected As An Alt Account with in ${config['main_config'].servername}`)
                    .setColor(`${config['main_config'].colorhex}`)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                await member.send({ embeds: [alte] })

                const al = new MessageEmbed()
                    .setTitle(`${config['main_config'].servername}`)
                    .setDescription(`${member} has been detected as an alt account and has been kicked`)
                    .setColor(`${config['main_config'].colorhex}`)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                const loge = client.channels.cache.get(config['logging_config'].logs)
                loge.send({ embeds: [al] })
                member.kick('Alt Account')
            }
        } catch (err) {
        }
        if (config['verification_config'].enabled) {
            try {
                const joinLogChanel = client.channels.cache.get(config['userjoin_config'].welcomechannel)
                const verE = new MessageEmbed()
                    .setTitle(`${config['main_config'].servername}'s Verification`)
                    .setDescription('In Order To Talk With Others In This Server Please Head to the verification channel and press the verify button')
                    .setColor(config['main_config'].colorhex)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                await member.send({ embeds: [verE] })
            } catch (err) {
            }
            if (config['status_config'].enabled) {
                try {
                    client.channels.cache.get(config['membercount_config'].membercountchannel).setName(`Members: ${member.guild.memberCount}`)
                } catch (err) {
                    console.log(chalk.redBright(`[ERROR]:`) + `${err}`)
                }
            }
        }
    }
}