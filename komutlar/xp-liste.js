exports.run = async (client, msg, args, db) => {
    if(db.has(msg.guild.id+".xpRole") === false) {
    var x = "Hiç XP rolü ayarlanmamış."
  } else {
    var xx = Object.keys(db.fetch(`${msg.guild.id}.xpRole`))
  var arr = []
  xx.forEach(r => {
    arr.push(db.fetch(`${msg.guild.id}.xpRole.${r}`))
  });
  var x = arr.sort((a,b) => a - b)
var y = x.map(xp => "> \"{role}\" rolü için \"{xp} XP\" gerekiyor.".replace("{role}", msg.guild.roles.get(`${db.fetch(`${msg.guild.id}.xpRoleXP.${xp}`)}`).name).replace("{xp}", xp)).join("\n")
}
msg.channel.send(`\`\`\`json
📋 ${"( {name} ) Sunucusunun XP Ödülleri".replace("{name}", msg.guild.name)}

${y || "\"Hiç XP rolü ayarlanmamış.\""}\`\`\``)
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "xp-liste",
  kategori: "Seviye",
  açıklama: "Belirlenen XP'ye gelen kullanıcılara verilecek rolleri listeler.",
  kullanım: ""
};
