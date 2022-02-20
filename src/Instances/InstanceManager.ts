import EventEmitter from "events";
import Discord from "discord.js";
import Instance from "./Instance";

//If http not provided, create standard(ish) endpoint urls from baseUrl
export type InstanceOptions = {
	token: string,
	baseUrl?: string,
	http?: Discord.HTTPOptions;
};

export interface InstanceManagerOptions {
	respawn?: boolean;
	childArgs?: Array<string>;
	execArgs?: Array<string>;
	instances: Array<InstanceOptions>;
}

class InstanceManager extends EventEmitter {
	options: InstanceManagerOptions;
	children: Discord.Collection<number, typeof Instance.prototype>;
	file: string;

	constructor(file: string, options: InstanceManagerOptions) {
		super();

		this.file = file;

		options = Object.assign({ respawn: true, childArgs: [], execArgs: [], instances: [] }, options);
		if (!options.instances.length) throw new Error("List of instances cannot be empty");

		this.options = options;
		this.children = new Discord.Collection;
	}

	createChild = (options: InstanceOptions, id = this.children.size) => {
		const child = new Instance(this, id, options);
		this.children.set(id, child);
		this.emit("childCreate", child);
		return child;
	};

	spawn = async (timeout = 30000) => {
		for (const instance of this.options.instances) {
			if (instance.baseUrl) {
				instance.http = {
					api: `https://${instance.baseUrl}/api`,
					cdn: `https://${instance.baseUrl}/cdn`,
					invite: `https://${instance.baseUrl}/invite`
				}
			}

			const child = this.createChild(instance);
			await child.spawn(timeout);
		}
	};
};

export default InstanceManager;