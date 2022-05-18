const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'purge',
    description: "Purge Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].staff
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            if (!args[0]) return message.reply("please specify a amount of messages to delete!");
            if (isNaN(args[0])) return message.reply("please enter a number");

            if (args[0] > 100) return message.reply("you can not delete more than 100 messages at a time");
            if (args[0] < 1) return message.reply("you can not delete less than one message");

            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);

                const purgeEmbed = new MessageEmbed()
                    .setTitle(config['main_config'].servername)
                    .setDescription(`I have Successfully Deleted **${args[0]}** Messages In ${message.channel} 🗑️`)
                    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
                    .setColor(config['main_config'].colorhex)

                message.channel.send({ embeds: [purgeEmbed] }).then((message) => {
                    setTimeout(() => {
                        message.delete().catch(e => { });
                    }, 5000)
                })
            });
        }
    }
}