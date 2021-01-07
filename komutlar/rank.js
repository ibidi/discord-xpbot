const Discord = require("discord.js")

exports.run = async (client, msg, args, db) => {
  const message = msg
  var user = msg.mentions.members.first() || msg.guild.members.find(r=>r.id===args[0]) || msg.guild.members.find(r=>r.user.username===args.join(" ")) || msg.guild.members.find(s => s.user.username.match(new RegExp(`${args.slice(0).join(" ")}`, 'g')))
  if(!args[0] || !user) var user = msg.member
  const member = msg.guild.members.get(user.id)
  if(user.user.bot === true) return msg.channel.send("Botların rütbesi olmaz!")
  const xp = db.fetch(user.id+"."+msg.guild.id+".xpp") || 0
  const rank = db.fetch(user.id+"."+msg.guild.id+".rank") || "Bilinmiyor"
  const rankk = msg.guild.roles.find(r=>r.id===rank) || {id:"Bilinmiyor"}
  var sira = ''
	const sorted = message.guild.members.filter(m=>!m.user.bot).array().sort((a, b) => { return (db.fetch(`${b.user.id}.${msg.guild.id}.xpp`) || 0) - (db.fetch(`${a.user.id}.${msg.guild.id}.xpp`) || 0) });
	const top10 = sorted.splice(0, message.guild.members.size)
	const mappedID = top10.map(s => s.user.id);
	for(var s = 0; s < message.guild.members.size; s++) {
		if(mappedID[s] === user.id) {
			sira += `#${s+1}   `
		}
  }
  
  const embed = new Discord.RichEmbed()
  .setAuthor(member.nickname === null ? member.user.username : member.user.username + " - " + member.nickname)
  .setColor(client.ayarlar.renk)
  .addField("XP", xp, true)
  if (db.has(msg.guild.id+".xpRole") === true) {
    let x = db.fetch(user.id+"."+msg.guild.id+".rank");
let y = Object.keys(db.fetch(msg.guild.id+".xpRole")).sort((a, b) => db.fetch(msg.guild.id+".xpRole."+b) - db.fetch(msg.guild.id+".xpRole."+b))
let z = y.slice(y.findIndex(f => f === x)+1);
let a = z.reverse();
let i = db.fetch(msg.guild.id+".xpRole."+a.slice(a.length-1)[0])-db.fetch(user.id+"."+msg.guild.id+".xpp");
if(i > 0 === false) {
var xp2 = "Son rütbeye ulaşılmış."
} else {
var xp2 = `${i} XP sonra bu rütbeye ulaşacaksınız.`
}
if(xp2 === "Son rütbeye ulaşılmış." === true) {
var all = xp2
}
if(xp2 === "Son rütbeye ulaşılmış." === false) {
var all = msg.guild.roles.find(r=>r.id===a.slice(a.length-1)[0]).name + " (" + xp2 + ")"
}
    embed.addField("Mevcut Rütbe", rankk.name || "Bilinmiyor", true)
    embed.addField("Sonraki Rütbe", all, true)
    embed.setDescription("Sıralama" + ": " + sira, true)
  }
  msg.channel.send({embed})
  return
};

exports.bilgi = {
  açık: true,
  kullanımlar: ["xp"],
};

exports.yardım = {
  isim: "rank",
  kategori: "Seviye",
  açıklama: "Girilen kullanıcının ya da sizin rankınızı gösterir.",
  kullanım: "rank [<kullanıcı>]"
};
