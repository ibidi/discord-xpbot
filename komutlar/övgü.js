const db = require("quick.db")

exports.run = async (client, message, args) => {
  const msg = message
  var user = msg.mentions.members.first() || msg.guild.members.find(r=>r.id===args[0]) || msg.guild.members.find(r=>r.user.username===args.join(" "))
  if(!args.join(" ")) return msg.channel.send("Lütfen bir kullanıcı gir.")
  if(!user) return msg.channel.send(`\`${args.join(" ")}\` isimli bir kullanıcı bulunamadı.`)
  if(user.user.bot) return msg.channel.send("Botlara övgü veremezsin.")
  if(user.id === msg.author.id) return msg.channel.send("Kendi kendine övgü veremezsin.")
  var u = user
  let time = db.has(`${message.author.id}.repDurum`) ? (36000000 - (Date.now() - db.fetch(`${message.author.id}.repDurum`))) : 0
  if(time > 0) {
    let süre = require('parse-ms')(Number(time))
    message.channel.send(`Birisine tekrardan övgü verebilmek için **${süre.hours} saat ${süre.minutes} dakika ${süre.seconds} saniye** beklemelisin!`)
    return
  } else {
    db.set(`${message.author.id}.repDurum`, Date.now())
    db.set(`${u.id}.profil.rep`, (db.fetch(`${u.id}.profil.rep`)||0) + 1)
    message.channel.send(`<a:ibidi_onay:776800196314529822> Başarıyla **${u.user.tag}** kullanıcısına övgü verildi!`)
  }
};

exports.bilgi = {
  açık: true,
  kullanımlar: ["rep"],
};

exports.yardım = {
  isim: "övgü",
  kategori: "Seviye",
  açıklama: "Bir kullanıcıya övgü verirsiniz.",
  kullanım: "övgü [@kullanıcı]"
};
