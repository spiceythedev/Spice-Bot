const chalk = require('chalk')
const { MessageAttachment } = require('discord.js')

module.exports = async (Spicey, client, con, member) => {
    const config = require('../config.js')
    if (config['userleave_config'].enabled) {
        try {
            const Canvas = require("discord-canvas")
            const joinLogChanel = client.channels.cache.get(config['userleave_config'].leavechannel)
            const image = await new Canvas.Goodbye()
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

            const attachment = new MessageAttachment(image.toBuffer(), "leave-image.png");
            joinLogChanel.send({ files: [attachment] });
        } catch (err) {
            console.log(chalk.redBright(`[ERROR]:`) + `${err}`)
        }
    }
    if (config['status_config'].enabled) {
        try {
            client.channels.cache.get(config['membercount_config'].membercountchannel).setName(`Members: ${member.guild.memberCount}`)
        } catch (err) {
            console.log(chalk.redBright(`[ERROR]:`) + `${err}`)
        }
    }
}