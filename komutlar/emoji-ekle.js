const Discord = require("discord.js");

exports.run = async (client, message, args) => { 
  var emojiismi = args[1]
  var link = args[0]
  var msg = message
  const m = msg
  if(!link) return msg.channel.send(`Lütfen bir link girin.`)
  if(!emojiismi) return msg.channel.send(`Lütfen bu emojiye bir isim girin.`)
  if(emojiismi.length > 32) return msg.channel.send(`Lütfen **32** karakterden az bir emoji ismi girin.`)
    if(link.endsWith(!'.png' && !'.jpg' && !'.jpeg' && !'.gif' && !'v=1')) {
      return msg.channel.send(`Lütfen sonu **.png**, **.gif** ya da **.jpg** olan bir uzantı girin.`)
    }
    if(link.startsWith(!'https://' && !'www.' && !'http://')) {
      return msg.channel.send(`Lütfen geçerli bir bağlantı girin.`)
    }
    if(msg.guild.emojis.find(r=>r.name===emojiismi)) {
        return msg.channel.send(`Sunucuda zaten bu isimde bir emoji bulunmakta.`)
    }
      try {
      msg.guild.createEmoji(link, emojiismi)
        var EndMS = 1500;
        setTimeout(function(){ 
        }, 1500);
        setTimeout(function(){
          const emoji = msg.guild.emojis.find(r=>r.name===emojiismi)
         if(emoji === undefined || emoji === null) return msg.channel.send(`Lütfen geçerli bir bağlantı girin.`)
            msg.channel.send(`<:evet:702786528820068352> ${emoji} (\`${emojiismi}\`) emojisi başarıyla sunucuya eklendi!`)
      }, EndMS);
      } catch (err) {
        return msg.channel.send(`<:hayir:702786528430260254> Bir hata meydana geldi! Lütfen emojinin özel karakter içermediğine, \`-\` ve boşluktan başka bir ifade içermediğine dikkat edin.`)
      }

  };


exports.bilgi = {
	açık: true,
  kullanımlar: ["emojiekle"],
}

exports.yardım = {
  kategori: "Moderasyon",
  yetki: "MANAGE_EMOJIS",
  isim: "emoji-ekle",
  açıklama: "Sunucuya emoji eklemek için kullanılır.",
  kullanım: "emoji-ekle [link] [emoji ismi]"
}