module.exports = {
    name: 'ascii',
    description: "ascii Command",
    async execute(message, args, cmd, client, Spicey, config) {
const axios = require('axios')
        let appname = args.join(" ")
        await axios.get(`https://luminabot.xyz/api/text/figlet?text=${appname}`)
            .then(async (res) => {
                if (message.author.bot) return;
                message.channel.send("```" + res.data + "```")
            })
    }
}