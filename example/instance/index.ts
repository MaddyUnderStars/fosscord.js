import { InstanceManager } from "../../src/index";

const manager = new InstanceManager("./example/instance/bot.ts", {
	instances: [
		{
			token: process.argv[2],
			baseUrl: "slowcord.maddy.k.vu",
		}
	]
});

manager.spawn();