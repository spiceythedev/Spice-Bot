const { MessageEmbed, MessageActionRow, MessageButton, Message } = require('discord.js')


module.exports = {
    name: 'help',
    description: "Help Command",
    async execute(message, args, cmd, client, Spicey, config) {
        let pages = [
            `**Bot Name:** ${client.user.tag} \n **Bot Prefix:** ${global.prefixes.get(message.guild.id)} \n **Bot Creator:** [Spicey#0001](https://spicedevelopment.com/discord) \n **Commands:** 53`,
            "`settings` sends the settings menu for your server \n `status` gets the status of the bot \n `leave` makes the bot leave from the vc its currently in \n `summon` summons the bot to your current vc \n `warn` warns the specefied user for the specefied reason \n `slowmode` enables slowmode in the specefied channel for the specefied amount of time \n `say` makes the bot say a message in a non embed form \n `restart` restarts the bot \n `reactionroles` sends out a reaction roles panel in the channel the command is ran in \n `lock` locks the server if you do <lock true> and unlocks when you do <lock false> \n `addrole` adds the specefied role the the specefied user ex. addrole **<user @>** role name \n `ban` bans the specefied user ex. ban **<user @>** reason \n `avatar` gets specefied users avatar ex. avatar **<user @>** \n `dm` dms specefied user ex. dm **<user @>** message \n `sayem` sends an embed message ex. sayem message \n `kick` kicks specefied user ex. kick **<user @>** reason \n `mute` mutes specefied user can be timed or perma ex. mute **<user @>** 10s \n `poll` makes a poll that people can react to ex. poll poll message \n `purge` clears messages within channel ex. purge 10 \n `removerole` removes role from specefied user ex. removerole **<user @>** role \n `unban` unbans user from the guild ex. unban **<user id>** \n `unmute` unmutes user ex. unmute **<user @>** \n `userinfo` gets specefied users info ex. userinfo **<user @>**",
            "`meme` gets a meme from a subreddit \n `xp` gets your xp or specefied users xp \n `level` gets specefied users level \n `website` sends the servers specefied website link \n `tos` sends your tos \n `serverinfo` gets the info of the server the bot is in \n `invite` gets the servers invite \n `dice` rolls a number between 1 and 100 \n `creator` shows who made the bot \n `help` opens the help menu \n `8ball` responds to a question a user sends with different oppurtunities of messages \n `ping` gets the ping of the bot \n `suggest` sends out a suggestion with an embed ex. suggest <suggestion> \n `version` gets the version of the bot \n `verify` verifys a user within the guild",
            "`ticketintro` sends an intro embed to the ticket your in \n `ticketclaim` claims the current ticket and sets the topic to <claimed by claimer> \n `ticket` makes a ticket panel in the specefied channel in the config ticket <ticket message> \n `add` adds specefied user to ticket ex. add <userID> \n `remove` removes specified user from ticket ex. remove <userID or user@> \n All Of The rest of the ticket commands are done through buttons.",
            "`play` this will allow you to play a song ex: play <song name> \n `skip` this will allow you to skip a song in the queue \n `queue` this will show the current queue of songs \n `loop` this will either loop your current song or current queue ex: loop <song> or <queue> \n `pause` this will pause the current song playing \n `resume` this will resume the current song paused \n `stop` this will stop the current song playing and remove it from the queue \n `volume` this will set the volume of the song playing ex: volume <1-100>",
            "`Spicey#0001:` Main Code \n `Hyperz#0001:` Command Design Inspiration & Help Command"
        ];

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
            .setThumbnail(`${config['logging_config'].logthumbnail}`)
            .setDescription(pages[0])
            .setFooter({ text: `0` })
        message.channel.send({ embeds: [embed], components: [buttons] })
        message.delete();
    }
}