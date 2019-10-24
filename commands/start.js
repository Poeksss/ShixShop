const discord = require("discord.js");
const prompter = require("discordjs-prompter")

module.exports.run = async (bot, message, args) => {
    prompter.message(message.channel, {
        question: 'paypal email (you have 1 minute)',
        userId: message.author.id,
        max: 1,
        timeout: 60000
    })
    .then(responses => {
        if (!responses.size) {
            return message.channel.send(`Time OVER !!!`)
        }

        const response1 = responses.first();

        prompter.message(message.channel, {
            question: 'what would you like (you have 1 minute)',
            userId: message.author.id,
            max: 1,
            timeout: 60000
        }).then(responses => {
            if(!responses) {
                return message.channel.send(`Time OVER !!!`)
            }
            const response2 = responses.first();

            const channel = bot.channels.get("635899073681031218")

            message.author.send(`thanks for buying a ${response2} server, we will make your server in 7 days if it takes longer you can make a ticket. Use your id as proof id: ${message.author.id}`)

            channel.send(`**NEW ORDER**\npaypal email:${response1}\nuser:${message.author}\nwhat he wants:**${response2}**\norder id:${message.author.id}\ncomplete this in a week`).then( function (message) {
                await message.react(":white_check_mark:")
                await message.react(":x:")
            }
        })
    })
}

module.exports.help = {
    name: "start"
}