exports.run = async (client, msg, args, db) => {
    const message = msg
    const y = args.join(" ")
    if(!y) return msg.channel.send("Lütfen bir rol gir.")
    const rol = msg.mentions.roles.first() || msg.guild.roles.find(r=>r.name===y) || msg.guild.roles.get(y)
    if(!rol) return msg.channel.send(`\`${y}\` isimli/ID'li bir rol bulunamadı.`)
    if(db.has(message.guild.id+".xpRole."+rol.id) === false) return msg.channel.send(`\`${y}\` isimli bir XP rolü bulunamadı.`)
    if(db.has(msg.guild.id+".xpRole") === true) {
      if(Object.keys(db.fetch(msg.guild.id+".xpRole")).length === 1) {
         db.delete(message.guild.id+".xpRoleXP")
        db.delete(msg.guild.id+".xpRole")
        message.channel.send(`<a:ibidi_onay:776800196314529822> ${"`{data1}` isimli XP rolü başarıyla silinmiştir.".replace("{data1}", rol.name)}`)
        return
      }
    }
    db.delete(message.guild.id+".xpRoleXP."+db.fetch(message.guild.id+".xpRole."+rol.id))
    db.delete(message.guild.id+".xpRole."+rol.id)
    message.channel.send(`<a:ibidi_onay:776800196314529822> ${"`{data1}` isimli XP rolü başarıyla silinmiştir.".replace("{data1}", rol.name)}`)
    return
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "xp-sil",
  yetki: "MANAGE_ROLES", 
  kategori: "Seviye",
  açıklama: "Ayarlanmış olan bir XP ödülünü siler.",
  kullanım: "xp-ödül-sil [rol]"
};
