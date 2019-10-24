const discord = require("discord.js")
const prompter = require("discordjs-prompter")
const botconfig = require("./botconfig.json")
const fs = require("fs");
const bot = new discord.Client({disableEveryone: true});
bot.commands = new discord.Collection();

fs.readdir("./commands", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() == "js")
    if(jsfile.length <= 0){
        console.log("couldn't find commands")
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded`)
        bot.commands.set(props.help.name, props);
    })
})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("memes", {type: "WATCHING"})
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
})

bot.login(process.env.TOKEN);