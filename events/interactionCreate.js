const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js')
const fs = require('fs')
const config = require('../config.js')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const chalk = require('chalk');
const { channel } = require('diagnostics_channel');
const dom = new JSDOM();
const document = dom.window.document;
module.exports = async (Spicey, client, con, interaction) => {
    let message = interaction.message;
    let pages = [
        `**Bot Name:** ${client.user.tag} \n **Bot Prefix:** ${global.prefixes.get(interaction.guild.id)} \n **Bot Creator:** [Spicey#0001](https://spicedevelopment.com/discord) \n **Commands:** 49`,
        "`settings` sends the settings menu for your server \n `status` gets the status of the bot \n `leave` makes the bot leave from the vc its currently in \n `summon` summons the bot to your current vc \n `warn` warns the specefied user for the specefied reason \n `slowmode` enables slowmode in the specefied channel for the specefied amount of time \n `say` makes the bot say a message in a non embed form \n `restart` restarts the bot \n `reactionroles` sends out a reaction roles panel in the channel the command is ran in \n `lock` locks the server if you do <lock true> and unlocks when you do <lock false> \n `addrole` adds the specefied role the the specefied user ex. addrole **<user @>** role name \n `ban` bans the specefied user ex. ban **<user @>** reason \n `avatar` gets specefied users avatar ex. avatar **<user @>** \n `dm` dms specefied user ex. dm **<user @>** message \n `sayem` sends an embed message ex. sayem message \n `kick` kicks specefied user ex. kick **<user @>** reason \n `mute` mutes specefied user can be timed or perma ex. mute **<user @>** 10s \n `poll` makes a poll that people can react to ex. poll poll message \n `purge` clears messages within channel ex. purge 10 \n `removerole` removes role from specefied user ex. removerole **<user @>** role \n `unban` unbans user from the guild ex. unban **<user id>** \n `unmute` unmutes user ex. unmute **<user @>** \n `userinfo` gets specefied users info ex. userinfo **<user @>**",
        "`meme` gets a meme from a subreddit \n `xp` gets your xp or specefied users xp \n `level` gets specefied users level \n `website` sends the servers specefied website link \n `tos` sends your tos \n `serverinfo` gets the info of the server the bot is in \n `invite` gets the servers invite \n `dice` rolls a number between 1 and 100 \n `creator` shows who made the bot \n `help` opens the help menu \n `8ball` responds to a question a user sends with different oppurtunities of messages \n `ping` gets the ping of the bot \n `suggest` sends out a suggestion with an embed ex. suggest <suggestion> \n `version` gets the version of the bot \n `verify` verifys a user within the guild",
        "`ticketintro` sends an intro embed to the ticket your in \n `ticketclaim` claims the current ticket and sets the topic to <claimed by claimer> \n `ticket` makes a ticket panel in the specefied channel in the config ticket <ticket message> \n `add` adds specefied user to ticket ex. add <userID> \n `remove` removes specified user from ticket ex. remove <userID or user@> \n All Of The rest of the ticket commands are done through buttons.",
        "`play` this will allow you to play a song ex: play <song name> \n `skip` this will allow you to skip a song in the queue \n `queue` this will show the current queue of songs \n `loop` this will either loop your current song or current queue ex: loop <song> or <queue> \n `pause` this will pause the current song playing \n `resume` this will resume the current song paused \n `stop` this will stop the current song playing and remove it from the queue \n `volume` this will set the volume of the song playing ex: volume <1-100>",
        "`Spicey#0001:` Main Code \n `Hyperz#0001:` Inspiration for some command layouts"
    ];

    try {
        if (interaction.customId === 'verify') {
            interaction.reply({ content: 'You Have Been Verified', ephemeral: true })
            const vrole = (global.verifiedId.get(interaction.guild.id))
            const member = interaction.member
            await member.roles.add(vrole)
        }


        if (interaction.customId === 'ticketcreate') {
            const { Modal, TextInputComponent, showModal } = require('discord-modals')

            const modal = new Modal()
                .setCustomId('ticketC')
                .setTitle('Create A Ticket')
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('textinput-ticketC')
                        .setLabel('Ticket Reaon')
                        .setStyle('LONG')
                        .setMinLength(4)
                        .setMaxLength(40)
                        .setPlaceholder('Reason')
                        .setRequired(true)
                );

            showModal(modal, {
                client: client,
                interaction: interaction
            })
        }
        if (interaction.customId === 'ticketarchive') {
            const per = config['role_config'].ticketmanager
            if (!interaction.member.roles.cache.some(r => per.includes(r.id))) {
                interaction.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
            } else if (interaction.member.roles.cache.some(r => per.includes(r.id))) {
                var delEmbed = new MessageEmbed()
                    .setDescription(`<@${interaction.user.id}> This Ticket Will Be Deleted and Archived In 5 Seconds`)
                    .setColor(config['main_config'].colorhex)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                interaction.reply({ embeds: [delEmbed] })


                let messageCollection = new Spicey.Collection();
                let channelMessages = await message.channel.messages.fetch({ limit: 100 }).catch(err => console.log(`HTML Transcript Error: `, err));
                messageCollection = messageCollection.concat(channelMessages);
                let msgs = Array.from(messageCollection.values()).reverse()
                const tras = new MessageEmbed()
                    .setTitle('Ticket Closed')
                    .setThumbnail(`${config['ticket_config'].ticketimage}`)
                    .addField(`Ticket ID`, interaction.channel.name)
                    .addField('Closing Staff Member', `<@${interaction.member.id}>`)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    .setColor(config['main_config'].colorhex)
                const archive = client.channels.cache.get(config['ticket_config'].ticketarchivechannel)
                archive.send({ embeds: [tras] })
                fs.readFile('./src/utils/template.html', 'utf8', async (err, spice) => {
                    if (err) {
                        console.log(`HTML Transcript Error: `, err)
                    }
                    let data = spice.toString()
                    await fs.writeFile(`./src/utils/${interaction.channel.name}.html`, data, (err) => {
                    });
                    let guildElement = document.createElement('div');
                    let guildText = document.createTextNode(message.guild.name);
                    guildElement.appendChild(guildText);
                    await fs.appendFile(`./src/utils/${interaction.channel.name}.html`, guildElement.outerHTML, (err) => {
                        if (err) {
                            console.log(`HTML Transcript Error: `, err)
                        }
                    })
                    msgs.forEach(async msg => {
                        if (msg.embeds[0]) {
                            msg.content = msg.embeds[0].description
                        }
                        let parentContainer = document.createElement("div");
                        parentContainer.className = "parent-container";
                        let avatarDiv = document.createElement("div");
                        avatarDiv.className = "avatar-container";
                        let img = document.createElement('img');
                        img.setAttribute('src', msg.author.displayAvatarURL());
                        img.className = "avatar";
                        avatarDiv.appendChild(img);
                        parentContainer.appendChild(avatarDiv);

                        let messageContainer = document.createElement('div');
                        messageContainer.className = "message-container";
                        let nameElement = document.createElement("span");
                        let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toDateString() + " " + msg.createdAt.toLocaleTimeString() + " EST");
                        nameElement.appendChild(name);
                        messageContainer.append(nameElement);
                        if (msg.content.startsWith("```")) {
                            let m = msg.content.replace(/```/g, "");
                            let codeNode = document.createElement("code");
                            let textNode = document.createTextNode(m);
                            codeNode.appendChild(textNode);
                            messageContainer.appendChild(codeNode);
                        }
                        else {
                            let msgNode = document.createElement('span');
                            let textNode = document.createTextNode(msg.content);
                            msgNode.append(textNode);
                            messageContainer.appendChild(msgNode);
                        }
                        parentContainer.appendChild(messageContainer);
                        await fs.appendFile(`./src/utils/${interaction.channel.name}.html`, parentContainer.outerHTML, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        });
                    });
                    setTimeout(async () => {

                        const archive = client.channels.cache.get(config['ticket_config'].ticketarchivechannel)
                        archive.send({ files: [`./src/utils/${interaction.channel.name}.html`] }).catch(e => {
                            console.log(e)
                        });
                    }, 2000)
                });

                setTimeout(() => {
                    interaction.channel.delete()
                }, 5000);
            }
        };

        if (interaction.customId === 'ticketdelete') {
            const per = config['role_config'].ticketmanager
            if (!interaction.member.roles.cache.some(r => per.includes(r.id))) {
                interaction.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
            } else if (interaction.member.roles.cache.some(r => per.includes(r.id))) {
                const claimD = new Spicey.MessageEmbed()
                    .setTitle(config['main_config'].servername)
                    .setDescription(`This ticket will be deleted in 5 seconds`)
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    .setColor(config['main_config'].colorhex)
                interaction.reply({ embeds: [claimD] })

                setTimeout(() => {
                    interaction.channel.delete()
                }, 5000)
            }
        }

        if (interaction.customId === 'apply') {


            let permissionOverwriteArray = [{
                id: interaction.member.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            },
            {
                id: interaction.guild.id,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            },
            ]
            config['role_config'].manager.forEach(role => {
                let fat = interaction.guild.roles.cache.get(role);
                if (!fat) {
                    console.log(`${role} is not in the server`)
                } else {
                    let tempArray = {
                        id: role,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }
                    permissionOverwriteArray.push(tempArray);
                }
            })
            const dachannel = await interaction.guild.channels.create(`application-${interaction.user.username}`, {
                type: 'text',
                parent: config['ticket_config'].ticketcategory,
                permissionOverwrites: permissionOverwriteArray
            });

            const inTE = new MessageEmbed()
                .setTitle(config['main_config'].servername)
                .setDescription(`Application Started in <#${dachannel.id}>`)
                .setColor(config['main_config'].colorhex)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            await interaction.reply({ embeds: [inTE], ephemeral: true })



            const questions = config['application_config'].questions


            const filter = i => i.member == interaction.member;

            const rows93 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('app-close')
                        .setLabel('Close')
                        .setStyle('DANGER')
                )

            const dmEmbed = new MessageEmbed()
                .setTitle(config['main_config'].servername)
                .setDescription(`${config['application_config'].startmessage}`)
                .setColor(`${config['main_config'].colorhex}`)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
            const dmChannel = await dachannel.send({ embeds: [dmEmbed], components: [rows93] })
            const collector = dmChannel.channel.createMessageCollector({ filter })
            let i = 0
            const res = []
            await dmChannel.channel.send(questions[0])
            collector.on('collect', async (msg) => {
                if (questions.length == i) return collector.stop('DONE')
                const answer = msg.content
                res.push({ question: questions[i], answer })
                i++
                if (questions.length == i) return collector.stop('DONE')
                else {
                    await dmChannel.channel.send(questions[i])
                }
            })
            collector.on('end', async (collected, reason) => {
                if (reason == 'DONE') {
                    const chan = client.channels.cache.get(`${config['application_config'].applicationslogchannel}`)
                    const appEmbed = new MessageEmbed()
                        .setTitle(`${interaction.user.tag}'s Application`)
                        .setDescription(`${res.map(d => `**${d.question}:**\n${d.answer}`).join('\n\n')}`)
                        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    await chan.send({ content: `${interaction.member} (${interaction.user.tag}) submitted an application`, embeds: [appEmbed] })
                }
            })
        }

        if (interaction.customId === 'app-close') {
            const claimD = new Spicey.MessageEmbed()
                .setTitle(config['main_config'].servername)
                .setDescription(`This application will be deleted in 5 seconds`)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                .setColor(config['main_config'].colorhex)
            interaction.reply({ embeds: [claimD] })

            setTimeout(() => {
                interaction.channel.delete()
            }, 5000)
        }

        if (interaction.isSelectMenu()) {
            if (interaction.values == 'role1') {
                interaction.reply({ content: 'Role Added', ephemeral: true })
                const role1 = interaction.guild.roles.cache.get(config['reaction_roles_config'].reactionrole1id)
                const member = interaction.member
                await member.roles.add(role1)
            }

            if (interaction.values == 'role1r') {
                interaction.reply({ content: 'Role Removed', ephemeral: true })
                const role1r = interaction.guild.roles.cache.get(config['reaction_roles_config'].reactionrole1id)
                const member = interaction.member
                await member.roles.remove(role1r)
            }


            if (interaction.values == 'role2') {
                interaction.reply({ content: 'Role Added', ephemeral: true })
                const role2 = interaction.guild.roles.cache.get(config['reaction_roles_config'].reactionrole2id)
                const member = interaction.member
                await member.roles.add(role2)
            }


            if (interaction.values == 'role2r') {
                interaction.reply({ content: 'Role Removed', ephemeral: true })
                const role2r = interaction.guild.roles.cache.get(config['reaction_roles_config'].reactionrole2id)
                const member = interaction.member
                await member.roles.remove(role2r)
            }
        }

        if (interaction.customId === 'next') {
            let curr = Number(interaction.message.embeds[0].footer.text) + 1;
            if (!pages[curr]) curr = 0;
            let buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Back')
                        .setCustomId('back')
                        .setStyle('SECONDARY')
                )
                .addComponents(
                    new MessageButton()
                        .setLabel('Next')
                        .setCustomId('next')
                        .setStyle('SECONDARY')
                )
            let embed = new MessageEmbed()
                .setColor(`${config['main_config'].colorhex}`)
                .setTitle('Spice Bot Help Menu')
                .setDescription(pages[curr])
                .setThumbnail(`${config['logging_config'].logthumbnail}`)
                .setFooter({ text: `${curr}` })
            interaction.update({ embeds: [embed], components: [buttons] })
        } else if (interaction.customId === 'back') {
            let curr = Number(interaction.message.embeds[0].footer.text) - 1;
            if (!pages[curr]) curr = 0;
            let buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Back')
                        .setCustomId('back')
                        .setStyle('SECONDARY')
                )
                .addComponents(
                    new MessageButton()
                        .setLabel('Next')
                        .setCustomId('next')
                        .setStyle('SECONDARY')
                )
            let embed = new MessageEmbed()
                .setColor(`${config['main_config'].colorhex}`)
                .setTitle('Spice Bot Help Menu')
                .setDescription(pages[curr])
                .setFooter({ text: `${curr}` })
            interaction.update({ embeds: [embed], components: [buttons] })
        }
        if (interaction.customId === 'locktrue') {
            const per = config['role_config'].manager
            if (!interaction.member.roles.cache.some(r => per.includes(r.id))) {
                interaction.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
            } else if (interaction.member.roles.cache.some(r => per.includes(r.id))) {
                const role = message.guild.roles.cache.find(r => r.id === config['role_config'].memberrole);
                message.channel.permissionOverwrites.edit(role, {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false,
                    READ_MESSAGE_HISTORY: false,
                });
                const trueEmbed = new MessageEmbed()
                    .setTitle(config['main_config'].servername)
                    .setDescription('Server Is Locked 🔐')
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    .setColor(config['main_config'].colorhex)
                interaction.reply({ embeds: [trueEmbed], ephemeral: true })
            }
        }
        if (interaction.customId === 'lockfalse') {
            const per = config['role_config'].manager
            if (!interaction.member.roles.cache.some(r => per.includes(r.id))) {
                interaction.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
            } else if (interaction.member.roles.cache.some(r => per.includes(r.id))) {
                const role = message.guild.roles.cache.find(r => r.id === config['role_config'].memberrole);
                message.channel.permissionOverwrites.edit(role, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    READ_MESSAGE_HISTORY: true,
                });
                const falseEmbed = new MessageEmbed()
                    .setTitle(config['main_config'].servername)
                    .setDescription('Server Is Unlocked 🔐')
                    .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
                    .setColor(config['main_config'].colorhex)
                interaction.reply({ embeds: [falseEmbed], ephemeral: true })
            }
        }
        if (interaction.customId === 'resume') {
            const member = interaction.member
            const VoiceChannel = member.voice.channel

            if (!VoiceChannel) return interaction.channel.send('You must be in a voice chat to run this command')
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
            queue.resume()
            interaction.reply({ content: 'Song Has Been Resumed', ephemeral: true })
        }
        if (interaction.customId === 'pause') {
            const member = interaction.member
            const VoiceChannel = member.voice.channel

            if (!VoiceChannel) return interaction.channel.send('You must be in a voice chat to run this command')
            const queue = client.distube.getQueue(message)
            queue.pause(VoiceChannel)
            interaction.reply({ content: 'Song Has Been Paused', ephemeral: true })
        }
        if (interaction.customId === 'skip') {
            const member = interaction.member
            const VoiceChannel = member.voice.channel

            if (!VoiceChannel) return interaction.channel.send('You must be in a voice chat to run this command')
            const queue = client.distube.getQueue(message)
            await queue.skip(VoiceChannel)
            interaction.reply({ content: 'Song Has Been Skipped', ephemeral: true })
        }
        if (interaction.customId === 'loops') {
            const queue = client.distube.getQueue(interaction)
            if (!queue) return message.channel.send(`There is nothing playing!`)
            let mode = 1
            mode = queue.setRepeatMode(mode)
            mode = mode ? (mode === 1 ? 'Loop Song' : 'Loop Queue') : 'Off'

            const repeatE = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Set loop mode to \`${mode}\``)
            interaction.reply({ embeds: [repeatE], ephemeral: true })
        }
        if (interaction.customId === 'loopq') {
            const queue = client.distube.getQueue(interaction)
            if (!queue) return message.channel.send(`There is nothing playing!`)
            let mode = 2

            mode = queue.setRepeatMode(mode)
            mode = mode ? (mode === 2 ? 'Loop Queue' : 'Loop Song') : 'Off'

            const repeatE = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Set loop mode to \`${mode}\``)
            interaction.reply({ embeds: [repeatE], ephemeral: true })
        }
        if (interaction.customId === 'queue') {
            const member = message.member
            const VoiceChannel = member.voice.channel

            if (!VoiceChannel) return interaction.channel.send('You must be in a voice chat to run this command')
            const queue = client.distube.getQueue(message)
            if (!queue) return interaction.channel.send('There is currently no queue')

            const queueembed = new MessageEmbed()
                .setColor(`${config['main_config'].colorhex}`)
                .setDescription(`${queue.songs.map(
                    (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                )}`)
            return interaction.reply({ embeds: [queueembed], ephemeral: true })
        }
    } catch (err) {
        console.log(chalk.redBright(`[ERROR]:`) + `${err}`)
    }
}