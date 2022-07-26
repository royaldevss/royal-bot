const { ActivityType } = require('discord.js'),
	config = require('../config.json');


module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const avatares = [
			config.botConfig.avatarsThemes.default,
		];

		const status = [
			'online',
		];

		const atividades = [
			['desenvolvimento', ActivityType.Competing],
		];

		setInterval(async () => {
			const i = Math.floor(Math.random() * atividades.length + 1) - 1;
			await client.user.setActivity(atividades[i][0], {
				type: atividades[i][1],
			});
		}, 10000);
		setInterval(async () => {
			const b = Math.floor(Math.random() * status.length + 1) - 1;
			await client.user.setStatus(status[b]);
		}, 20000);
		setInterval(async () => {
			const c = Math.floor(Math.random() * avatares.length + 1) - 1;
			await client.user.setAvatar(avatares[c]);
		}, 400000);
		console.log(
			`========= Preparado, logado como: ${client.user.tag} ========= `,
		);
	},
};