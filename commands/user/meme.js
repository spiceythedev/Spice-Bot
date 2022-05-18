const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'meme',
    description: "Dice Command",
    async execute(message, args, cmd, client, Spicey, config) {

        const fatbob = config['misc_config'].subreddit
        const https = require('https');
        const url = `https://www.reddit.com/r/${fatbob}/hot/.json?limit=100`

        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                if (index.post_hint !== 'image') {

                    const textembed = new MessageEmbed()
                        .setTitle(`${config['main_config'].servername}`)
                        .setColor(`${config['main_config'].colorhex}`)
                        .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

                    message.channel.send({ embeds: [textembed] })
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')

                if (index.post_hint !== 'image') {
                    const textembed = new MessageEmbed()
                    .setTitle(`${config['main_config'].servername}`)
                    .setColor(`${config['main_config'].colorhex}`)
                    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})

                    message.channel.send({ embeds: [textembed] })
                }
                const imageembed = new MessageEmbed()
                .setTitle(`${config['main_config'].servername}`)
                    .setImage(image)
                    .setColor(`${config['main_config'].colorhex}`)
                    .setFooter({text: `${config['main_config'].copyright} | Made By Spicey#0001`})
                message.channel.send({ embeds: [imageembed] })
            }).on('error', function (e) {
                console.log('Got an error: ', e)
            })
        })
        message.delete()
    }
}