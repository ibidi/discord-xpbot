const db = require("quick.db")

exports.run = async (client, msg, argüman) => {
  const x = argüman.join(" ")
  if(!x) return msg.channel.send(`Bir açıklama gir.`);
  if(x.length > 20) return msg.channel.send(`Açıklaman 20 karakterden fazla olamaz.`);
  db.set(msg.author.id+".profil.kaçıklama", x)
  return msg.channel.send(`<:evet:702786528820068352> Açıklamanız başarılı bir şekilde ayarlandı.`)
};

exports.bilgi = {
  açık: true,
  kullanımlar: ["kısa-açıklama-ayarla"],
};

exports.yardım = {
  isim: "kısa-açıklama",
  kategori: "Seviye",
  açıklama: "Profil sistemindeki kısa açıklamanızı ayarlarsınız.",
  kullanım: "kısa-açıklama [yazı]"
};
