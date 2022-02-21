import Discord from "discord.js";
import Instance from "./Instance";

class InstanceClientUtil {
	client: Discord.Client;
	_singleton?: InstanceClientUtil;

	constructor(client: Discord.Client) {
		this.client = client;

		if (!process.send) throw new Error("not child process?");

		process.on("message", this._handleMessage.bind(this));
		client.on("ready", () => {
			process.send!({ _ready: true });
		});
	}

	send = (message: any): Promise<void> => new Promise((resolve, reject): void => {
		process.send!(message, (err: Error) => {
			if (err) reject(err);
			resolve();
		});
	});

	fetchClientValues = (prop: string, instance?: Instance) => new Promise((resolve, reject) => {

	});

	broadcastEval = (script: string, options = {}) => {

	};

	respawnAll = () => {

	};

	_handleMessage = (message: any) => {
		if (!message) return;

	};

	_respond = () => {

	};

	singleton = (client: Discord.Client) => {
		if (!this._singleton)
			this._singleton = new InstanceClientUtil(client);
		else {
			client.emit("warn", "Multiple clients created in child process for instancing");
		}
	};
}

export default InstanceClientUtil;