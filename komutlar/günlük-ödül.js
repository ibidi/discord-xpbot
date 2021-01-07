const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms"); // database bu şekilde olsun yeni komutların karışıyo sonra

exports.run = async (client, message, args) => {
  const msg = message
  //var user = msg.mentions.members.first() || msg.guild.members.find(r=>r.id===args[0]) || msg.guild.members.find(r=>r.user.username===args.join(" "))
  var user = message.author
  var u = user
  let time = db.has(`${message.author.id}.moneyDurumA`) ? (36000000 - (Date.now() - db.fetch(`${message.author.id}.moneyDurumA`))) : 0
  if(time > 0) {
    let süre = require('parse-ms')(Number(time))
    message.channel.send(`Tekrardan günlük kredini alabilmek için **${süre.hours} saat ${süre.minutes} dakika ${süre.seconds} saniye** beklemelisin!`).then(msg => msg.delete(5000));
    return
  } else {
    db.set(`${message.author.id}.moneyDurumA`, Date.now())
    db.add(`${u.id}.profil.money`, 300)
    message.channel.send(`:credit_card: **Başarılı bir şekilde günlük 300 kredini çektin.**`)
  }
};
exports.bilgi = {
  açık: true,
  kullanımlar: ['günlükkredi','günlük','kredi','daily','günlük-kredi'],
};

exports.yardım = {
  isim: "günlük-ödül",
  kategori: "Seviye",
  açıklama: "Bottan günlük ödülünüzü alırsınız.",
  kullanım: "günlük-ödül"
};
