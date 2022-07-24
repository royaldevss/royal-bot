/* eslint-disable no-mixed-spaces-and-tabs */
const { SlashCommandBuilder } = require('@discordjs/builders'),
	{ EmbedBuilder } = require('discord.js'),
	config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dados')
		.setDescription('Sorteie números de 1 à 20.'),
	async execute(interaction) {
		return interaction.reply({ content: `Número escolhido: **${Math.floor(Math.random() * 20) + 1}**` });
	},
};