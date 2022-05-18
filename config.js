const _config = {
    "main_config": {
        "token": "Nzk0ODI1ODg5Mzk3MDgwMDc2.X_AdSw.AOOmqZMQ7NSlbwvHZ0sfH-xxtgg", // (REQUIRED) Found at https://discord.dev
        "prefix": "!", // This Is The Default Prefix (NO NEED TO CHANGE THIS) All Changing Done Through Command
        "colorhex": "#36393F", // Color of all embeds
        "spicebotlicense": "ztAh1BXxlBHPGVqqReqkpCCqMA6DF5hecyxqHuAeIdBB8", // License Key found at https://license.spicedevelopment.com
        "servername": "Spice Development", // Servers Name, used in most embed titles
        "serverid": "859906988610551888", // Servers ID.
        "copyright": "© 2022 Spice Development", // Footer of most Embeds
        "port": 2003, // The Port The Bot Listens To 
        "voicechannel": "859907451892793405" // Voice Channel that is joined on start
    },

    "status_config": {
        "enabled": true, // Enable or Disable Presence and Status
        "presence1": "Spice Development", // First Presence
        "presence2": "Coded By Spicey#0001", // Second Presence
        "presence3": "Prefix: .", // Third Presence
        "presence4": "https://spicedevelopment.com", // Fourth Presence
        "presencetype": "WATCHING", // Presence Types, PLAYING, STREAMING, LISTENING, WATCHING
        "status": "dnd", // Status, online, dnd, idle
        "changetime": "5000" // Amount of time for the bot to go to the next Presence
    },

    "verification_config": {
        "enabled": true,
        "verificationchannel": "922166370727243796" 
    },

    "membercount_config": {
        "enabled": true,
        "membercountchannel": "948719867572392036",
    },

    "reaction_roles_config": {
        "reactionrolesmessage": "Open The Menu To Add Some Roles To Yourself",
        "reactionrole1name": "News Notified",
        "reactionrole1id": "945899259268595782",
        "reactionrole2name": "Community Developer",
        "reactionrole2id": "945899251794333706"
    },

    "auto_roles_config": {
        "enabled": false,
        "autoroleid": "859907438835400715"
    },

    "application_config": {
        "questions": ["How Old Are You", "Why Do You Want To Be Staff (45 WORD MIN)", "Why Do You Think You Are Qualifed For Staff (50 WORD MIN)", "How Often Can You Be On", "What Skills Can You Bring To Spice Development's Staff Team (50 WORD MIN)"],
        "applicationslogchannel": "945875091005243443",
        "appcategory": "966781584810319882",
        "startmessage": "Welcome to your Spice Development Staff App",
        "applicationchannel": "945886904518324255",
    },

    "logging_config": {
        "enabled": true,
        "logs": "911813619094814720",
        "logthumbnail": "https://cdn.discordapp.com/attachments/859907458453209088/958557333783461998/spicepfp.jpg"
    },

    "ticket_config": {
        "enabled": true,
        "ticketchannel": "919730161048506388",
        "ticketcategory": "974130802747117609",
        "roletopingonopen": "911812307493998593",
        "ticketarchivechannel": "919730212361609256",
        "ticketcreatedembed": "Thank You For Creating A Ticket Please Wait For A Staff Member To Answer Your Ticket",
        "ticketbuttoncolor": "SECONDARY",
        "ticketemoji": "",
        "ticketimage": "https://cdn.discordapp.com/attachments/859907458453209088/874143298858680350/hd-tickets-49041.png?size=5000"
    },

    "userjoin_config": {
        "enabled": true,
        "welcomeimage": "https://cdn.discordapp.com/attachments/859907458453209088/958557434891345920/spicedevdiscordbanner_copy.jpg",
        "welcomechannel": "911813090331475978",
        "welcomemessage": "Welcome To Spice Development"
    },

    "userleave_config": {
        "enabled": true,
        "leavechannel": "911813121117675551",
        "leavemessage": "Adios"
    },

    "pingprevention_config": {
        "enabled": false,
        "dontpingids": ["658570303986991114"]
    },

    "mysql": {
        "host": "localhost",
        "user": "root",
        "password": "GPLhHs5Pnx7zE8n",
        "database": "xp"
    },

    "role_config": {
        "member": ["955289337988255829"],
        "muted": ["922167123596443690"],
        "staff": ["911812307493998593"],
        "ticketmanager": ["911812307493998593"],
        "manager": ["875189138553446430"]
    },

    "alt_config": {
        "enabled": true,
        "alttime": "1 day"
    },

    "filter_config": {
        "enabled": true,
        "bad_words": ["steam", "fag", "faggot", "nigger", "airdrop", "nitro"],
        "bad_links": ["https://discord.gg", "https://dsc.gg", "discord.gg/"]
    },

    "misc_config": {
        "website": "https://spicedevelopment.com",
        "invite": "https://discord.gg/sMKkbwVU4T",
        "tos": "https://spicedevelopment.com/tos",
        "suggestionchannel": "954877221640761354",
        "subreddit": "memes"
    }
}
module.exports = _config;