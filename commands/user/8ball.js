const { MessageEmbed } = require("discord.js");

module.exports = {
    name: '8ball',
    description: "Dice Command",
    async execute(message, args, cmd, client, Spicey, config) {
        if(!args[0]) return message.reply('Please ask a full question')

        const replies = [
            "It is Certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes definitely",
            "You may rely on it",

            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy, try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",

            "Dont count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful",
            ]

        const result = Math.floor((Math.random() * replies.length))
        const question  = args.slice().join(" ")

        const ballEm = new MessageEmbed()
        .setTitle(`🎱 ${message.author.tag}`)
        .addField("Question", question)
        .addField('Anwser', replies[result])
        .setColor(config['main_config'].colorhex)
        .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

        message.channel.send({ embeds: [ballEm] })
    }
}
