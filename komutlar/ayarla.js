const Discord = require('discord.js')

exports.run = async (client, message, args, db, queue, dbl) => {
	const p = db.fetch(message.guild.id+".prefix") || client.ayarlar.prefix
	 var x = args
   var k = args
	 const m = message
    const a = ["ayarla", "sil", "göster"]
    const b = [
    	{"kayıt-kanal": "kanal"}
    ]
    const bb = ["kayıt-kanal"]
    if(!x[0] || !a.includes(k[0])) return m.channel.send(`${exports.help.name} komudu 3 argümanlıdır. (\`[${await a.join(", ")}] [${await bb.join(", ")}] [kanal/rol/seçenek]\`) sen ${m.content.split(" ").slice(1).length} argüman girmişsin.`)
  	if(!x[1] || !bb.includes(k[1])) return m.channel.send(`${exports.help.name} komudu 3 argümanlıdır. (\`[${await a.join(", ")}] [${await bb.join(", ")}] [kanal/rol/seçenek]\`) sen ${m.content.split(" ").slice(1).length} argüman girmişsin.`)


	const i = bb.findIndex(a => a === x[1])
	const xx = b[i]
	const y = xx[Object.keys(xx)[0]]
	const xxx = bb[i]
	const xy = Object.keys(xx)[0].replace("kayıt-kanal", "logC")

	if(x[0] === "sil")  {
		if(!db.has(m.guild.id+"."+xy)) return m.channel.send(kilit+" `"+x[1]+"` ayarı ayarlanmadığı için silinemiyor.")
		db.delete(m.guild.id+"."+xy)
		m.channel.send(evet+" `"+x[1]+"` ayarı silindi.")
	}
	if(x[0] === "göster") {
		if(!db.has(m.guild.id+"."+xy)) return m.channel.send(kilit+" `"+x[1]+"` ayarı ayarlanmadığı için gösterilemiyor.")
		m.channel.send("`"+x[1]+"` ayarı **"+db.fetch(m.guild.id+"."+xy+"** verisine eşit."))
	}
	if(x[0] === "ayarla") {
		if(y === "kanal") {
			var ii = m.mentions.channels.first() || m.guild.channels.find(r=>r.id===k[2])
			if(!k[2]) return m.channel.send(`${exports.help.name} komudu 3 argümanlıdır. (\`kanal|id\`) sen ${m.content.split(" ").slice(1).length} argüman girmişsin.`)
      if(!ii) return m.channel.send(kilit+" **"+x.slice(2).join(" ")+"** isimli kanal bulunamadı.")
			var arg = ii
		}
		if(y === "rol") {
			var ii = m.mentions.roles.first() || m.guild.roles.find(r=>r.name===x.slice(2).join(" "))
			if(!k[2]) return m.channel.send(`${exports.help.name} komudu 3 argümanlıdır. (\`rol|isim\`) sen ${m.content.split(" ").slice(1).length} argüman girmişsin.`)
			if(!ii) return m.channel.send(kilit+" `"+x.slice(2).join(" ")+"` isimli rol bulunamadı.")
			var arg = "`"+ii.name+"`"
		}
		if(y === "seçenek") {
			var iii = ["aç", "kapat"]
			if(!k[2] || !iii.includes(k[2])) return m.channel.send(`${exports.help.name} komudu 3 argümanlıdır. (\`aç:kapat\`) sen ${m.content.split(" ").slice(1).length} argüman girmişsin.`)
			var arg = "`"+k[2]+"`"
		}
		y === "seçenek" ? (k[2] === "aç" ? db.set(m.guild.id+"."+xy, true) : db.delete(m.guild.id+"."+xy)) : db.set(m.guild.id+"."+xy, ii.id)
		m.channel.send(evet+" `"+x[1].replace("-", " ")+"` ayarı başarıyla "+arg+" olarak ayarlandı.")
}
} 

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "ayarla",
  yetki: "MANAGE_CHANNELS",
  kategori: "Ayar",
  açıklama: "Bot için gerekli kanalları seçerek ayarlarsınız.",
  kullanım: "ayarla [ayarla/sil/göster] [anahtar] [veri]"
};
