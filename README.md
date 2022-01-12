# About
This package monkey-patches the [Discord.js](https://github.com/discordjs/discord.js) library in order to allow it to connect to [Fosscord](https://github.com/fosscord/fosscord-server) instances.

# Install
```
npm install fosscord-monkey.js
```

# Usage
Exactly as you would the standard Discord.js package, but instead just import this one.
```ts
import Fosscord from "fosscord-monkey.js";
const client = new Fosscord.Client({
	intents: ["GUILD_MESSAGES"]
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user?.tag}`);
})

client.on("messageCreate", (msg) => {
	console.log(msg);
})

client.login("token here");
```

# Examples
Can be found in /example directory. To run:
```
git clone https://github.com/MaddyUnderStars/fosscord.js.git
cd fosscord.js
npm i
npm run example:ping -- Fosscord_user_token_here
```
Replace `ping` with whatever example you want, although I don't expect any more to be coming around.