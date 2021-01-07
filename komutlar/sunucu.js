const zaman = require("moment-timezone");
require("moment/locale/tr");
require("moment-duration-format");
zaman.locale("tr");
var convertSeconds = require("convert-seconds");
const Discord = require("discord.js");

exports.run = async (client, message, argüman) => {
  var konum = "";
  var etiket = "";
  if (message.guild.defaultMessageNotifications === "ALL") {
    var etiket = "Bütün Mesajlar";
  }
  if (message.guild.defaultMessageNotifications === "MENTIONS") {
    var etiket = "Sadece @bahsetmeler";
  }
  if (message.guild.region === "russia") {
    var konum = "Rusya";
  }
  if (message.guild.region === "us-west") {
    var konum = "Batı Amerika";
  }
  if (message.guild.region === "us-south") {
    var konum = "Güney Amerika";
  }
  if (message.guild.region === "us-east") {
    var konum = "Doğu Amerika";
  }
  if (message.guild.region === "us-central") {
    var konum = "Amerika";
  }
  if (message.guild.region === "brazil") {
    var konum = "Brezilya";
  }
  if (message.guild.region === "singapore") {
    var konum = "Singapur";
  }
  if (message.guild.region === "sydney") {
    var konum = "Sidney";
  }
  if (message.guild.region === "eu-west") {
    var konum = "Batı Avrupa";
  }
  if (message.guild.region === "eu-south") {
    var konum = "Güney Avrupa";
  }
  if (message.guild.region === "eu-east") {
    var konum = "Doğu Avrupa";
  }
  if (message.guild.region === "eu-central") {
    var konum = "Avrupa";
  }
  if (message.guild.region === "hongkong") {
    var konum = "Hong Kong";
  }
  if (message.guild.region === "japan") {
    var konum = "Japonya";
  }
  var durum = "";
  if (message.guild.owner.user.presence.status === "online") {
    var durum = "Çevrimiçi";
  }
  if (message.guild.owner.user.presence.status === "idle") {
    var durum = "Boşta";
  }
  if (message.guild.owner.user.presence.status === "dnd") {
    var durum = "Rahatsız Etmeyin";
  }
  if (message.guild.owner.user.presence.status === "streaming") {
    var durum = "Yayında";
  }
  if (message.guild.owner.user.presence.status === "offline") {
    var durum = "Çevrimdışı";
  }
  let sicon = message.guild.iconURL;

  let serverembed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, sicon)
    .setColor("#17a166")
    .setThumbnail(sicon)
    .addField(
      "Sunucu",
      `**İsim:** ${message.guild.name}\n**ID:** ${
        message.guild.id
      }\n**Mesaj Bildirimi:** ${etiket}\n**Ülke:** ${konum}\n**Kuruluş:** ${zaman(
        message.guild.createdAt
      ).format("LL")} (${zaman(new Date())
        .diff(message.guild.createdAt, "days")
        .toLocaleString()} gün önce)`,
      true
    )
    .addField(
      "Sahip",
      `**İsim:** ${message.guild.owner.user.tag}\n**ID:** ${message.guild.owner.user.id}\n**Durum:** ${durum}`,
      true
    )
    .addField(
      "Üyeler",
      `**Çevrimiçi:** ${
        message.guild.members.filter(
          üye => üye.user.presence.status === "online"
        ).size
      }\n**Boşta:** ${
        message.guild.members.filter(m => m.user.presence.status === "idle")
          .size
      }\n**Rahatsız Etmeyin**: ${
        message.guild.members.filter(m => m.user.presence.status === "dnd").size
      }\n**Çevrimdışı**: ${
        message.guild.members.filter(m => m.user.presence.status === "offline")
          .size
      }\n**Botlar:** ${
        message.guild.members.filter(m => m.user.bot).size
      }\n**Toplam:** ${message.guild.memberCount}`,
      true
    )
    .addField(
      "Kanallar",
      `**Yazı:** ${
        message.guild.channels.filter(c => c.type === "text").size
      }\n**Sesli:** ${
        message.guild.channels.filter(c => c.type === "voice").size
      }\n**Kategori:** ${
        message.guild.channels.filter(c => c.type === "category").size
      }\n**Toplam:** ${message.guild.channels.size}\n**AFK Kanalı:** ${
        message.guild.afkChannel ? message.guild.afkChannel : "Bulunmuyor."
      }\n**AFK Zaman Aşımı:** ${
        convertSeconds(message.guild.afkTimeout).minutes
      } dakika `,
      true
    );

  message.channel.send(serverembed).catch(error => console.log(error.message));
};

exports.bilgi = {
  açık: true,
  kullanımlar: ["sunucu-bilgi", "server", "sunucu"],
  zaman: 2000
};

exports.yardım = {
  isim: "sunucu",
  kategori: "Kullanıcı",
  açıklama: "Sunucu bilgisini gösterir.",
  kullanım: "sunucu"
};
