import { InstanceManager } from "../../src/index";

const manager = new InstanceManager("./example/instance/bot.ts", {
	instances: [

	]
});

manager.spawn();