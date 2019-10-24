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

            prompter.reaction(channel, {
                question: `**NEW ORDER** \npaypal email:${response1}\nuser: ${message.author}\nwhat he wants: ${response2} (complete this order in a week)`,
                userId: message.author.id,
                timeout: 604800000,
            }).then(response => {
                if(!responses) {
                    message.author.send("sorry we couldn't complete your order in 1 week")
                    channel.send(`${message.author}'s order wasn't complete`)
                }

                if(response === 'yes') return channel.send(`${message.author}'s order is completed`)
                if(response === 'no') return channel.send(`${message.author}'s didn't complete for a reason`)
            })
        })
    })
}

module.exports.help = {
    name: "start"
}