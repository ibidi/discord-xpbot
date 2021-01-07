exports.run = async (client, msg, args, db) => {
    let x = args[0]
    if(!x || isNaN(x)) return msg.channel.send("Lütfen bir sayı gir.")
    const y = args.join(" ").slice(x.length+1)
    if(!y) return msg.channel.send("Lütfen bir rol gir.")
    const rol = msg.mentions.roles.first() || msg.guild.roles.find(r=>r.name===y) || msg.guild.roles.get(y)
    if(!rol) return msg.channel.send(`\`${y}\` isimli bir rol bulunamadı.`)
    db.set(`${msg.guild.id}.xpRole.${rol.id}`, x)
    db.set(msg.guild.id+".xpRoleXP."+x, rol.id)

    msg.channel.send(`<a:ibidi_onay:776800196314529822> ${"Artık bir kullanıcı {data1} XP'ye ulaştığında, {data2} isimli rol ona verilecek. Eğer bu rolü XP rollerinden silmek isterseniz `{prefix}xp-ödül-sil {data1}` yazın.".replace("{data1}", "**"+x+"**").replace("{data2}", "**"+rol.name+"**").replace("{data1}", rol.name).replace("{prefix}", db.fetch(msg.guild.id+".prefix") || client.ayarlar.prefix)}`)

};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "xp-ekle",
  yetki: "MANAGE_ROLES", 
  kategori: "Seviye",
  açıklama: "Belirlenen XP'ye gelen kullanıcıya verilecek rolü ayarlar.",
  kullanım: "xp-ödül-ekle [rol] [xp]"
};
