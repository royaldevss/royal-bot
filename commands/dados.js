/* eslint-disable no-mixed-spaces-and-tabs */
const { SlashCommandBuilder } = require('@discordjs/builders'),
	{ EmbedBuilder } = require('discord.js'),
	config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dados')
		.setDescription('Sorteie números de 1 à 20.'),
	async execute(interaction) {
		const sorteio = Math.floor(Math.random() * 20) + 1;
		return interaction.reply({ content: `Número escolhido: **${sorteio}**` });
	},
};