const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'say',
    description: "Embed Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
        message.channel.send(args.join(" ")).then((message) => {
            setTimeout(() => {
                message.delete().catch(e => {});
            }, 60000)})
        message.delete();
        }
    }
}
