const config = require('../config.json'),
	{ EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const { client } = interaction;
		console.log(
			`${interaction.user.tag} em #${interaction.channel.name}: ${interaction.commandName}`,
		);

		const opts = [];
		for (let i = 0; i < interaction.options._hoistedOptions.length; i++) {
			opts.push(interaction.options._hoistedOptions[i].value);
		}
		const logChannel = client.channels.cache.get(config.logsChannel.slashLogId),
			fields = [
				{
					name: 'Autor:',
					value: `<@${interaction.user.id}> - (\`${interaction.user.id}\`)`,
					inline: false,
				},
				{
					name: 'Comando:',
					value: `${interaction.commandName} ${opts.join(' ')}`,
					inline: false,
				},
				{
					name: 'Id da mensagem/comando:',
					value: `${interaction.id}`,
					inline: false,
				},
				{
					name: 'Canal:',
					value: `${interaction.channel.name} - (${interaction.channel.id})`,
					inline: false,
				},
				{
					name: 'Servidor:',
					value: `${interaction.guild.name} - (${interaction.guild.id})`,
					inline: false,
				},
			],
			embed = new EmbedBuilder()
				.setColor(config.botConfig.themeColor)
				.setThumbnail(
					interaction.guild.iconURL({
						dynamic: true,
						size: 2048,
					}),
				)
				.setTitle('Royal Bot - Logs')
				.setDescription('Log de Comandos')
				.setFields(fields);
		logChannel.send({ embeds: [embed] });

		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Houve um erro ao executar esse comando!', ephemeral: true });
		}
	},
};