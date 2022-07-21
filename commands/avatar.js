const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Veja o avatar de um usuário ou o seu próprio avatar')
		.addUserOption(option => option.setName('pessoa').setDescription('Visualize o Avatar de algúem')),
	async execute(interaction) {
		const user = interaction.options.getUser('pessoa');
		if (user) return interaction.reply(`Avatar de ${user.username}: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaction.reply(`Seu avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`);
	},
};