const db = require("quick.db")

module.exports = async (client, message) => {
  var prefix = db.fetch(`${message.guild.id}.prefix`) || client.ayarlar.prefix
  if (message.author.bot) return;
  const xp = 2
  db.add(message.author.id+"."+message.guild.id+".xpp", xp)
  if(!message.guild) return;
  let m = message;
  
  if (db.has(`${m.guild.id}.xpRole`) === true) {
    let x = Object.keys(db.fetch(`${m.guild.id}.xpRole`))
    x.forEach(veri => {
      if (db.fetch(`${m.author.id}.${m.guild.id}.xpp`) >= db.fetch(`${m.guild.id}.xpRole.${veri}`)) {
      
        if (m.member.roles.has(veri) === true) return
        else {
          if(db.has(m.guild.id+".oneXProle") === true) {
            if(db.has(m.author.id+"."+m.guild.id+".rank")) {
              m.member.removeRole(m.guild.roles.find(r=>r.name===`${db.fetch(m.author.id+"."+m.guild.id+".rank")}`))
              m.member.addRole(m.guild.roles.get(`${veri}`))
            } else {
              m.member.addRole(m.guild.roles.get(`${veri}`)).catch(err => {
                return;
              })
            }
          } else {
            m.member.addRole(m.guild.roles.get(`${veri}`)).catch(err => {
                return;
              })
          }
          db.set(m.author.id+"."+m.guild.id+".rank", m.guild.roles.get(`${veri}`).id)
          return m.channel.send("{emoji} Tebrikler **{user}**! Şu anki rütben **{role}**.".replace("{emoji}", `:up:`).replace("{user}", m.author.tag).replace("{role}", m.guild.roles.get(`${veri}`).name))

        };
      if (db.fetch(`${m.author.id}.${m.guild.id}.xpp`) < db.fetch(`${m.guild.id}.xpRole.${veri}`)) {
      
        if (m.member.roles.has(veri) === true) return// bu kısım ne
        else {
          if(db.has(m.guild.id+".oneXProle") === true) {
            if(db.has(m.author.id+"."+m.guild.id+".rank")) {
              m.member.addRole(m.guild.roles.find(r=>r.name===`${db.fetch(m.author.id+"."+m.guild.id+".rank")}`))
              m.member.removeRole(m.guild.roles.get(`${veri}`))
            } else {
              m.member.removeRole(m.guild.roles.get(`${veri}`)).catch(err => {
                return;
              })
            }
          } else {
            m.member.removeRole(m.guild.roles.get(`${veri}`)).catch(err => {
                return;
              })
          }
          db.delete(m.author.id+"."+m.guild.id+".rank")
          return m.channel.send("**{user}**, **{role}** rolü için gerekli XP'nin altına düştüğün için rolün geri alındı.".replace("{user}", m.author.tag).replace("{role}", m.guild.roles.get(`${veri}`).name))

        };
        
      };
      };
    });
  };
  
}