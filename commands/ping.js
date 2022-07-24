/* eslint-disable no-mixed-spaces-and-tabs */
const { SlashCommandBuilder } = require('@discordjs/builders'),
	{ EmbedBuilder } = require('discord.js'),
	config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Veja informações sobre o ping do bot!'),
	async execute(interaction) {
		const { client } = interaction;
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const embed = new EmbedBuilder()
			.setColor(config.botConfig.themeColor)
			.setTitle('Ping!')
			.setDescription(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms / Websocket heartbeat: ${client.ws.ping}ms.`);
		interaction.editReply({ embeds: [embed], content:'Pronto!' });
	},
};