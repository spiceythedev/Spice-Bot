const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'deny',
    description: "Dice Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
        let user = message.mentions.users.first();
        if (!user) return message.channel.send('Please specify a user to accept');


        let dm = args.slice(1).join(" ");
        if (!dm) return message.channel.send("Please specify a message");

        const dmEmbed = new MessageEmbed()
            .setTitle(`${config['main_config'].servername}`)
            .setDescription(args.slice(1).join(" "))
            .setColor(config['main_config'].colorhex)
            .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

            await user.send({ embeds: [dmEmbed] })
        }
        message.delete();
    }
}