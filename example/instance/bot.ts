import Fosscord from "../../src/index"

const client = new Fosscord.Client({
	intents: [
		Fosscord.Intents.FLAGS.GUILD_MESSAGES
	],
	waitGuildTimeout: 0,
});

client.on("ready", () => {
	console.log(`ready as ${client.user?.tag}`);
});

client.on("messageCreate", message => {
	console.log(`${message.author.tag} : ${message.content}`);

	if (message.content === "ping") {
		message.reply("pong");
	}
});

client.login(process.env.INSTANCE_TOKEN);