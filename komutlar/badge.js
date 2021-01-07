const db = require("quick.db")

exports.run = async (client, msg, argüman) => {
  const kredi = db.fetch(msg.author.id+".profil.money") || 0
  const rozetler = {
    "1": ["staff", 0],
    "2": ["mod", 0],
    "3": ["beta", 0]
  }
  const rozetliste = `
[1] > Staff
[2] > Mod
[3] > Beta
`
  var x = argüman[0]
  if(!x || isNaN(x) || !["1","2","3"].includes(x))  
  msg.channel.send(`\`\`\`json
Selam! Profilini güzel gösterebileceğin Rozet sistemine hoş geldin.
${rozetliste}

#Bir rozeti satın almak istiyorsan, rozetin başında olan numarayı kullanarak "!!badge numara" komutunu kullanabilirsin.
#Örn:"!!badge 1"\`\`\``)
  msg.channel.send(`Satın almak istediğin rozet: **${rozetler[x[0]][0]}** \`-\` Fiyatı: **${rozetler[x[0]][1]}**
Eğer satın alma işlemine devam etmek istiyorsan sohbete \`onayla\` yaz.`)
  const filter = res => res.author.id === msg.author.id;
  const turn = await msg.channel.awaitMessages(filter, {max: 1 });
  const evet = turn.first().content
  if(evet === "onayla") {
    if(db.has(msg.author.id+".rozetlers."+rozetler[x[0]][0])) return msg.channel.send("Almaya çalıştığın bu rozet zaten sende var.")
    if(kredi < rozetler[x[0]][1]) return msg.channel.send("Bu rozeti alacak kadar kredin yok.")
    db.set(msg.author.id+".rozetlers."+rozetler[x[0]][0], true)
    db.set(msg.author.id+".profil.money", kredi - rozetler[x[0]][1])
    return msg.channel.send(`<a:ibidi_onay:776800196314529822> Başarılı bir şekilde **${rozetler[x[0]][0]}** rozetini aldınız.`)//**${rozetler[x[0]][1]}**
  } else {
    return msg.channel.send("`onayla` yazmadığın için komut iptal edildi.")
  }
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "badge",
  kategori: "Admin",
  açıklama: "Profil komudu için rozet satın alırsınız.",
  kullanım: 'badge ["1", "2"]'
};
