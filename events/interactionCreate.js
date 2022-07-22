module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const { client } = interaction;
		console.log(
			`${interaction.user.tag} em #${interaction.channel.name}: ${interaction.commandName}`,
		);
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