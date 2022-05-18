const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: 'reactionroles',
    description: "Role Command",
    permissions: ['MANAGE_CHANNELS'],
    async execute(message, args, cmd, client, Spicey, config, con) {
        const per = config['role_config'].manager
        if (!message.member.roles.cache.some(r => per.includes(r.id))) {
            message.reply({ content: 'You do not have sufficient permisions to use this command', ephemeral: true })
        } else if (message.member.roles.cache.some(r => per.includes(r.id))) {
            const rrEmbed = new MessageEmbed()
                .setTitle('Reaction Roles')
                .setColor(config['main_config'].colorhex)
                .setDescription(`${config['reaction_roles_config'].reactionrolesmessage}`)
                .setFooter({ text: `${config['main_config'].copyright} | Made By Spicey#0001` })

            const row1 = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('role1')
                        .setPlaceholder('Reaction Roles')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .addOptions([
                            {
                                label: `Add ${config['reaction_roles_config'].reactionrole1name}`,
                                value: 'role1',
                            },
                            {
                                label: `Remove ${config['reaction_roles_config'].reactionrole1name}`,
                                value: 'role1r',
                            },
                            {
                                label: `Add ${config['reaction_roles_config'].reactionrole2name}`,
                                value: 'role2',

                            },
                            {
                                label: `Remove ${config['reaction_roles_config'].reactionrole2name}`,
                                value: 'role2r',
                            },
                        ]),
                )

            await message.channel.send({ embeds: [rrEmbed], components: [row1] })
        }
    }
}