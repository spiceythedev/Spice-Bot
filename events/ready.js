const config = require('../config')
const mysql = require('mysql')
const chalk = require('chalk')
const { joinVoiceChannel } = require('@discordjs/voice');
const figlet = require('figlet')
const express = require("express");

module.exports = async (Spicey, client, con) => {


    con.query(`SELECT * FROM settings WHERE guildId = '${config['main_config'].serverid}'`, async (err, row) => {
        if (err) throw err;

        if (row.length < 1) {
            con.query(`INSERT INTO settings (guildId, cmdPrefix, modlogId, memberId, verifiedId) VALUES('${config['main_config'].serverid}', '!', '${config['logging_config'].logs}', '${config['role_config'].memberrole}', '${config['verification_config'].verifiedrole}')`, async (err, row) => {
                if (err) throw err;
                console.log(chalk.greenBright(`[MYSQL]:`) + 'All SQL Data Has Been Uploaded Just Run The Bot Again And It Should Work')
                process.exit()
            });
        } else if (!row.length < 1) {
            con.query(`SELECT cmdPrefix FROM settings WHERE guildId = '${config['main_config'].serverid}'`, (err, rows) => {
                if (err) throw err;
                global.prefixes.set(`${config['main_config'].serverid}`, `${rows[0].cmdPrefix}`)
            })
            con.query(`SELECT modLogId FROM settings WHERE guildId = '${config['main_config'].serverid}'`, (err, rows) => {
                if (err) throw err;
                global.channellogs.set(`${config['main_config'].serverid}`, `${rows[0].modLogId}`)
            })

            con.query(`SELECT memberId FROM settings WHERE guildId = '${config['main_config'].serverid}'`, (err, rows) => {
                if (err) throw err;
                global.memberId.set(`${config['main_config'].serverid}`, `${rows[0].memberId}`)
            })

            con.query(`SELECT verifiedId FROM settings WHERE guildId = '${config['main_config'].serverid}'`, (err, rows) => {
                if (err) throw err;
                global.verifiedId.set(`${config['main_config'].serverid}`, `${rows[0].verifiedId}`)
            })
        }
    })

    console.log(chalk.cyanBright(
        figlet.textSync('SPICEBOT', { font: 'Big', horizontalLayout: 'default', verticalLayout: 'default', width: '120' }))
    );
    console.log(` ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

    console.log(chalk.blueBright(`[SYSTEM]:`) + `Logged In As ${client.user.tag} running on port ${config['main_config'].port}`)

    if (config['status_config'].enabled) {
        const arrayOfStatus = [
            config.status_config.presence1,
            config.status_config.presence2,
            config.status_config.presence3,
            config.status_config.presence4
        ];

        let index = 0;
        setInterval(() => {
            if (index === arrayOfStatus.length) index = 0;
            const status = arrayOfStatus[index];
            client.user.setPresence({ activities: [{ name: (status), type: config['status_config'].presencetype }], status: config['status_config'].status })
            index++;
        }, `${config['status_config'].changetime}`)
    }


    const channel = client.channels.cache.get(config['main_config'].voicechannel);
    let connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    if (connection) {
        console.log(chalk.blueBright(`[SYSTEM]:`) + `Successfully connected to the voice channel!`)
    }

    const app = express()
    app.listen(`${config['main_config'].port}`)


    if (con) {
        console.log(chalk.redBright(`[MYSQL]:`) + `Successfully connected to Mysql!`)
    }


    console.log(chalk.yellowBright(`\n[CONSOLE]:`) + ` ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  Console Logging Starts Below! ━━━━━━━━━━━━━━━━━━━━━━━━━━ `)
}
