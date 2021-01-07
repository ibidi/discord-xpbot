const Discord = require('discord.js')
const twemoji = require("twemoji")

exports.run = async (client, message, args, db) => {
    const x = args[0]
  if(!x) return message.channel.send(`Lütfen bir emoji girin.`)
   try {
    const emote = Discord.Util.parseEmoji(x)
    if (emote.animated === true) {
      const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif`
      await message.channel.send({ files: [{ attachment: URL, name: emote.name+'.gif' }] })
    } else if (emote.id === null) {
      const twemote = twemoji.parse(x)
      const regex = /src="(.+)"/g
      const regTwemote = regex.exec(twemote)[1]
      await message.channel.send({ files: [{ attachment: regTwemote, name: 'emoji.png' }] })
    } else {
      const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`
      await message.channel.send({ files: [{ attachment: URL, name: emote.name+'.png' }] })
    }
 } catch (error) {
   return console.log(error.message)
  }
};

exports.bilgi = {
	açık: true,
  kullanımlar: [],
}

exports.yardım = {
  kategori: "Eğlence",
  isim: "jumbo",
  açıklama: "Girilen emojinin büyük halini kanala atar.",
  kullanım: "jumbo [emoji]"
}