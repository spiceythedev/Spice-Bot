const { MessageButton, MessageActionRow, Message, MessageEmbed } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')

module.exports = {
    name: 'summon',
    description: "Sumons the bot into the channel",
    async execute(message, args, cmd, client, Spicey, config, con) {
        if (message.member.roles.cache.has(config['role_config'].supportteanrole)) {
            const channel = message.member.voice.channel
            let connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
        }
        message.delete()
    }
}