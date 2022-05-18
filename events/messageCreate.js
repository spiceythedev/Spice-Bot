const { MessageEmbed } = require("discord.js");
const config = require('../config.js')
const chalk = require('chalk')

module.exports = async (Spicey, client, con, message) => {

  if (config['filter_config'].enabled) {
    const words = config['filter_config'].bad_words;
    let foundInText = false;
    for (let i in words) {
      if (message.content.toLowerCase().includes(words[i])) foundInText = true
    }
    if (foundInText) {
      const badE = new MessageEmbed()
        .setTitle(config['main_config'].servername)
        .setDescription(`<@${message.author.id}> **${message.author.id}** Your Message Has Been Deleted Because It Is A Blacklisted Word. Please Do Not Say It Again`)
        .setColor(config['main_config'].colorhex)
        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
      message.channel.send({ embeds: [badE] }).then((message) => {
        setTimeout(() => {
          message.delete().catch(e => { });
        }, 10000)
      })
      await message.delete()

      const link = config['filter_config'].bad_links;
      let foundInLink = false;
      for (let i in link) {
        if (message.content.toLowerCase().includes(link[i])) foundInLink = true
      }
      if (foundInLink) {
        const badE = new MessageEmbed()
          .setTitle(config['main_config'].servername)
          .setDescription(`<@${message.author.id}> **${message.author.id}** Your Message Has Been Deleted Due To It Being A Possible Scam Link Or Restricted Link`)
          .setColor(config['main_config'].colorhex)
          .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
        message.channel.send({ embeds: [badE] }).then((message) => {
          setTimeout(() => {
            message.delete().catch(e => { });
          }, 10000)
        })
        await message.delete()
      }
    };
  }

  function spiceyisCute() {
    return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  }

  let levelup = 1500;

  if (message.author.bot) return;
  await con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, async (err, row) => {
    if (err) console.log(chalk.redBright(`[ERROR]:`) + `${err}`);

    if (row.length < 1) {
      await con.query(`INSERT INTO xp (id, xp, level) VALUES ('${message.author.id}', '${spiceyisCute()}', '0')`, async (err, row) => {
        if (err) throw err;
      })
    } else {
      let xp = row[0].xp;

      await con.query(`UPDATE xp SET xp = ${xp + spiceyisCute()} WHERE id = '${message.author.id}'`, async (err, row) => {
        if (err) throw err;
      });


      let nxtLvl = row[0].level * levelup;

      if (nxtLvl <= row[0].xp) {
        await con.query(`UPDATE xp SET level = ${row[0].level + 1} WHERE id = '${message.author.id}'`, async (err, row) => {
          if (err) throw err;
        })
      }

      if (nxtLvl <= row[0].xp) {
        const lvlup = new MessageEmbed()
          .setDescription(`${message.author.username} has leveled up to **Level ${row[0].level + 1}**`)
          .setColor(config['main_config'].colorhex)
        message.reply({ embeds: [lvlup] })
      }
    }
  })


  if (config['pingprevention_config'].enabled) {
    const ping = config['pingprevention_config'].dontpingids;
    let foundInPing = false;
    for (let i in ping) {
      if (message.content.toLowerCase().includes(ping[i])) foundInPing = true
    }
    if (foundInPing) {
      const badE = new MessageEmbed()
        .setTitle(`Please Dont Ping Me <3`)
        .setDescription('**Please stop pinging me i have stuff to do**')
        .setColor(config['main_config'].colorhex)
        .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
      message.channel.send({ embeds: [badE] }).then((message) => {
        setTimeout(() => {
          message.delete().catch(e => { });
        }, 10000)
      })
      await message.delete()
    }
  }

  const prefix = global.prefixes.get(message.guild.id)
  if (!message.content.startsWith(prefix) || message.author.bot) return


  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

  if (config['logging_config'].enabled) {
    const logChannel = client.channels.cache.get(global.channellogs.get(message.guild.id))
    if (!message.content.startsWith(prefix)) return;
    const editLog = new MessageEmbed()
      .setTitle('Message Action | Command Ran')
      .addField('Command Author', `${message.author}`)
      .addField('Discord ID', `${message.author.id}`)
      .addField('In', `<#${message.channel.id}>`)
      .setThumbnail(config['logging_config'].logthumbnail)
      .addField('Command', `\`\`\`\n${message.content}\n\`\`\``)
      .setColor(config['main_config'].colorhex)
      .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
    logChannel.send({ embeds: [editLog] })
  }

  try {
    command.execute(message, args, cmd, client, Spicey, config, con);
  } catch (err) {
    const errorE = new MessageEmbed()
      .setTitle(`${config['main_config'].servername}`)
      .setDescription(`**ERROR ❌ That is not a valid command, please do** ${prefix}help **for the list of commands**`)
      .setColor(`${config['main_config'].colorhex}`)
      .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })
    message.channel.send({ embeds: [errorE] })
  }
}