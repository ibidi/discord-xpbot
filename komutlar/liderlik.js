const Discord = require('discord.js');
const request = require('node-superfetch');

const db = require('quick.db');

exports.run = async (client, message, args) => {
	
var sira = ''
    const sorted = message.guild.members.filter(m=>!m.user.bot).array().sort((a, b) => { return (db.fetch(`${b.user.id}.${message.guild.id}.xpp`) || 0) - (db.fetch(`${a.user.id}.${message.guild.id}.xpp`) || 0) });
  var top10 = ''  
  if(!args[0]) {
      var top10 = sorted.splice(0, 10)
    }
  if(args[0]) {
      var top10 = sorted.splice(0, args[0])
      if (isNaN(args[0])) {
      var top10 = sorted.splice(0, 10)
      }
    }
  
  if(args[0] > 51) { var top10 = sorted.splice(0, 50) }
    
  const cmds = Array.from(top10.keys())
  const longest = cmds.reduce((long, str) => Math.max(long, str.length), 0);
  
  var sira = 1
  
  const map = top10.map(s=>`[${sira++}]    > #${s.nickname ? s.nickname : s.user.username} [${db.fetch(`${s.user.id}.${message.guild.id}.xpp`) || 0} XP]`).join('\n')
   
   message.channel.send(`:city_dusk: **| ${message.guild.name} Sunucusunun Liderlik Sıralaması **

\`\`\`json
📋 Sıra - Kullanıcı

${map}\`\`\``)//İlk ${args[0] || "10"} Kişi**
  
};

exports.bilgi = {
	açık: true,
  kullanımlar: [],
}

exports.yardım = {
  kategori: "Seviye",
  isim: "liderlik",
  açıklama: "Liderlik tablosunu gösterir.",
  kullanım: "liderlik"
}