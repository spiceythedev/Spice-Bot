const chalk = require('chalk')
const Spicey = require('discord.js');
const { Client } = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('../config.js')
const mysql = require('mysql');
const { DisTube } = require('distube')
const { readdirSync } = require('fs');
const { join } = require('path')

let useSQL = true;
let con;

class SDClient extends Client {
    constructor(options = {}) {
        super(options);
        this.commands = new Spicey.Collection();
        this.events = new Spicey.Collection();
        this.snipes = new Spicey.Collection
    };
};

const client = new SDClient({
    intents: ['GUILDS', 'GUILD_MESSAGES', "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"],
});


const discordModals = require('discord-modals')
discordModals(client);


client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    youtubeDL: false,
})

const init = async () => {

    if (useSQL) {
        try {
            const stuff = {
                connectionLimit: 10,
                queueLimit: 5000,
                host: config['mysql'].host,
                user: config['mysql'].user,
                password: config['mysql'].password,
                database: config['mysql'].database,
            }
            con = mysql.createPool(stuff)
        } catch (e) {
            client.utils.error(client, e)
            return process.exit(1);
        }
    }

    global.prefixes = new Map()
    global.channellogs = new Map()
    global.memberId = new Map()
    global.verifiedId = new Map()


    const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``


    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Resume')
                .setCustomId('resume')
                .setStyle('SECONDARY'),

            new MessageButton()
                .setLabel('Pause')
                .setCustomId('pause')
                .setStyle('SECONDARY'),

            new MessageButton()
                .setLabel('Skip')
                .setCustomId('skip')
                .setStyle('SECONDARY'),

            new MessageButton()
                .setLabel('Stop')
                .setCustomId('stop')
                .setStyle('SECONDARY'),

            new MessageButton()
                .setLabel('Queue')
                .setCustomId('queue')
                .setStyle('SECONDARY')
        )

    client.distube
        .on('playSong', async (queue, song) => {
            const playE = new MessageEmbed()
                .setAuthor('Playing Song', config.logging_config.logthumbnail)
                .setColor(`${config['main_config'].colorhex}`)
                .addFields(
                    { name: 'Song Name', value: `${song.name}`, inline: true },
                    { name: 'Song Duration', value: `${song.formattedDuration}`, inline: true },
                    { name: 'Requested By', value: `${song.user}`, inline: true },
                )
                .setImage(`${song.thumbnail}`)
            const playPage = await queue.textChannel.send({ embeds: [playE], components: [row] })

            const col = await playPage.createMessageComponentCollector({
                componentType: "BUTTON"
            })
            col.on("collect", async i => {
                if (i.customId === 'stop') {
                    const editRow = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('Song Stopped')
                                .setCustomId('toggled')
                                .setStyle('SECONDARY')
                                .setDisabled(true),

                            new MessageButton()
                                .setLabel(`Stopped By: ${i.user.tag}`)
                                .setCustomId('toggledby')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    const member = i.member
                    const VoiceChannel = member.voice.channel

                    if (!VoiceChannel) return interaction.reply('You must be in a voice chat to use this button')
                    const queue = client.distube.getQueue(i)
                    await queue.stop(VoiceChannel);
                    i.reply({ content: 'Song Has Been Stopped', ephemeral: true })
                    playPage.edit({ embeds: [playE], components: [editRow] })
                }
            })
        })

        .on('addSong', (queue, song) => {
            const addE = new MessageEmbed()
                .setColor(`${config['main_config'].colorhex}`)
                .setDescription(`Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`)
            queue.textChannel.send({ embeds: [addE] })
        }
        )


        .on('addList', (queue, playlist) => {
            const addlE = new MessageEmbed()
                .setColor(`${config['main_config'].colorhex}`)
                .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
            queue.textChannel.send({ embeds: [addlE] })
        }
        )

        .on('error', (channel, e) => {
            channel.send(`An error encountered: ${e.toString().slice(0, 1974)}`)
            console.error(e)
        })

        .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))

        .on('searchNoResult', (message, query) =>
            message.channel.send(`No result found for \`${query}\`!`)
        )

        .on('finish', queue => queue.textChannel.send('The Queue Has Been Finished.'))



    const event_files = readdirSync(`./events/`)

    for (const file of event_files) {
        const event = require(`../events/${file}`);
        const event_name = file.split('.')[0];
        client.on(event_name, event.bind(null, Spicey, client, con));
    }

    const categories = readdirSync(join(__dirname, `../`, `commands`));
    for (let category of categories) {
        const commands = readdirSync(join(__dirname, `../`, `commands/`, category));
        for (let command of commands) {
            let info = require(`../commands/${category}/${command}`);
            if (info.name) {
                client.commands.set(info.name, info);
            }
        }
    }



    client.login(config["main_config"].token).catch(err => {
        console.log(chalk.redBright(`[ERROR]:`) + "The Wrong Token Was Specefied Make Sure The Correct One Was Specefied In The Config")
    })
}

exports.init = init