const Discord = require('discord.js')
const moment = require("moment")
require("moment-duration-format")

exports.run = async (client, msg, args, db) => {
    var kod = args.slice(0).join(" ");
    if (!kod) return msg.channel.send(`ibd hayde kod gir bro`)
    
    const message = msg;
    
    try {
      function clean(yazik) {
        if (typeof yazik !== 'string')
          yazik = require('util').inspect(yazik, { depth: 0 })
          yazik = yazik
            .replace(/`​​/g, '`​​' + String.fromCharCode(8203))
            .replace(/@​​/g, '@​​' + String.fromCharCode(8203))
        return yazik;
      }
      var y = clean(await eval(kod))
      //var y = await eval(`(async function(){return ${kod.replace(/“|”/g, "\"")}}).call()`);
      //y = require("util").inspect(y, { depth: 0 }).substring(0, 1900)
      msg.channel.send(y, {split: true, code: "js"})
    } catch(err) {
      msg.channel.send("**Hata;**")
      msg.channel.send(err, {split: true, code: "js"})
    }
    
};

function duration(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const today = new Date();
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(seconds / 60);
  const months = Math.round(minutes / 438290639);


  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${ seconds } saniye önce`;
  } else if (seconds < 90) {
    return '1 dakika gibi bir süre önce';
  } else if (minutes < 60) {
    return `${ minutes } dakika önce`;
  } else if (hours <= 3600) {
    return `${ hours } saat önce`;
  } else if (months >= 3600) {
    return `${ months } ay önce`;
  }
}

exports.bilgi = {
	açık: true,
  kullanımlar: ["ev"],
}

exports.yardım = {
  kategori: "Admin",
  isim: "eval",
  açıklama: "Kod çalıştırmak için kullanılır.",
  kullanım: "eval [kod]"
}