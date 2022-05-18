const { MessageButton, MessageActionRow, Message, MessageEmbed } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')

module.exports = {
    name: 'leave',
    description: "Sumons the bot into the channel",
    async execute(message, args, cmd, client, Spicey, config, con) {
        if (message.member.roles.cache.has(config['role_config'].supportteanrole)) {
            client.distube.voices.leave(message)
        }
        message.delete()
    }
}