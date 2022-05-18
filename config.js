const _config = {
    "main_config": {
        "token": "", // (REQUIRED) Found at https://discord.dev
        "prefix": "!", // This Is The Default Prefix (NO NEED TO CHANGE THIS) All Changing Done Through Command
        "colorhex": "#36393F", // Color of all embeds
        "servername": "SERVER_NAME", // Servers Name, used in most embed titles
        "serverid": "GUILD_ID", // Servers ID.
        "copyright": "© 2022 COPY_RIGHT", // Footer of most Embeds
        "port": 3000, // The Port The Bot Listens To 
        "voicechannel": "VOICE_CHANNEL_ID" // Voice Channel that is joined on start
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
        "verificationchannel": "VERIFICATION_CHANNEL_ID" 
    },

    "membercount_config": {
        "enabled": true,
        "membercountchannel": "MEMBER_COUNT_CHANNEL_ID",
    },

    "reaction_roles_config": {
        "reactionrolesmessage": "REACTION_ROLES_MESSAGE",
        "reactionrole1name": "ROLE_1_NAME",
        "reactionrole1id": "ROLE_1_ID",
        "reactionrole2name": "ROLE_2_NAME",
        "reactionrole2id": "ROLE_2_ID"
    },

    "auto_roles_config": {
        "enabled": false,
        "autoroleid": "AUTO_ROLE_ID"
    },

    "application_config": {
        "questions": [],
        "applicationslogchannel": "APP_LOG_ID",
        "appcategory": "OPEN_APP_CATEGORY",
        "startmessage": "Welcome to your Spice Development Staff App",
        "applicationchannel": "APP_EMBED_CHANNEL",
    },

    "logging_config": {
        "enabled": true,
        "logs": "LOGGING_CHANNEL_ID",
        "logthumbnail": "LOG_THUMBNAIL" // MUST BE A LINK
    },

    "ticket_config": {
        "enabled": true,
        "ticketchannel": "TICKET_EMBED_CHANNEL_ID",
        "ticketcategory": "TICKET_CATEGORY_ID",
        "roletopingonopen": "ROLE_TO_PING_ON_OPEN_ID",
        "ticketarchivechannel": "TICKET_ARCHIVE_CHANNEL_ID",
        "ticketcreatedembed": "Thank You For Creating A Ticket Please Wait For A Staff Member To Answer Your Ticket",
        "ticketbuttoncolor": "SECONDARY", // ONLY THESE COLORS CAN BE USED, PRIMARY, SECODARY, DANGER, SUCCESS
        "ticketemoji": "",
        "ticketimage": "TICKET_EMBEDS_IMAGE" // MUST BE A LINk
    },

    "userjoin_config": {
        "enabled": true,
        "welcomeimage": "WELCOME_IMAGE", // MUST BE A LINL
        "welcomechannel": "WELCOME_CHANNEL_ID",
        "welcomemessage": "WELCOME_MESSAGE"
    },

    "userleave_config": {
        "enabled": true,
        "leavechannel": "LEAVE_CHANNEL_ID",
        "leavemessage": "LEAVE_MESSAGE"
    },

    "pingprevention_config": {
        "enabled": false,
        "dontpingids": ["PING_PREV_USER_ID"]
    },

    "mysql": {
        "host": "localhost",
        "user": "root",
        "password": "",
        "database": "spicebot"
    },

    "role_config": {
        "member": ["MEMBER_ROLE_ID"],
        "muted": ["MUTED_ROLE_ID"],
        "staff": ["STAFF_ROLE_ID"],
        "ticketmanager": ["TICKET_MANAGER_ID"],
        "manager": ["MANAGER_ID"]
    },

    "alt_config": {
        "enabled": true,
        "alttime": "1 day" 
    },

    "filter_config": {
        "enabled": true,
        "bad_words": ["steam", "airdrop", "nitro"],
        "bad_links": ["https://discord.gg", "discord.gg/"]
    },

    "misc_config": {
        "website": "WEBSITE_LINK",
        "invite": "DISCORD_INVITE",
        "tos": "TOS_LINK",
        "suggestionchannel": "SUGGESTION_CHANNEL_ID",
        "subreddit": "memes"
    }
}
module.exports = _config;