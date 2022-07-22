module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Pronto! Logado como ${client.user.tag}`);
	},
};