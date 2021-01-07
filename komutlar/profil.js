const Discord = require('discord.js');
const request = require('node-superfetch');
const jimp = require('jimp');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");
const Canvas = require('canvas');
const db = require("quick.db");

exports.run = async (client, msg, args) => {
  var user = msg.mentions.members.first() || msg.guild.members.find(r=>r.id===args[0]) || msg.guild.members.find(r=>r.user.username===args.join(" ")) || msg.guild.members.find(s => s.user.username.match(new RegExp(`${args.slice(0).join(" ")}`, 'g')))
  if(!args[0] || !user) { var user = msg.author }
  const member = msg.guild.members.get(user.id);
  if(member.user.bot) return msg.channel.send("Botların profilini görüntüleyemem.")
  
  //XP ROL BÖLÜMÜ
  if(db.has(msg.guild.id+".xpRole") === true) {
    
    let x = db.fetch(user.id+"."+msg.guild.id+".rank");
    let y = Object.keys(db.fetch(msg.guild.id+".xpRole")).sort((a, b) => db.fetch(msg.guild.id+".xpRole."+b) - db.fetch(msg.guild.id+".xpRole."+b))
    let z = y.slice(y.findIndex(f => f === x)+1);
    let a = z.reverse();
    let i = db.fetch(msg.guild.id+".xpRole."+a.slice(a.length-1)[0])
    
    if(i > 0 === false) {
      var xp2 = db.fetch(user.id+"."+msg.guild.id+".xpp")
    } else {
      var xp2 = `${i}`
    }
    if(xp2 === db.fetch(user.id+"."+msg.guild.id+".xpp") === true) {
      var all = xp2
    }
    
  } else {
    var xp2 = db.fetch(user.id+"."+msg.guild.id+".xpp")
    var all = xp2
  }
  
  //XP SIRA BÖLÜMÜ
  var sira = ''
	const sorted = msg.guild.members.filter(m=>!m.user.bot).array().sort((a, b) => { return (db.fetch(`${b.user.id}.${msg.guild.id}.xpp`) || 0) - (db.fetch(`${a.user.id}.${msg.guild.id}.xpp`) || 0) });
	const top10 = sorted.splice(0, msg.guild.members.size)
	const mappedID = top10.map(s => s.user.id);
	for(var s = 0; s < msg.guild.members.size; s++) {
	  if(mappedID[s] === user.id) {
			sira += `${s+1}   `
		}
  }
  
  msg.channel.startTyping();
  var allxp = Object.keys(db.fetch(user.id)).filter(r=>r!=="rozetler"&&r!=="moneyDurumA"&&r!=="profil"&&r!=="repDurum"&&r!=="profilP"&&r!=="arkaplanlar"&&r!=="rozetlers").map(x => db.fetch(user.id+"."+x+".xpp")).reduce((y , z) => y + z)
  const rank = db.fetch(user.id+"."+msg.guild.id+".rank") || "Bilinmiyor"
  const rankk = msg.guild.roles.find(r=>r.id===rank) || {id:"Bilinmiyor"}
  
  var canvas = Canvas.createCanvas(600, 600);
  const ctx = canvas.getContext('2d');
  
  var resim = await db.fetch(`profilP_${user.id}`)  
  if(!resim) {
    resim = "https://cdn.tatsu.gg/core/22703013b945029c4ed1e3e7034f886dc7285a42.png"
  }
  const {body: downloadedImageBuffer} = await snekfetch.get(resim);
  const background = await Canvas.loadImage( downloadedImageBuffer );
  round(0, 0, canvas.width, canvas.height, 30);
  ctx.clip();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  const {body: dclogo} = await snekfetch.get("https://icon-library.net/images/discord-icon-colors/discord-icon-colors-26.jpg");
  const dclogoo = await Canvas.loadImage( dclogo );
  const {body: konusmabalon} = await snekfetch.get("https://discordapp.com/assets/f2d2183f4b21d53a9e0885fc78d9c766.svg");
  const konusmabalonu = await Canvas.loadImage( konusmabalon );

  const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  const path = require('path')
  
  const prototip = await Canvas.loadImage("https://cdn.glitch.com/240003ee-f6b4-4ce6-bb54-657483648063%2Fsxxx.png?v=1588855406466")
  ctx.drawImage(prototip, 0, 0, canvas.width, canvas.height);

  /*
  ctx.beginPath();
  ctx.globalAlpha = 0.75
  ctx.fillStyle = "#2a2c32";
  ctx.strokeStyle = "black";
  ctx.fillRect(10, 143, 370, 44);
  ctx.stroke();
  ctx.globalAlpha = 1
  ctx.font=`bold 18px Arial`;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${member.user.username}#${member.user.discriminator}`, 160, 164);
  ctx.drawImage(dclogoo, 137, 144, 25, 25);
  ctx.beginPath();
  ctx.globalAlpha = 0.30
  ctx.fillStyle = "black";
  ctx.fillRect(10, 185, 130, 200);
  ctx.globalAlpha = 1
  ctx.fillStyle = "#7289DA";
  ctx.fillRect(10, 185, 130, 44);
  ctx.globalAlpha = 1
  ctx.fillStyle = "#FFF";
  ctx.globalAlpha = 0.70
  ctx.fillRect(140, 186, 240, 200);
  ctx.globalAlpha = 1
  ctx.font=`bold 19px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(`${db.fetch(member.id+".profil.rep") || "0"} Övgü`, 70, 218);
  ctx.drawImage(avatar, 22, 87, 107, 107);
  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "white";
  ctx.rect(22, 87, 107, 107);
  ctx.stroke();
  ctx.fillStyle = "#FFFFFF";
  ctx.globalAlpha = 0.80
  ctx.fillRect(157, 199, 202, 23)
  ctx.strokeStyle = "gray";
  ctx.lineWidth = "6";
  ctx.rect(157, 199, 202, 23)
  ctx.fillStyle = "#8c9eff";
  ctx.globalAlpha = 1;
  var xp = db.fetch(member.id+"."+msg.guild.id+".xpp") || "0"
  if (xp > xp2) xp = xp;
  ctx.fillRect(160, 201, xp / xp2 * 198, 19);
  ctx.globalAlpha = 1;
  
  ctx.fillStyle = "black";
  ctx.font = '14px Ubuntu';
  ctx.fillText(`Küresel XP`, 250, 250);
  //ctx.fillText(`Sunucu Puan`, 250, 265);
  ctx.fillText(`Krediler`, 241, 265);
  ctx.textAlign = "right" 
  ctx.fillText(allxp, 365, 250);
  //ctx.fillText(`${xp}`, 365, 265);
  ctx.fillText(db.fetch(member.id+".profil.money") || 0, 365, 265);

  
  
  
  ctx.font = '15px Arial';
  ctx.textAlign = "center"
  ctx.fillText(`XP: ${xp} / ${xp2}`, 258, 217);
  //ctx.drawImage(konusmabalonu, 150, 280, 25, 25);
  ctx.font = `16px Ubuntu Condensed Regular Arial`;
  ctx.fillText("Bilgi", 170, 300);//215, 300
  ctx.font = '14px Arial';
  ctx.textAlign = "left";
  ctx.font=`14px Ubuntu Condensed Regular`;
  if(db.has(user.id+".profil.açıklama")) {
    if(db.fetch(user.id+".profil.açıklama").length >= 27) {
      ctx.fillText(`${db.fetch(user.id+".profil.açıklama").substr(0, 27).endsWith(" ") ? db.fetch(user.id+".profil.açıklama").substr(0, 26) + db.fetch(user.id+".profil.açıklama").charAt(27).replace(" ", "") : db.fetch(user.id+".profil.açıklama").substr(0, 27)}`, 155, 325);
      ctx.fillText(`${db.fetch(user.id+".profil.açıklama").substr(27, db.fetch(user.id+".profil.açıklama").length).startsWith(" ") ? db.fetch(user.id+".profil.açıklama").substr(28, db.fetch(user.id+".profil.açıklama").length) + db.fetch(user.id+".profil.açıklama").charAt(27).replace(" ", "") : db.fetch(user.id+".profil.açıklama").substr(27, db.fetch(user.id+".profil.açıklama").length)}`, 155, 345);
    } else {
      ctx.fillText(`${db.fetch(user.id+".profil.açıklama")}`, 155, 325);
    }
  } else {
    ctx.fillText(`!!açıklama ile değiştirebilirsiniz.`, 155, 325); // ${member.user.username}
  }
  //rozet bölümü*/
  //rozetler
  const {body: turkiye} = await snekfetch.get("https://cdn4.iconfinder.com/data/icons/world-flags-circular/1000/Flag_of_Turkey_-_Circle-512.png");
  const {body: discord} = await snekfetch.get("https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png");
  const {body: spotify} = await snekfetch.get("https://media.discordapp.net/attachments/708235083185913877/709382006097576056/Flag_of_Turkey_-_Circle-512.png?width=418&height=418")
  const {body: ibd} = await snekfetch.get("https://media.discordapp.net/attachments/708235083185913877/709372622454128700/Flag_of_Turkey_-_Circle-512.png?width=418&height=418")
  const {body: steam} = await snekfetch.get("https://media.discordapp.net/attachments/708235083185913877/709386504522170460/Flag_of_Turkey_-_Circle-512.png?width=418&height=418")
  const {body: youtube} = await snekfetch.get("https://media.discordapp.net/attachments/708235083185913877/709390736516448416/Flag_of_Turkey_-_Circle-512.png?width=418&height=418")
  const turkiyeL = await Canvas.loadImage(turkiye)
  const discordL = await Canvas.loadImage(discord)
  const spotifyL = await Canvas.loadImage(spotify)
  const ibdL = await Canvas.loadImage(ibd)
  const steamL = await Canvas.loadImage(steam)
  const youtubeL = await Canvas.loadImage(youtube)
  let a = {
    "turkiye": turkiyeL,
    "discord": discordL,
    "spotify": spotifyL,
    "ibd": ibdL,
    "steam": steamL,
    "youtube": youtubeL
  }
  if (db.has(user.id+".rozetler")) {
    let asd = Object.keys(db.get(user.id+".rozetler"))
    for (var i = 0; i < asd.length; i++) {
      if (i < 3) {
        ctx.drawImage(a[asd[i]], (i === 0 ? 390 : (i === 1 ? 457 : (i === 2 ? 524 : ""))), 320, 60, 60)
      } else if (i < 6) {
        ctx.drawImage(a[asd[i]], (i === 3 ? 390 : (i === 4 ? 457 : (i === 5 ? 524 : ""))), 390, 60, 60)
      } else if (i < 9) {
        ctx.drawImage(a[asd[i]], (i === 6 ? 390 : (i === 7 ? 457 : (i === 8 ? 524 : ""))), 460, 60, 60)
      }
    }
  } 
  // üst rozet
    //rozetler
  const {body: staff} = await snekfetch.get("https://images-ext-1.discordapp.net/external/K6h68zmapLfpSTnLXTmjKILXl_9JlDJN3N5D63wsi2A/https/images-ext-2.discordapp.net/external/I4My7uonF1jBXANJt_anWjenB5HQJ1ngbsuPlK9TR4Q/%253Fv%253D1/https/cdn.discordapp.com/emojis/314068430787706880.png");
  const {body: mod} = await snekfetch.get("https://images-ext-2.discordapp.net/external/4Oe-4yeWNKwkKYumXVhuwXeJLG7fE3T1gwepJAZdIHI/https/media.discordapp.net/attachments/708235083185913877/709454140207661116/flash.png")
  const {body: beta} = await snekfetch.get("https://images-ext-1.discordapp.net/external/oOxT8CPd7o59VKEJHVDBWb0bePKzBBE2e3lYK_0CWLs/https/media.discordapp.net/attachments/708235083185913877/709454721299251241/bocek.png")
  const betaL = await Canvas.loadImage(beta)
  const modL = await Canvas.loadImage(mod)
  const staffL = await Canvas.loadImage(staff)
  let b = {
    "staff": staffL,
    "mod": modL,
    "beta": betaL
  }
  if (db.has(user.id+".rozetlers")) {
    let asd = Object.keys(db.get(user.id+".rozetlers"))
    for (var i = 0; i < asd.length; i++) {
      if (i < 3) {
        ctx.drawImage(b[asd[i]], (i === 0 ? 165 : (i === 1 ? 200 : (i === 2 ? 235 : ""))), 140, 30, 30)
      } else if (i < 6) {
        ctx.drawImage(b[asd[i]], (i === 3 ? 390 : (i === 4 ? 457 : (i === 5 ? 524 : ""))), 390, 60, 60)
      } else if (i < 9) {
        ctx.drawImage(b[asd[i]], (i === 6 ? 390 : (i === 7 ? 457 : (i === 8 ? 524 : ""))), 460, 60, 60)
      }
    }
  } 
  
  
  ctx.beginPath();
  //ctx.lineWidth = "2";
  //ctx.strokeStyle = "white";
  //ctx.rect(22, 87, 107, 107);
  //ctx.stroke();
  //ctx.fillStyle = "#FFFFFF";
  //ctx.globalAlpha = 0.80
  //ctx.fillRect(157, 199, 202, 23)
  //ctx.strokeStyle = "gray";
  //ctx.lineWidth = "6";
  //ctx.rect(157, 199, 202, 23)

  const bar = await Canvas.loadImage("https://cdn.glitch.com/240003ee-f6b4-4ce6-bb54-657483648063%2FRectangle%20122.png?v=1588857701173")
  var xp = db.fetch(member.id+"."+msg.guild.id+".xpp") || "0"
  if (xp > xp2) xp = xp;
   
  ctx.fillStyle = "#929292"
  roundedRectangle(20, 262, xp / xp2 * 352, 40, 10);
  ctx.fill();     
  
  function roundedRectangle(x, y, width, height, rounded) {
    const radiansInCircle = 2 * Math.PI
    const halfRadians = (2 * Math.PI)/2
    const quarterRadians = (2 * Math.PI)/4  

    ctx.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true)
    ctx.lineTo(x, y + height - rounded)
    ctx.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true)  
    ctx.lineTo(x + width - rounded, y + height)
    ctx.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true)  
    ctx.lineTo(x + width, y + rounded)  
    ctx.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true)  
    ctx.lineTo(x + rounded, y)  
  }
  //round(20, 262, xp / xp2 * 352, 40, 10);
  //ctx.clip();
  //ctx.drawImage(bar, 20, 262, xp / xp2 * 352, 40);
  //ctx.clip();
  //ctx.fillRect(20, 262, xp / xp2 * 352, 40);
  //ctx.globalAlpha = 1;
  //fillround(20, 262, xp / xp2 * 352, 40).stroke();
  
  
  ctx.font=`bold 34px Arial`;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(member.user.username, 170, 202);
  
  //ctx.font=`bold 38px Arial`;
  //ctx.fillStyle = "#FFFFFF";
  //ctx.fillText("#" + member.user.discriminator, 34, 60);
  
  //ctx.font=`bold 25px Arial`;
  //ctx.fillStyle = "#FFFFFF";
  //ctx.fillText(msg.member.nickname, 171, 233);
  
  ctx.font=`bold 25px Arial`;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("xp", 30, 290);
  
  ctx.font=`bold 25px Arial`;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Küresel XP", 53, 356);
  
  ctx.font=`bold 25px Arial`;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Kredi", 53, 391);
  
  ctx.font=`bold 25px Arial`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "right";
  ctx.fillText(allxp, 343, 356);
  
  ctx.font=`bold 25px Arial`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "right";
  ctx.fillText(db.fetch(member.id+".profil.money") || 0, 343, 391);
  
  //ctx.font=`bold 38px Arial`;
  //ctx.fillStyle = "#FFFFFF";
  //ctx.textAlign = "right";
  //ctx.fillText("", 564, 60);
  
  ctx.font=`bold 30px Arial`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("+" + (db.fetch(member.id+".profil.rep") || "0" + " övgü"), 480, 293);
  
    
  ctx.font = `bold 25px Ubuntu Condensed Regular Arial`;
  ctx.fillText("Açıklama", 115, 443);//215, 300
  ctx.font = '14px Arial';
  ctx.textAlign = "left";
  ctx.font=`25px Charmonman`;
  if(db.has(user.id+".profil.açıklama")) {
    if(db.fetch(user.id+".profil.açıklama").length >= 27) {
      ctx.fillText(`${db.fetch(user.id+".profil.açıklama").substr(0, 27).endsWith(" ") ? db.fetch(user.id+".profil.açıklama").substr(0, 26) + db.fetch(user.id+".profil.açıklama").charAt(27).replace(" ", "") : db.fetch(user.id+".profil.açıklama").substr(0, 27)}`, 25, 480);
      ctx.fillText(`${db.fetch(user.id+".profil.açıklama").substr(27, db.fetch(user.id+".profil.açıklama").length).startsWith(" ") ? db.fetch(user.id+".profil.açıklama").substr(28, db.fetch(user.id+".profil.açıklama").length) + db.fetch(user.id+".profil.açıklama").charAt(27).replace(" ", "") : db.fetch(user.id+".profil.açıklama").substr(27, db.fetch(user.id+".profil.açıklama").length)}`, 25, 510);
    } else {
      ctx.fillText(`${db.fetch(user.id+".profil.açıklama")}`, 25, 480);
    }
  } else {
    ctx.fillText(`!!açıklama ile değiştirebilirsiniz.`, 25, 480); // ${member.user.username}
  }
  
  ctx.font=`25px Charmonman`;
  if(db.has(user.id+".profil.kaçıklama")) {
      ctx.fillText(`${db.fetch(user.id+".profil.kaçıklama")}`, 171, 233);
  } else {
    ctx.fillText(` `, 171, 233); // ${member.user.username}
  }
  
  const AvatarURL = member.user.displayAvatarURL === null ? 'https://cdn.discordapp.com/avatars/407455869643784192/511f11ebdbab4536f66960390e95ddbf.png?size=256' : member.user.displayAvatarURL
  const Avatar = await Canvas.loadImage(AvatarURL)
  round(20, 116, 128, 128, 30);
  ctx.clip();
  ctx.drawImage(Avatar, 20, 116, 128, 128);

  
  function round(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
  
  const attachment = new Discord.Attachment(canvas.toBuffer(), "profile.png");
    msg.channel.stopTyping();
    msg.channel.send(`:frame_photo: | **${member.user.username} kullanıcısının profil kartı**`,attachment)
    
};

exports.bilgi = {
	açık: true,
  kullanımlar: [],
}

exports.yardım = {
  kategori: "Seviye",
  isim: "profil",
  açıklama: "Girilen kişinin ya da sizin profilinize bakarsınız.",
  kullanım: "profil [<kullanıcı>]"
}