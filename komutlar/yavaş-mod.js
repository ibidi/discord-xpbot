const Discord = require('discord.js');

exports.run = async(client, msg, args) => {
if (msg.channel.type !== "text") return;
const limit = args[0] ? args[0] : 0;
  if(!limit) {
      if (!limit) return msg.channel.send("<a:ibidi_hayir:776800162902442014> Kullanıcıların kaç saniyede bir mesaj yazabilmelerini belirtmediniz! `(Kapatmak için: 0)`");
            return
          }
if (limit > 10) {
      return msg.channel.send("<a:ibidi_hayir:776800162902442014> Yavaş Mod limiti maksimum 120 saniye olabilir! `örn: !!yavaşmod 120`");
}
    msg.channel.send(`<a:ibidi_onay:776800196314529822> **Başarılı,** bu odada kullanıcılar \`${limit}\` saniye aralıklarla mesaj gönderebilecek.`);
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${msg.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.ayarlar.token}`
    },
})};

exports.bilgi = {
	açık: true,
  kullanımlar: ["yavaşmod"],
}

exports.yardım = {
  kategori: "Ayar",
  yetki: "MANAGE_CHANNELS",
  isim: "yavaş-mod",
  açıklama: "Bulunduğunuz kanala yavaş-mod ayarlamanızı sağlar.",
  kullanım: "yavaş-mod <0/120>"
}