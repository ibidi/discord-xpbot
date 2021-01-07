process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const app = express();
const http = require('http');

    app.get("/", (request, response) => {
    console.log("Bot Tekrar Açıldı");
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 210000);

const Discord = require("discord.js");
const client = new Discord.Client();
const ibidi = require("croxy-api");
const db = require("quick.db");
const fs = require("fs");
const Enmap = require("enmap");
const moment = require("moment");

client.komutlar = new Enmap();
client.kullanımlar = new Enmap();
client.zaman = new Enmap();
client.müzik = new Map();
client.serverQueue = new Enmap();
client.veri = db;

client.ayarlar = {
  token: process.env.token,
  sahip: process.env.sahip,
  prefix: process.env.prefix,
  renk: "#7289DA",
  //renk: "#f96854",
  yardimcilar: ["407455869643784192"]
};


fs.readdir("./events/", (hata, dosyalar) => {
  if (hata) return console.error(hata.message);
  dosyalar.forEach(dosya => {
    const event = require(`./events/${dosya}`);
    let eventİsim = dosya.split(".")[0];
    client.on(eventİsim, event.bind(null, client));
  });
});

client.on("ready", async () => {
  if (db.has("zaman")) {
    Object.keys(db.fetch("zaman")).forEach(kanal => {
      let veri = db.fetch("zaman." + kanal);

      let kanall = veri.kanal;
      let mesaj = veri.mesaj;
      let süre = veri.sure;

      setInterval(function() {
        client.channels.get(`${kanall}`).send(`${mesaj}`);
      }, require("ms")(`${süre}`));
    });
  }
});

client.on("message", async message => {
  const ms = require("parse-ms");
  if (message.author.bot) return;
  if (message.author.id == client.user.id) return;
  if (!message.guild) return;

  const prefixEtiket = new RegExp(`^<@!?${client.user.id}>`);

  let i =
    (await client.veri.fetch(`${message.guild.id}.prefix`)) ||
    client.ayarlar.prefix;
  let prefix;
  if (i) {
    prefix = message.content.match(prefixEtiket)
      ? message.content.match(prefixEtiket)[0] + " "
      : i;
  } else {
    prefix = message.content.match(prefixEtiket)
      ? message.content.match(prefixEtiket)[0] + " "
      : client.ayarlar.prefix;
  }

  if (message.content.indexOf(prefix) !== 0) return;

  if (message.content.indexOf(prefix) !== 0) return;

  const argüman = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const komut = argüman.shift().toLowerCase();

  const cmd =
    client.komutlar.get(komut) ||
    client.komutlar.get(client.kullanımlar.get(komut));

  if (!cmd) return;

  if (cmd && !cmd.bilgi.açık)
    if (message.author.id !== "725410917319311360")
      return message.channel.send(
        "Bu komut şu an kullanım dışıdır. Lütfen daha sonra tekrar deneyiniz."
      );
  if (cmd && cmd.yardım.kategori == "Admin") {
    var yetkililer = ["725410917319311360"];
    if (!yetkililer.includes(message.author.id))
      return message.channel.send(
        "Bu komut yetkililerimize özel komutlardır. *erişiminiz bulunmuyor*"
      );
  }

  if (cmd && cmd.yardım.yetki) {
    if (!message.member.permissions.has(cmd.yardım.yetki))
      return message.channel.send("Bu komudu kullanmak için yetkin yok.");
  }
  
  let komutZaman = cmd.bilgi.zaman || 0;
  let kişiZaman = client.zaman.get(message.author.id) || 0;
  if (komutZaman - (Date.now() - kişiZaman) > 0) {
    let zaman = ms(komutZaman - (Date.now() - kişiZaman));
    return message.channel.send(
      `Bu komudu kullanmak için ${zaman.seconds + 1} saniye beklemelisin.`
    ).then(msg => msg.delete(5000));
  }
  client.zaman.set(message.author.id, Date.now());

  cmd.run(client, message, argüman, db);
});

fs.readdir("./komutlar/", (hata, dosyalar) => {
  if (hata) return console.error(hata.message);
  dosyalar.forEach(dosya => {
    if (!dosya.endsWith(".js")) return;
    let içerik = require(`./komutlar/${dosya}`);
    let komutİsmi = dosya.split(".")[0];
    client.komutlar.set(komutİsmi, içerik);
    içerik.bilgi.kullanımlar.forEach(alias => {
      client.kullanımlar.set(alias, içerik.yardım.isim);
    });
  });
});

client.on("ready", async () => {
	global.evet = ":ok_hand:"
	global.hayır = ":grey_question:"
  global.kilit = ":lock:"
  global.eksi = ":no_entry:"
  console.log(client.user.tag+" aktif! ID: "+client.user.id)
  client.user.setStatus("online")
  client.user.setActivity("1/1 | !!yardım - !!davet", { type: "PLAYING"});       
})
//geçici oda sistemi - sohbet - 

client.on('voiceStateUpdate', (oldMember, member) => {

  // Check if the user entered a new channel.
    if (member.voiceChannelID) {
    const newChannel = member.guild.channels.get(member.voiceChannelID);

        // If the user entered a game channel (prefixed with a game controller unicode emoji), group them into their own channel.
        if (newChannel.name.startsWith('Sohbet Odası Oluştur')) {
            newChannel.clone('🍻 Genel Sohbet', true)
                .then(createdChannel => {
                    createdChannel.edit({
                            bitrate: 64000,
                            position: newChannel.position + 50,
              userLimit: newChannel.userLimit
            })
            .then(createdChannel => {
            let category = member.guild.channels.find(c => c.name == "「 ☎ 」Sohbet Muhabbet" && c.type == "category");

            if (!category) {
              throw member.send('**[Otomatik sesli grup sistemi] [EKLENMESİ GEREKEN!]** Lütfen sunucu yetkililerinden **「 ☎ 」Sohbet Muhabbet** adlı bir kategori bu sunucuda olmadığı için seni odaya taşıyamadığımı ilet!');
            }
            createdChannel.setParent(category.id);

                member.setVoiceChannel(createdChannel)
                                .then(console.log('[' + new Date().toISOString() + '] Moved user "' + member.user.username + '#' + member.user.discriminator + '" (' + member.user.id + ') to ' + createdChannel.type + ' channel "' + createdChannel.name + '" (' + createdChannel.id + ') at position ' + createdChannel.position))
                                .catch(console.error);


          })
          .catch(console.error);
                })
                .catch(console.error);
        }
    }

    // Check if the user came from another channel.
    if (oldMember.voiceChannelID) {
        const oldChannel = oldMember.guild.channels.get(oldMember.voiceChannelID);

        // Delete the user's now empty temporary channel, if applicable.
        if (!oldChannel.name.startsWith('🍻 Genel Sohbet')) return;
          if (oldChannel.members.array().length) return;
            oldChannel.delete()
                .then(function() {
                    console.log('[' + new Date().toISOString() + '] Deleted ' + oldChannel.type + ' channel "' + oldChannel.name + '" (' + oldChannel.id + ')');
                })
                .catch(console.error);

    }
});

// Reorder channels when one is created.
client.on('channelCreate', function(channel){
  if (!channel.client.channels.get(c => c.name == "「 ☎ 」Sohbet Muhabbet" && c.type == "category")) return;
    if(!channel.name.startsWith('🍻 Genel Sohbet')){
        orderChannels();
    }
});

// Reorder channels when one is deleted.
client.on('channelDelete', function(channel){
    if(!channel.name.startsWith('🍻 Genel Sohbet')){
        orderChannels();
    }
});

// Function to reorder channels.
function orderChannels(){
    // Get a list of channels.
    var channelsOrdered = client.channels.array().slice(0);

    // Evaluate only voice channels.
    channelsOrdered = channelsOrdered.filter(function(channel) {
        return channel.type == 'voice' && typeof channel.position !== 'undefined';
    });

    // Sort channels by their current position.
    channelsOrdered = channelsOrdered.sort(function(channelA, channelB) {
        return channelA.position - channelB.position;
    });

    // Re-sort channels to support auto-grouping and maximum voice quality.

}

client.on("guildBanAdd", async (guild, user) => {
  const log = await db.fetch(guild.id + ".logC")
  const cn = guild.channels.find(r => r.id === log);
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] :boot: ${
      user.tag
    } (\`${user.id}\`) isimli kullanıcı yasaklandı.`
  );
});

client.on("guildBanRemove", async (guild, user) => {
  const log = await db.fetch(guild.id + ".logC")
  const cn = guild.channels.find(r => r.id === log);
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      `:pushpin: ${user.tag} (\`${user.id}\`) isimli kullanıcının yasağı kaldırıldı.`
  );
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  const cn = oldMember.guild.channels.find(
    r => r.id === db.fetch(oldMember.guild.id + ".logC")
  );
  if (!cn) return;
  if (oldMember.nickname !== newMember.nickname) {
    cn.send(
      newMember.nickname === null
        ? `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
            ":pencil: " +
            oldMember.user.tag +
            " (`" +
            oldMember.user.id +
            "`) isimli kullanıcının sunucu içi ismi " +
            newMember.user.username +
            " olarak değiştirilmiştir."
        : `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
            ":pencil: " +
            oldMember.user.tag +
            " (`" +
            oldMember.user.id +
            "`) isimli kullanıcının sunucu içi ismi " +
            newMember.nickname +
            " olarak değiştirilmiştir."
    );
  }
});

client.on("roleUpdate", async (oldRole, newRole) => {
  const cn = oldRole.guild.channels.find(
    r => r.id === db.fetch(newRole.guild.id + ".logC")
  );
  if (!cn) return;
  if (oldRole.name !== newRole.name) {
    cn.send(
      `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
        ":pencil: " +
        oldRole.name +
        " (`" +
        oldRole.id +
        "`) isimli rolün ismi " +
        newRole.name +
        " olarak değiştirilmiştir."
    );
  }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.id) return;
  const cn = oldMsg.guild.channels.find(
    r => r.id === db.fetch(newMsg.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":pencil2: " +
      oldMsg.author.tag +
      " (`" +
      oldMsg.author.id +
      "`) isimli kullanıcı tarafından gönderilen bir mesaj " +
      oldMsg.channel +
      " kanalında düzenlendi.\nEski mesaj: `" +
      oldMsg.content +
      "`\nYeni mesaj: `" +
      newMsg.content +
      "`"
  );
});

client.on("messageDelete", async msg => {
  if (msg.author.bot) return;
  let k = /b\https|http|.com|.net|.org|.gg/gi;
  if (msg.content.match(k)) return;
  const cn = msg.guild.channels.find(
    r => r.id === db.fetch(msg.guild.id + ".logC")
  );
  const kcn = msg.guild.channels.find(
    r => r.id === db.fetch(msg.guild.id + ".kayıtK")
  );
  if (msg.channel === kcn) return;
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":wastebasket: " +
      msg.author.tag +
      " (`" +
      msg.author.id +
      "`) isimli kullanıcı tarafından gönderilen bir mesaj " +
      msg.channel +
      " kanalında silindi.\nMesaj: `" +
      msg.content +
      "`"
  );
});

client.on("emojiCreate", async emoji => {
  const cn = emoji.guild.channels.find(
    r => r.id === db.fetch(emoji.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":key: Sunucuya " +
      emoji +
      " (`" +
      emoji.name +
      "`) emojisi eklenmiştir."
  );
});

client.on("emojiDelete", async emoji => {
  const cn = emoji.guild.channels.find(
    r => r.id === db.fetch(emoji.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":wastebasket: Sunucudan `" +
      emoji.name +
      "` emojisi silinmiştir."
  );
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  const cn = oldEmoji.guild.channels.find(
    r => r.id === db.fetch(oldEmoji.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":pencil: Sunucuda bulunan " +
      oldEmoji +
      " (`" +
      oldEmoji.name +
      "`) emojisinin ismi " +
      newEmoji.name +
      " olarak değiştirilmiştir."
  );
});

client.on("guildMemberAdd", async member => {
  const cn = member.guild.channels.find(
    r => r.id === db.fetch(member.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":inbox_tray: " +
      member.user.tag +
      " (`" +
      member.id +
      "`) isimli kullanıcı sunucuya katıldı. " +
      `(Kullanıcının hesabı ${moment(new Date())
        .diff(member.user.createdAt, "days")
        .toLocaleString()} gün önce kuruldu.)`
  );
});

client.on("guildMemberAdd", async member => {
  const log = await db.fetch(member.guild.id + ".logC")
  const cn = member.guild.channels.find(
    r => r.id === log
  );
  const otor = await db.fetch(member.guild.id + ".otoR")
  const rl = member.guild.roles.find(
    r => r.id === otor
  );
  const kayr = await db.fetch(member.guild.id + ".kayıtsızR")
  const k = member.guild.roles.find(
    r => r.id === kayr
  );
  if (k) {
    member.addRole(k);
    return cn.send(
      `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
        ":inbox_tray: " +
        member.user.tag +
        "(`" +
        member.id +
        "`) isimli kullanıcı kayıt sistemine takıldı. Kayıt kanalına aktarıldı."
    );
  } //yeni bir sunucu daha eklendi :D
  if (!cn || rl === null) return;
  member.addRole(rl);
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":inbox_tray: " +
      member.user.tag +
      " (`" +
      member.id +
      "`) isimli kullanıcıya " +
      rl.name +
      " isimli rol verilmiştir."
  );
});

client.on("guildMemberRemove", async member => {
  const cn = member.guild.channels.find(
    r => r.id === db.fetch(member.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":outbox_tray: " +
      member.user.tag +
      " (`" +
      member.id +
      "`) isimli kullanıcı sunucudan ayrıldı. " +
      `(Kullanıcı sunucuya ${moment(new Date())
        .diff(member.joinedAt, "days")
        .toLocaleString()} gün önce katılmış.)`
  );
});

client.on("messageReactionAdd", async (reaction, user) => {
  const emoji = reaction.emoji;
  const msg = reaction.message;
  const cn = msg.guild.channels.find(
    r => r.id === db.fetch(msg.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":link: " +
      msg.channel +
      " (`" +
      msg.channel.id +
      "`) kanalındaki bir mesaja " +
      user.tag +
      " (`" +
      user.id +
      "`) tarafından " +
      (emoji === undefined
        ? "`" + emoji.name + "`"
        : emoji + " (`" + emoji.name + "`)") +
      " tepkisi eklendi.\nMesaj: `" +
      msg.content +
      "`"
  );
});

client.on("messageReactionRemove", async (reaction, user) => {
  const emoji = reaction.emoji;
  const msg = reaction.message;
  const cn = msg.guild.channels.find(
    r => r.id === db.fetch(msg.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] ` +
      ":link: " +
      msg.channel +
      " (`" +
      msg.channel.id +
      "`) kanalındaki bir mesajdan " +
      user.tag +
      " (`" +
      user.id +
      "`) tarafından " +
      (emoji === undefined
        ? "`" + emoji.name + "`"
        : emoji + " (`" + emoji.name + "`)") +
      " tepkisi kaldırıldı.\nMesaj: `" +
      msg.content +
      "`"
  );
});

client.on("channelCreate", async channel => {
  const t = channel.type;
  const cnl = channel;
  let y;
  if (t === "text") {
    y = "yazı kanalı";
  }
  if (t === "voice") {
    y = "ses kanalı";
  }
  if (t === "category") {
    y = "kategori";
  }
  const cn = channel.guild.channels.find(
    r => r.id === db.fetch(cnl.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(new Date().saatEkle(3), "S:D:s")}**] :package: **#${
      cnl.name
    }** isimli ${y} oluşturulmuştur.`
  );
});

client.on("channelDelete", async channel => {
  const t = channel.type;
  const cnl = channel;
  let y;
  if (t === "text") {
    y = "yazı kanalı";
  }
  if (t === "voice") {
    y = "ses kanalı";
  }
  if (t === "category") {
    y = "kategori";
  }
  const cn = channel.guild.channels.find(
    r => r.id === db.fetch(cnl.guild.id + ".logC")
  );
  if (!cn) return;
  cn.send(
    `[**${await ibidi.tarih(
      new Date().saatEkle(3),
      "S:D:s"
    )}**] :wastebasket: **#${cnl.name}** isimli ${y} silinmiştir.`
  );
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (oldMember.roles.array() !== newMember.roles.array()) {
    var arr = [];
    var x;
    oldMember.roles.forEach(async x => {
      if (!newMember.roles.array().includes(x)) {
        arr.push(x);
      }
    });
    if (newMember.roles.size < oldMember.roles.size)
      x = `[**${await ibidi.tarih(
        new Date().saatEkle(3),
        "S:D:s"
      )}**] :heavy_minus_sign: ${newMember.user.tag} (\`${
        newMember.user.id
      }\`) isimli kullanıcıdan ${
        newMember.guild.roles.find(r => r === arr[0]).name
      } (\`${
        newMember.guild.roles.find(r => r === arr[0]).id
      }\`) isimli rol alınmıştır.`;
    newMember.roles.forEach(async x => {
      if (!oldMember.roles.array().includes(x)) {
        arr.push(x);
      }
    });
    if (newMember.roles.size > oldMember.roles.size)
      x = `[**${await ibidi.tarih(
        new Date().saatEkle(3),
        "S:D:s"
      )}**] :heavy_plus_sign: ${newMember.user.tag} (\`${
        newMember.user.id
      }\`) isimli kullanıcıya ${
        newMember.guild.roles.find(r => r === arr[0]).name
      } (\`${
        newMember.guild.roles.find(r => r === arr[0]).id
      }\`) isimli rol verilmiştir.`;
    const cn = newMember.guild.channels.find(
      r => r.id === db.fetch(newMember.guild.id + ".logC")
    );
    if (!cn) return;
    cn.send(x);
  }
});

Date.prototype.saatEkle = function(h) {
  this.setHours(this.getHours() + h);
  return this;
};

client.davetoluştur = async function(h) {
  if (isNaN(h))
    return (
      "https://discord.gg/" +
      (await this.guilds
        .find(r => r.name === h)
        .channels.random()
        .createInvite()
        .then(x => x.code))
    );
  if (!isNaN(h))
    return (
      "https://discord.gg/" +
      (await this.guilds
        .find(r => r.id === h)
        .channels.random()
        .createInvite()
        .then(x => x.code))
    );
};

client.login(client.ayarlar.token);
