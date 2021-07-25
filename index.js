const mineflayer = require('mineflayer')
const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client()

let token = config.token

const bot = mineflayer.createBot({
    host: `${config.serverip}`,
    username: `${config.email}`,
    password: `${config.password}`,
    version: `${config.version}`,
    auth: `${config.accounttype}`
})

bot.on('message', jsonMsg => {
    const message = jsonMsg.toString();

    if (isGuildMessage(message)) {
        let parts = message.split(':')
        let group = parts.shift().trim()
        let hasRank = group.endsWith(']')

        let randomparts = group.split(' ')
        let username = randomparts[randomparts.length - (hasRank ? 2 : 1)]
        let guildrank = randomparts[randomparts.length - 1].replace(/[\[\]]/g, '')


        if (guildrank == username) {
            guildrank = 'Member'
        }

        const finalMessage = parts.join(':').trim()

        let channel = client.channels.cache.get(`${config.bridgechannel}`)
        if (!channel) return;

        const messageEmbed = new Discord.MessageEmbed()
            .setDescription(`${finalMessage}`)
            .setColor('#6495ED')
            .setTimestamp()
            .setAuthor(`${username}`, 'https://www.mc-heads.net/avatar/' + username)
            .setFooter(`${guildrank}`)
           
        channel.send(messageEmbed)
    }
    else if (isOfficerMessage(message)) {
        let parts = message.split(':')
        let group = parts.shift().trim()
        let hasRank = group.endsWith(']')

        let randomparts = group.split(' ')
        let username = randomparts[randomparts.length - (hasRank ? 2 : 1)]
        let guildrank = randomparts[randomparts.length - 1].replace(/[\[\]]/g, '')


        if (guildrank == username) {
            guildrank = 'Member'
        }

        const finalMessage = parts.join(':').trim()

        let channel = client.channels.cache.get(`${config.officerchannel}`)
        if (!channel) return;

        const messageEmbed = new Discord.MessageEmbed()
            .setDescription(`${finalMessage}`)
            .setColor('#6495ED')
            .setTimestamp()
            .setAuthor(`${username}`, 'https://www.mc-heads.net/avatar/' + username)
            .setFooter(`${guildrank}`)
           
        channel.send(messageEmbed)
    }
})

bot.on('message', jsonMsg => {
    const message = jsonMsg.toString();

    if (isLobbyJoinMessage(message)) {
        return sendToLimbo()
    }
  
    if (isPartyInviteMessage(message)) {
        this.inviter = message.split(" ")[1]
        if (this.inviter === "has") this.inviter = message.split(" ")[0].replace("-----------------------------\n", "")
        {
        setTimeout(() => {
            bot.chat("/p join " + this.inviter)
        }, 100)
    }
      return
    }
  
    if (this.inviter) {
      if (isMessageYouJoinedParty(message)) {
        this.partyLeader = this.inviter
        this.inviter = 0
  
        setTimeout(() => {
            this.partyLeader = 0
            bot.chat("/p leave")
        }, 10000)
    } else if (isMessageYoureInParty(message)) {
        let pastInviter = this.inviter
        this.inviter = 0
  
        let sorryMsg = "Sorry, I'm already in a party with " + (this.partyLeader ? this.partyLeader : "someone") + ", try in a bit! uwu"
  
            sorryMsg = addCharToString(sorryMsg, "⭍", 15);
            bot.chat("/msg " + pastInviter + " " + sorryMsg)
            setTimeout((pastInviter) => {
                if (this.inviter === pastInviter || this.partyLeader == 0) bot.chat("/p leave")
            }, 10000)
        }
    }
})

client.on('ready', () => {
	client.channels.cache.find(channel => channel.id === `${config.bridgechannel}`).send("Bridge Bot Online!")
})

client.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.channel.id === `${config.bridgechannel}`) {
        msg.delete();
        bot.chat(`/gc ${msg.member.displayName}: ${msg}`)
    }
    else if (msg.channel.id === `${config.officerchannel}`) {
        msg.delete();
        bot.chat(`/go ${msg.member.displayName}: ${msg}`)
    }
})

function isLobbyJoinMessage(message) {
    return (message.endsWith(' the lobby!') || message.endsWith(' the lobby! <<<')) && message.includes('[MVP+')
}

function isPartyInviteMessage(message) {
    return message.endsWith(" here to join!\n-----------------------------") && !message.includes(':')
}
  
function isMessageYouJoinedParty(message) {
    return message.endsWith(" party!") && !message.includes(':')
}
  
function isMessageYoureInParty(message) {
    return message.endsWith(" to join another one.") && !message.includes(':')
}

function isGuildMessage(message) {
    return message.startsWith(`Guild >`) && message.includes(':')
}

function isOfficerMessage(message) {
    return message.startsWith(`Officer >`) && message.includes(':')
}

function sendToLimbo() {
    console.log(`Sending client to limbo`)
    return bot.chat('/ac §')
}

function addCharToString(string, chars, times) {
    for (let i = 0; i < times; i++) {
        let randomNumber = Math.floor(Math.random() * string.length + 1)
        let a = string.split("")
  
        a.splice(randomNumber, 0, chars)
        string = a.join("")
    }
    return string
}

client.login(token)