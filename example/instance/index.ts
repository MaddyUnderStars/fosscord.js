import { InstanceManager } from "../../src/index";

const manager = new InstanceManager("./example/instance/bot.ts", {
	instances: [
		{
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0NDM5NjY1OTExNzI5NzY4OSIsImlhdCI6MTY0NTIzMjcwM30.5ShfR55qcRma-gYIQWTNvo5XlPiLZJJyrFQ3oQrgwBk",
			baseUrl: "slowcord.maddy.k.vu",
		},
		{
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0NTA3MjgwODA0MjQ5NDE2NyIsImlhdCI6MTY0NTM5MzMxNn0.u-HJkMBqSueOfY4wKJ1APmLbF8ZIkf-zQ-VXbRD3GXk",
			baseUrl: "app.freecord.ir",
		}
	]
});

manager.spawn();