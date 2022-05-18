const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'embedbuilder',
    description: "Role Command",
    async execute(message, args, cmd, client, Spicey, config) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const filter = m => m.author.id === message.author.id;
            let color; let nocolor = false;
            let thumbnail; let nothumbnail = false;
            let description; let nodescription = false;
            let title; let notitle = false;
            let image; let noimage = false;
            let channel;
            let qu = new MessageEmbed()
                .setColor(config['main_config'].colorhex)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            //CHANNEL
            message.channel.send({ embeds: [qu.setDescription("Please define a channel to put the embed in")] }).then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] }).then(collected => {
                    if (collected.first().content.toLowerCase() === "cancel")
                        return message.channel.send({ content: `**Embed Builder Cancelled!**` })
                    else if (collected.first().content.toLowerCase() === "here")
                        channel = message.channel;
                    else {
                        try {
                            if (collected.first().mentions.channels.first()) {
                                channel = collected.first().mentions.channels.first()
                            }
                        } catch {
                            if (channel == undefined) return message.channel.send({ content: `Embed process cancelled, I was unable to find the provided channel.` });
                        }
                    }

                    //COLOR
                    message.channel.send({ embeds: [qu.setDescription("Please define a **color hex** \n type **na** to skip this step")] }).then(message => {
                        message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] }).then(collected => {
                            if (collected.first().content.toLowerCase() === "cancel")
                                return message.reply("CANCELLED THE EMBED BUILDER!")
                            else if (collected.first().content.toLowerCase() === "na")
                                nocolor = true;
                            else if (collected.first().content.toLowerCase() === "standard")
                                color = config.main_config.colorhex;
                            else if (!collected.first().content.startsWith("#") && collected.first().content.length !== 7)
                                return message.reply("YOUR COLOR IS NOT VALID! Embed builder cancelled,  it must contain 7 letters! (6 HEx code, 1 #) Example: `#cf2e3d`")
                            else
                                color = collected.first().content;

                            //TITLE
                            message.channel.send({ embeds: [qu.setDescription("Please define a **title** \n type **na** to skip this step")] }).then(() => {
                                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] }).then(collected => {
                                    if (collected.first().content.toLowerCase() === "cancel")
                                        return message.reply("CANCELLED THE EMBED BUILDER!")
                                    else if (collected.first().content.toLowerCase() === "na")
                                        notitle = true;
                                    else if (collected.first().content.length > 256)
                                        return message.reply("YOUR TITLE IS TOO LONG, maximum lenght is 256! CANCELLED THE EMBED BUILDER")
                                    else
                                        title = collected.first().content;

                                    //DESCRIPTION
                                    message.channel.send({ embeds: [qu.setDescription("Please define a **description** \n type **na** to skip this step")] }).then(() => {
                                        message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] }).then(collected => {
                                            if (collected.first().content.toLowerCase() === "cancel")
                                                return message.reply("CANCELLED THE EMBED BUILDER!")
                                            else if (collected.first().content.toLowerCase() === "na")
                                                nodescription = true;
                                            else if (collected.first().content.length > 2048)
                                                return message.reply("YOUR DESCRIPTION IS TOO LONG, maximum lenght is 2048!")
                                            else
                                                description = collected.first().content;

                                            //THUMBNAIL
                                            message.channel.send({ embeds: [qu.setDescription("Please define a **thumbnail** \n type **na** to skip this step")] }).then(() => {
                                                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] }).then(collected => {
                                                    let url = "";
                                                    if (collected.first().content.toLowerCase() === "cancel")
                                                        return message.reply("CANCELLED THE EMBED BUILDER!")
                                                    else if (collected.first().content.toLowerCase() === "na")
                                                        nothumbnail = true;
                                                    else if (collected.first().attachments.size > 0) {
                                                        if (collected.first().attachments.every(attachIsImage))
                                                            thumbnail = url;
                                                        else {
                                                            return message.reply("COULD NOT USE YOUR IMAGE!")
                                                        }
                                                    }
                                                    else if (collected.first().content.includes("https") || collected.first().content.includes("http"))
                                                        thumbnail = collected.first().content;
                                                    else {
                                                        return message.reply("Could not use your thumbnail! EMBED BUILDER CANCELLED")
                                                    }
                                                    function attachIsImage(messageAttach) {
                                                        url = messageAttach.url;
                                                        return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                                                            url.indexOf("gif", url.length - "gif".length /*or 3*/) !== -1 ||
                                                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                                                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                                                    }

                                                    //IMAGE
                                                    message.channel.send({ embeds: [qu.setDescription("Please define a **image** \n type **na** to skip this step")] }).then(() => {
                                                        message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] }).then(collected => {
                                                            let url = "";
                                                            if (collected.first().content.toLowerCase() === "cancel")
                                                                return message.reply("CANCELLED THE EMBED BUILDER!")
                                                            else if (collected.first().content.toLowerCase() === "na") {
                                                                noimage = true;
                                                                let embed = new MessageEmbed()
                                                                if (!notitle) embed.setTitle(title)
                                                                if (!nodescription) embed.setDescription(description)
                                                                if (!nocolor) embed.setColor(color)
                                                                if (!nothumbnail) embed.setThumbnail(thumbnail)
                                                                if (!noimage) embed.setImage(image)
                                                                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

                                                                channel.send({ embeds: [embed] }).then(message => {
                                                                    try {
                                                                        if (message.channel.type === "news")
                                                                            message.crosspost()
                                                                    } catch (error) {
                                                                        console.log(error.stack.toString().red)
                                                                    }
                                                                })
                                                            }
                                                            else if (collected.first().attachments.size > 0) {
                                                                if (collected.first().attachments.every(attachIsImage))
                                                                    image = url;
                                                                else {
                                                                    return message.reply("COULD NOT USE YOUR IMAGE!")
                                                                }
                                                                let embed = new MessageEmbed()
                                                                if (!notitle) embed.setTitle(title)
                                                                if (!nodescription) embed.setDescription(description)
                                                                if (!nocolor) embed.setColor(color)
                                                                if (!nothumbnail) embed.setThumbnail(thumbnail)
                                                                if (!noimage) embed.setImage(image)
                                                                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

                                                                channel.send({ embeds: [embed] }).then(message => {
                                                                    const doneE = new MessageEmbed()
                                                                        .setDescription('Embed Has Been Built')
                                                                    message.chanel.send({ embeds: [doneE] })
                                                                    try {
                                                                        if (message.channel.type === "news")
                                                                            message.crosspost()
                                                                    } catch (error) {
                                                                        console.log(error.stack.toString().red)
                                                                    }
                                                                })
                                                            }
                                                            else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                                                                image = collected.first().content;
                                                                let embed = new MessageEmbed()
                                                                if (!notitle) embed.setTitle(title)
                                                                if (!nodescription) embed.setDescription(description)
                                                                if (!nocolor) embed.setColor(color)
                                                                if (!nothumbnail) embed.setThumbnail(thumbnail)
                                                                if (!noimage) embed.setImage(image)
                                                                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

                                                                message.channel.send({ embeds: [embed] }).then(message => {
                                                                    const doneE = new MessageEmbed()
                                                                        .setDescription('Embed Has Been Built')
                                                                    message.chanel.send({ embeds: [doneE] })
                                                                    try {
                                                                        if (message.channel.type === "news")
                                                                            message.crosspost()
                                                                    } catch (error) {
                                                                        console.log(error.stack.toString().red)
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                return message.reply("Could not use your IMAGE! EMBED BUILDER CANCELLED")
                                                            }
                                                            function attachIsImage(messageAttach) {
                                                                url = messageAttach.url;
                                                                return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                                                                    url.indexOf("gif", url.length - "gif".length /*or 3*/) !== -1 ||
                                                                    url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                                                                    url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                                                            }
                                                        })
                                                            .catch(error => {
                                                                console.log(error)
                                                                return message.reply("EMBED CANCELLED! You didn't answer in time!");
                                                            });
                                                    })
                                                })
                                                    .catch(error => {
                                                        console.log(error)
                                                        return message.reply("EMBED CANCELLED! You didn't answer in time!");
                                                    });
                                            })
                                        })
                                            .catch(error => {
                                                console.log(error)
                                                return message.reply("EMBED CANCELLED! You didn't answer in time!");
                                            });
                                    })
                                })
                                    .catch(error => {
                                        console.log(error)
                                        return message.reply("EMBED CANCELLED! You didn't answer in time!");
                                    });
                            })
                        })
                            .catch(error => {
                                console.log(error)
                                return message.reply("EMBED CANCELLED! You didn't answer in time!");
                            });
                    })
                })
                    .catch(error => {
                        console.log(error)
                        return message.reply("EMBED CANCELLED! You didn't answer in time!");
                    });
            })
        }
    }
}