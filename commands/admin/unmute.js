const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'unmute',
    description: "This unmutes a member",
    async execute(message, args, cmd, client, Spicey, config) {
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

                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                const unmuteE = new MessageEmbed()
                    .setDescription(`<@${memberTarget.user.id}> has been unmuted`)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
                message.channel.send({ embeds: [unmuteE] })
            } else {
                message.channel.send('Cant find that member!').then(msg => msg.delete({ timeout: 10000 }))
                message.delete();
            }
        }
    }
}