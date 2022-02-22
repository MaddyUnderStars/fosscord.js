import Fosscord from "../../src/index";

const client = new Fosscord.Client({
	intents: [
		Fosscord.Intents.FLAGS.GUILD_MESSAGES
	],
	waitGuildTimeout: 0,
});

client.on("ready", () => {
	console.log(`ready as ${client.user?.tag}.`);
});

client.on("messageCreate", async message => {
	console.log(`${message.author.tag} : ${message.content}`);

	if (message.content === "ping") {
		message.reply("pong");
	}

	if (!client.instanced) return;

	if (message.content === "respawn")
		client.instanced.respawnAll();

	if (message.content === "fetchGuilds") {
		const guilds = await client.instanced.fetchClientValues('guilds.cache.size') as number[];
		if (!guilds) return;
		message.reply(`I am in ${guilds.reduce((curr, prev) => curr + prev)}`);
	}

});

client.login(process.env.INSTANCE_TOKEN);