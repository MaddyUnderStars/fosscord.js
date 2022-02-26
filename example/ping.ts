import Fosscord from "../src/index"

const client = new Fosscord.Client({
	intents: [
		Fosscord.Intents.FLAGS.GUILD_MESSAGES
	],
	http: {
		api: 'https://slowcord.maddy.k.vu/api',
		cdn: 'https://slowcord.maddy.k.vu',
		invite: 'https://slowcord.maddy.k.vu',
	}
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

client.login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0NDM5NjY1OTExNzI5NzY4OSIsImlhdCI6MTY0NTQ0OTgwMH0.ybd4mAMyM6AQjluMZl_4zXKtyALh7-nC_0d41eTy4q4");