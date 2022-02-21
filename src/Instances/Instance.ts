import EventEmitter from "events";
import path from "path";
import childProcess from "child_process";
import Discord from "discord.js";
import InstanceManager, { InstanceOptions } from "./InstanceManager";

class Instance extends EventEmitter {
	manager: typeof InstanceManager.prototype;
	id: number;
	env: { [key: string]: string | undefined; };
	process?: childProcess.ChildProcess;
	instance: InstanceOptions;

	constructor(manager: typeof InstanceManager.prototype, id: number, instance: InstanceOptions) {
		super();

		this.id = id;
		this.manager = manager;
		this.instance = instance;

		this.env = Object.assign({}, process.env, {
			INSTANCE_MANAGER: true,
			INSTANCES: this.id,
			INSTANCE_COUNT: this.manager.options.instances.length,
			INSTANCE_TOKEN: instance.token,

			INSTANCE_API_ENDPOINT: instance.http?.api,
			INSTANCE_CDN_ENDPOINT: instance.http?.cdn,
			INSTANCE_INVITE_ENDPOINT: instance.http?.invite,
		});
	}

	spawn = async (timeout: number = 30000) => {
		this.process = childProcess.fork(path.resolve(this.manager.file), { env: this.env })
			.on("message", this.__handleMessage.bind(this))
			.on("exit", this.__handleExit);

		this.emit("spawn", this.process);

		// if (timeout === -1 || timeout === Infinity) return Promise.resolve(this.process);

		return this.process;
	};

	kill = () => {
		this.process?.removeListener("exit", this.__handleExit);
		this.process?.kill();
		this.__handleExit()
	};

	respawn = async (timeout?: number) => {
		this.kill();
		return this.spawn(timeout)
	}

	send = (message: any) => new Promise((resolve, reject) => {
		this.process?.send(message, err => {
			if (err) reject(err);
			resolve(this);
		})
	})

	__handleMessage = () => {

	};

	__handleExit = () => {

	};
};

export default Instance;