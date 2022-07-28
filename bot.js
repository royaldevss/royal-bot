// eslint-disable-next-line no-unused-vars
module.exports = app => {
	const fs = require('node:fs');
	const path = require('node:path');
	const { Client, Collection, GatewayIntentBits } = require('discord.js');
	require('dotenv').config();

	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	/*
	* RODE INDIVIDUALMENTE 'node deploy-commands.js'
	* APENAS quando adicionar novo comando!
	*/

	client.commands = new Collection();

	let commandCount = 0,
		eventCount = 0;
	fs.readdirSync('./commands').forEach((dir) => {
		const commandFiles = fs.readdirSync(`./commands/${dir}`).filter((files) => files.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`./commands/${dir}/${file}`);
			client.commands.set(command.data.name, command);
		}
		commandCount++;
	});

	console.log(`${commandCount} Comandos Carregados.`);

	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
		eventCount++;
	}
	console.log(`${eventCount} Eventos Carregados.`);

	client.login(process.env.PRODTOKEN);
};