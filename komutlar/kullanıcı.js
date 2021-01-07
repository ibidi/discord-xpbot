const zaman = require("moment-timezone");
require("moment/locale/tr");
require("moment-duration-format");
zaman.locale("tr");
var convertSeconds = require("convert-seconds");
const Discord = require("discord.js");

exports.run = async (client, message, argüman) => {
  var msg = message
  var args = argüman
  zaman.locale("tr");
  var user = msg.mentions.members.first() || msg.guild.members.find(r=>r.id===args[0]) || msg.guild.members.find(r=>r.user.username===args.join(" ")) || msg.guild.members.find(s => s.user.username.match(new RegExp(`${args.slice(0).join(" ")}`, 'g')))
  let kendi = message.member;
  let kişi = user || kendi;
  if (!argüman[0]) kişi = kendi;
  var durum = "";
  var durum2 = "";
  var saatlan = "";
  let clientstatus = [];
  let rozetler = [];
  let partner = "<:ortak:630499870976770073>"
  let bughunter = "<:hataavcisi:630499678626250772>"
  let staff = "<:ekip:630499693125828654>"
  if (
    !kişi.user.bot ||
    (!kişi.bot && kişi.presence.status == "offline") ||
    kişi.user.presence.status == "offline"
  ) {
    if (
      kişi.presence.status == "offline" ||
      kişi.user.presence.status == "offline"
    ) {
      clientstatus.push("Bilinmiyor");
    } else {
    if (kişi.presence.clientStatus.web || kişi.user.presence.clientStatus.web) {
      clientstatus.push("Tarayıcı");
    }
    if (
      kişi.presence.clientStatus.mobile ||
      kişi.user.presence.clientStatus.mobile
    ) {
      clientstatus.push("Mobil");
    }
    if (
      kişi.presence.clientStatus.desktop ||
      kişi.user.presence.clientStatus.desktop
    ) {
      clientstatus.push("Bilgisayar");
    }
    }
  }
  if (
    kişi.presence.status === "online" ||
    kişi.user.presence.status === "online" ||
    kişi.status === "online"
  ) {
    var durum = "Çevrimiçi";
  }
  if (
    kişi.presence.status === "idle" ||
    kişi.user.presence.status === "idle" ||
    kişi.status === "idle"
  ) {
    var durum = "Boşta";
  }
  if (
    kişi.presence.status === "dnd" ||
    kişi.user.presence.status === "dnd" ||
    kişi.status === "dnd"
  ) {
    var durum = "Rahatsız Etmeyin";
  }
  if (
    kişi.presence.status === "streaming" ||
    kişi.user.presence.status === "streaming" ||
    kişi.status === "streaming"
  ) {
    var durum = "Yayında";
  }
  if (
    kişi.presence.status === "offline" ||
    kişi.user.presence.status === "offline" ||
    kişi.status === "offline"
  ) {
    var durum = "Çevrimdışı";
  }
  if (kişi.presence.game || kişi.user.presence.game) {
    if (kişi.presence.game.type === 0 || kişi.user.presence.game.type === 0) {
      var durum2 = "Oynuyor";
    }
    if (kişi.presence.game.type === 1 || kişi.user.presence.game.type === 1) {
      var durum2 = "Yayınında";
    }
    if (kişi.presence.game.type === 2 || kişi.user.presence.game.type === 2) {
      var durum2 = "Dinliyor";
    }
    if (kişi.presence.game.type === 3 || kişi.user.presence.game.type === 3) {
      var durum2 = "İzliyor";
    }
    let embed = new Discord.RichEmbed()
      .setColor(client.ayarlar.renk)
      .setAuthor(
        kişi.username || kişi.user.username,
        kişi.displayAvatarURL || kişi.user.displayAvatarURL
      )
      .addField(
        `Kişi`,
        `**Görünen İsim**: ${
          kişi.nickname ? kişi.nickname : kişi.username || kişi.user.username
        }\n**Durum:** ${durum} (${
          clientstatus.join(", ") ? clientstatus.join(", ") : "Bilinmiyor"
        })`,
        true
      );
    if (kişi.presence.game.assets) {
      embed.setThumbnail(kişi.presence.game.assets.largeImageURL);
    }
    if (kişi.user.bot || kişi.bot) {
      embed.setDescription("Bu kişi bot gibi duruyor.");
    }
    if (kişi.presence.game.timestamps || kişi.user.presence.game.timestamps) {
      if (
        kişi.presence.game.name == "Spotify" ||
        (kişi.user.presence.game.name == "Spotify" &&
          kişi.presence.game.type == 2) ||
        kişi.user.presence.game.type == 2
      ) {
        var trackImg = kişi.presence.game.assets.largeImageURL;
        var trackUrl = `https://open.spotify.com/track/${kişi.presence.game.syncID}`;
        embed.setThumbnail(trackImg);
        embed.addField(
          `${kişi.presence.game.name ||
            kişi.user.presence.game.name} ${durum2}`,
          `[${kişi.presence.game.details ||
            kişi.user.presence.game.details}](${trackUrl})\n**${kişi.presence
            .game.state || kişi.user.presence.game.state}** tarafından\n**${kişi
            .presence.game.assets.largeText ||
            kişi.user.presence.game.assets.largeText}** albümünde`,
          true
        );
      }
    }
    if (
      kişi.presence.game.name != "Spotify" ||
      kişi.user.presence.game.name != "Spotify"
    ) {
      if (kişi.presence.game.type == 1 || kişi.user.presence.game.type == 1) {
        embed.addField(
          `${kişi.presence.game.name ||
            kişi.user.presence.game.name} ${durum2}`,
          `Yayına gitmek için [tıkla](${kişi.presence.game.url ||
            kişi.user.presence.game.url})`,
          true
        );
      }
      if (
        kişi.presence.game.timestamps == null ||
        kişi.user.presence.game.timestamps == null
      ) {
        if (kişi.presence.game.type != 1 || kişi.user.presence.game.type != 1) {
          embed.addField(
            `${kişi.presence.game.name ||
              kişi.user.presence.game.name} ${durum2}`,
            `Zamansız`,
            true
          );
        }
      } else {
        embed.addField(
          `${kişi.presence.game.name ||
            kişi.user.presence.game.name} ${durum2}`,
          `${zaman
            .duration(
              zaman(new Date()).diff(
                kişi.presence.game.timestamps.start ||
                  0 ||
                  kişi.user.presence.game.timestamps.start ||
                  0
              ),
              "milliseconds"
            )
            .humanize() || "0 saniye"} geçti`,
          true
        );
      }
    }
    embed.addField(
      `Katılım`,
      `**Discord:** ${zaman(kişi.user.createdAt).format("LL")} (${zaman(
        new Date()
      )
        .diff(kişi.user.createdAt, "days")
        .toLocaleString()} gün önce) \n**Sunucu:** ${zaman(
        kişi.joinedAt
      ).format("LL")} (${zaman(new Date())
        .diff(kişi.joinedAt, "days")
        .toLocaleString()} gün önce)`
    );
    message.channel.send(embed);
  } else {
    let embed = new Discord.RichEmbed()
      .setColor(client.ayarlar.renk)
      .setAuthor(
        kişi.username || kişi.user.username,
        kişi.displayAvatarURL || kişi.user.displayAvatarURL
      )
      .addField(
        `Kişi`,
        `**Görünen İsim**: ${
          kişi.nickname ? kişi.nickname : kişi.username || kişi.user.username
        }\n**Durum:** ${durum} (${
          clientstatus.join(", ") ? clientstatus.join(", ") : "Bilinmiyor"
        })`,
        true
      )
      .addField(
        `Katılım`,
        `**Discord:** ${zaman(kişi.user.createdAt).format("LL")} (${zaman(
          new Date()
        )
          .diff(kişi.user.createdAt, "days")
          .toLocaleString()} gün önce) \n**Sunucu:** ${zaman(
          kişi.joinedAt
        ).format("LL")} (${zaman(new Date())
          .diff(kişi.joinedAt, "days")
          .toLocaleString()} gün önce)`
      );
    message.channel.send(embed);
  }
};

exports.bilgi = {
  açık: true,
  kullanımlar: ["kullanıcı-bilgi", "user"],
  zaman: 2000
};

exports.yardım = {
  isim: "kullanıcı",
  kategori: "Kullanıcı",
  açıklama: "Kullanıcı bilgisini gösterir.",
  kullanım: "kullanıcı <kullanıcı>"
};