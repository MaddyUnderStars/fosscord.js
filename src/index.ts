import Discord from 'discord.js';

interface patchFunction {
	(result: any, ...any: any[]): any;
}

const patch = (holdingObject: any, functionName: string, newFunction: patchFunction, callOriginal = true) => {
	var originalFunction = holdingObject[functionName];
	if (!originalFunction) originalFunction = holdingObject.prototype[functionName];
	var patched = (...args: any[]) => {
		if (callOriginal)
			var result = originalFunction.call(holdingObject, ...args);
		return newFunction.call(holdingObject, callOriginal ? result : originalFunction, ...args);
	};
	holdingObject.prototype[functionName] = holdingObject[functionName] = patched;
};

patch(Discord.Options, "createDefault", (result) => {
	return Object.assign(result, {
		http: {
			agent: {},
			version: 9,
			api: 'https://dev.fosscord.com/api',
			cdn: 'https://cdn.fosscord.com',
			invite: 'https://fosscord.com',
			template: 'https://fosscord.new',
		},
	});
});

type gatewayEvent = {
	op: number;
	t: string;
	d: { [key: string]: any; };
};

patch(Discord.WebSocketManager, "handlePacket", (func: Discord.WebSocketManager["handlePacket"], packet: gatewayEvent, shard: Discord.WebSocketShard) => {
	if (!packet || typeof packet.op !== "number" || !packet.t) return;    //what
	// console.log(`received packet ${JSON.stringify(packet)}`)

	if (packet.op === 0) {
		switch (packet.t) {
			case "READY":
				packet.d.application = packet.d.user;
				break;
			case "MESSAGE":
				if (packet.d.components === null) delete packet.d.components;
		}
	}

	return func.call(shard.manager, packet, shard);
}, false);

const originalResolveData = Discord.MessagePayload.prototype.resolveData;
Discord.MessagePayload.prototype.resolveData = function (): Discord.MessagePayload {
	const ret = originalResolveData.call(this);
	if (!ret.data) return ret;

	if ("message_reference" in ret.data && ret.data.message_reference &&
		"reply" in ret.options && ret.options.reply) {
		var message = ret.options.reply.messageReference as Discord.Message;

		ret.data.message_reference.channel_id = message.channelId;
		ret.data.message_reference.guild_id = message.guildId as string;
	}

	if ("embed" in ret.data) {
		if (!ret.data.embed && ret.data?.embeds?.[0])
			ret.data.embed = ret.data.embeds[0];

		if (ret.data.embed && ret.data.embed.footer && !ret.data.embed.footer?.text)
			delete ret.data.embed.footer;
	}

	this.data = ret.data;
	return ret;
};

export default Discord;