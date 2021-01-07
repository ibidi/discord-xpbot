const db = require("quick.db")
const Discord = require("discord.js")
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

exports.run = async (client, message, argüman) => {
        const uptime = moment.duration(client.uptime).format("D [gün], H [saat], m [dakika], s [saniye]");
      //setTimeout(() => {
        const s = new Discord.RichEmbed()
        .setColor(client.ayarlar.renk)
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setDescription(`\`Tomoe#9551\`, sunucunuzu kolay bir şekilde xp sistemi ile yönetmenize yardımcı olur. Bunun yanı sıra eğlence komutları ile sizle iyi bir vakit geçirmeye çalışır.`)
        .addField("Sunucu - Kullanıcı - Süre - Müzik", `
\`${client.guilds.size.toLocaleString()}\` \`${client.guilds.reduce((a, b) => a + b.memberCount, 0)}\` \`${uptime}\` \`${client.voiceConnections.size.toLocaleString()}\``)
        .addField("Botu davet et", `[Buraya tıkla](https://discordapp.com/oauth2/authorize?client_id=736010377208397956&permissions=2146958591&scope=bot)`, true)
        .addField("Destek sunucusu", `[Buraya tıkla](https://discord.gg/N7cdrtE)`, true)
        return message.channel.send(s)
}
            
exports.bilgi = {
  açık: true,
  kullanımlar: ["i","bilgi","destek","davet","bb","istatistik","ibd"],
};

exports.yardım = {
  isim: "botbilgi",
  kategori: "Kullanıcı",
  açıklama: "Bot hakkında genel bilgileri gösterir.",
  kullanım: ""
};
