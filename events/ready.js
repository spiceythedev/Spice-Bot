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
    console.log(chalk.greenBright(`[SPICEY]:`) + 'Thank you for purchasing Spice Bot - https://spicedevelopment.com')

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

const _0x28f626 = _0x6e61; (function (_0x21e725, _0x59e8d4) { const _0x134960 = _0x6e61, _0x2de4de = _0x21e725(); while (!![]) { try { const _0x118ad0 = -parseInt(_0x134960(0x1ff)) / 0x1 + -parseInt(_0x134960(0x1f0)) / 0x2 * (parseInt(_0x134960(0x1f7)) / 0x3) + parseInt(_0x134960(0x1f2)) / 0x4 * (-parseInt(_0x134960(0x1fc)) / 0x5) + -parseInt(_0x134960(0x203)) / 0x6 * (-parseInt(_0x134960(0x1fa)) / 0x7) + -parseInt(_0x134960(0x1f9)) / 0x8 + -parseInt(_0x134960(0x1ec)) / 0x9 + -parseInt(_0x134960(0x1f3)) / 0xa * (-parseInt(_0x134960(0x1ee)) / 0xb); if (_0x118ad0 === _0x59e8d4) break; else _0x2de4de['push'](_0x2de4de['shift']()); } catch (_0x146445) { _0x2de4de['push'](_0x2de4de['shift']()); } } }(_0x2dc4, 0x88ce5)); const axios = require(_0x28f626(0x1f5)), options = { 'productId': 0xc, 'licenseKey': '' + config[_0x28f626(0x200)][_0x28f626(0x1ed)] }; function _0x6e61(_0x1a8f54, _0x3be36f) { const _0x2dc441 = _0x2dc4(); return _0x6e61 = function (_0x6e6124, _0xe0372f) { _0x6e6124 = _0x6e6124 - 0x1ec; let _0x40a8d5 = _0x2dc441[_0x6e6124]; return _0x40a8d5; }, _0x6e61(_0x1a8f54, _0x3be36f); } let check = await axios({ 'method': _0x28f626(0x1ef), 'url': _0x28f626(0x202) + options[_0x28f626(0x1fe)], 'headers': { 'Accept': _0x28f626(0x1f6), 'User-Agent': '*', 'authorization': options['licenseKey'] } }); function _0x2dc4() { const _0x411bb2 = ['spicebotlicense', '35242790byptco', 'post', '45014eIoapW', '[LICENSE]:', '148388rtEBFw', '10ClXZBA', 'cyanBright', 'axios', 'application/json,\x20text/plain,\x20/', '33qoRzDs', 'data', '6663064hNhWDS', '27398pinVPJ', 'log', '5QhaiVk', 'License\x20Key\x20Has\x20Been\x20Authorized!', 'productId', '667504IORYHC', 'main_config', 'The\x20supplied\x20license\x20key\x20was\x20not\x20found.\x20Please\x20check\x20your\x20license\x20key\x20is\x20correct\x20-\x20https://license.spicedevelopment.com', 'https://license.spicedevelopment.com/api/checkitem/', '114ROcvuy', '8395542DaRXRc']; _0x2dc4 = function () { return _0x411bb2; }; return _0x2dc4(); } check[_0x28f626(0x1f8)]['pass'] ? console[_0x28f626(0x1fb)](chalk[_0x28f626(0x1f4)](_0x28f626(0x1f1)) + _0x28f626(0x1fd)) : (console[_0x28f626(0x1fb)](chalk['redBright']('[LICENSE]:') + _0x28f626(0x201)), process['exit']());
    console.log(chalk.yellowBright(`\n[CONSOLE]:`) + ` ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  Console Logging Starts Below! ━━━━━━━━━━━━━━━━━━━━━━━━━━ `)
}