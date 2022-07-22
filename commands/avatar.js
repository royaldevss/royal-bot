/* eslint-disable no-mixed-spaces-and-tabs */
const { SlashCommandBuilder } = require('@discordjs/builders'),
	{ EmbedBuilder } = require('discord.js'),
	config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Veja o avatar de um usuário ou o seu próprio avatar')
		.addUserOption(option => option.setName('usuario').setDescription('Visualize o Avatar de algúem')),
	async execute(interaction) {
		const user = interaction.options.getUser('usuario') || interaction.user;
		  const embed = new EmbedBuilder()
		  .setColor(config.botConfig.themeColor)
		  .setTitle(`Avatar de ${user.username}#${user.discriminator}`)
		  .setImage(user.displayAvatarURL({ format: 'png' }));

		return interaction.reply({ embeds: [embed] });
	},
};