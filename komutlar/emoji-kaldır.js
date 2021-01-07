const Discord = require("discord.js");

exports.run = async (client, message, args) => { 
  var emojiismi = args[0]
  var msg = message
  const m = msg
  if(!emojiismi) return msg.channel.send(`Lütfen silinecek emojinin ismini girin.`)
  if(emojiismi.length > 32) return msg.channel.send(`Lütfen **32** karakterden az bir emoji ismi girin.`)
    if(!msg.guild.emojis.find(r=>r.name===emojiismi)) {
        return msg.channel.send(`Sunucuda bu isimde bir emoji yok.`)
    }
      msg.guild.deleteEmoji(msg.guild.emojis.find(r=>r.name===emojiismi))
      return msg.channel.send(`<:evet:702786528820068352> (\`${emojiismi}\`) emojisi başarıyla sunucudan kaldırıldı!`)

  };


exports.bilgi = {
	açık: true,
  kullanımlar: ["emojikaldır"],
}

exports.yardım = {
  kategori: "Moderasyon",
  yetki: "MANAGE_EMOJIS",
  isim: "emoji-kaldır",
  açıklama: "Sunucudan emoji kaldır için kullanılır.",
  kullanım: "emoji-kaldır [emoji ismi]"
}