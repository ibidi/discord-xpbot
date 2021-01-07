const db = require("quick.db")

exports.run = async (client, msg, argüman) => {
  const x = argüman.join(" ")
  if(!x) return msg.channel.send(`Bir açıklama gir.`);
  if(x.length > 50) return msg.channel.send(`Açıklaman 50 karakterden fazla olamaz.`);
  db.set(msg.author.id+".profil.açıklama", x)
  return msg.channel.send(`<a:ibidi_onay:776800196314529822> Açıklamanız başarılı bir şekilde ayarlandı.`)
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "açıklama",
  kategori: "Seviye",
  açıklama: "Profil sistemindeki açıklamanızı ayarlarsınız.",
  kullanım: "açıklama-ayarla [yazı]"
};
