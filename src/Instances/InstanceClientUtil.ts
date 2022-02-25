import Discord from "discord.js";
import Fosscord from "../index";
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

	fetchClientValues = Discord.ShardClientUtil.prototype.fetchClientValues.bind(this);

	broadcastEval = Discord.ShardClientUtil.prototype.broadcastEval.bind(this);

	respawnAll = Discord.ShardClientUtil.prototype.respawnAll.bind(this);

	//@ts-ignore
	_handleMessage = Discord.ShardClientUtil.prototype._handleMessage.bind(this);

	//@ts-ignore
	_respond = Discord.ShardClientUtil.prototype._respond.bind(this);

	singleton = Discord.ShardClientUtil.singleton.bind(this);

	instanceIdsForGuildId = async (id: Discord.Snowflake) => {
		const resp = await this.broadcastEval(async (client, { id }) => {
			return client.guilds.cache.find((x) => x.id === id);
		}, { context: { id } }) as Discord.Guild[];
		return resp.map((x, i) => !!x ? i : null).filter(x => x !== undefined);
	};
}

export default InstanceClientUtil;