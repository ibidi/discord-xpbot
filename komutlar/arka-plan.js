const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, msg, argüman) => {  
  const kredi = db.fetch(msg.author.id+".profil.money") || 0
  const fiyatlar = {
    "1": ["1", 0]
  }
  const arkaplan = `
[1] > Varsayılan Arka Plan (Ücretsiz)
`
  var x = argüman[0]
  if(isNaN(x) || !x || !parseInt(x)) return msg.channel.send(`\`\`\`json
Selam! Profilini güzel gösterebileceğin Arka Plan sistemine hoş geldin.
${arkaplan}
#Bir arka planı satın almak istiyorsan, arka planın başında olan numarayı kullanarak "!!arka-plan numara" komutunu kullanabilirsin.
#Örn:"!!arka-plan 1"\`\`\``);
  if(kredi < fiyatlar[x][1]) return msg.channel.send("Bu arka planı alacak kadar kredin yok.")
  if(x === '1') {
    const image = "https://cdn.tatsu.gg/core/d6b85752efe79948672ada565866326917a2a55a.png";
    if(await db.fetch(msg.author.id+".arkaplanlar."+fiyatlar[x][0])) {
      await db.set(`profilP_${msg.author.id}`, image);
      return msg.channel.send('Arka planın başarıyla 1. arka plan olarak ayarlandı!');
    }
    try {
    const same_i = await db.fetch(`profilP_${msg.author.id}`);
    if(same_i == image) return msg.channel.send('Profil arka planın zaten şu anki arka plan olarak ayarlı!');
    await db.set(`profilP_${msg.author.id}`, image);
    msg.channel.send('<a:ibidi_onay:776800196314529822> Profil arka planın başarıyla aşağıdaki resim olarak ayarlandı!', {
      files: [image]
    });
    db.set(msg.author.id+".arkaplanlar."+fiyatlar[x][1], true)
    db.set(msg.author.id+".profil.money", kredi - fiyatlar['1'][0])
    } catch (err) {
      console.error(err);
    }
  } else { 
    msg.channel.send(`\`\`\`json
Selam! Profilini güzel gösterebileceğin Arka Plan sistemine hoş geldin.
${arkaplan}

#Bir arka planı satın almak istiyorsan, arka planın başında olan numarayı kullanarak "!!arka-plan numara" komutunu kullanabilirsin.
#Örn:"!!arka-plan 2"\`\`\``)
  }
};
  
  exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "arka-plan",
  kategori: "Seviye",
  açıklama: "Profilinizdeki arka planı değiştirirsiniz.",
  kullanım: "arka-plan <sayı>"
};
