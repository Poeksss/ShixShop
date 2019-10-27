const discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let Role = message.guild.roles.find("name", "🌐Staffmember")

    if(!message.member.roles.has(Role)) return message.channel.send("sorry only 🌐Staffmember's can purge channels")

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

module.exports.help = {
    name: "purge"
}

