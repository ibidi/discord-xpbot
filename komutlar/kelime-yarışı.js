const Discord = require("discord.js");
const { randomRange, verify } = require('../util/Util.js');

exports.run = async (client, message, args) => {
const filter = m => m.channel.id === message.channel.id;

  const sessions = new Set();
  
  let opponent = message.mentions.users.first()
  if (!opponent) return message.reply("Oynamak istediğin kişiyi **etkiketle.**")
  
    if (opponent.bot) return message.reply('Botlar ile kelime yarışı **yapamazsın!**');
    if (opponent.id === message.author.id) return message.reply('Kendin ile kelime yarışı **yapamazsın!**');
                if (sessions.has(message.channel.id)) return message.reply('Bu kanalda zaten **oyun oynanıyor!**');
                sessions.add(message.channel.id);
                try {
                if (!opponent.bot) {
                await message.channel.send(`${opponent}, Kelime yarışı isteği **geldi.** Kelime yarışını kabul **ediyor musun?** **[**\`evet\` **veya** \`hayır\` olarak cevap veriniz**]**`);
                 const verification = await verify(message.channel, opponent);
                 if (!verification) {
                 sessions.delete(message.channel.id);
                 return message.channel.send(`Kelime yarışı kabul **edilmedi.**`);
                }
                  
               }
       await message.channel.send(`${message.author} **ve** ${opponent} hazırlanın...`)
      let random = Math.floor(Math.random()*10);
      let sure = random * 1000
      let haznes = ['Hemen **Evet** YAZ!', 'Hemen **Hayır** YAZ!', 'Hemen **Tavuk** YAZ!', 'Hemen **Köpek** YAZ!', 'Hemen **Kedi** YAZ!', 'Hemen **İnsan** YAZ!', 'Hemen **Lahmacun** YAZ!']
      const hazne = haznes[Math.floor(Math.random() * haznes.length)];
      
      setTimeout(async()=>{
      await message.channel.send(hazne).then(async msg => {
      let neblm = false;
      let kelime;  
      if (msg == 'Hemen **Evet** YAZ!') kelime = 'Evet'
     else if (msg == 'Hemen **Hayır** YAZ!') kelime = 'Hayır'
     else if (msg == 'Hemen **Tavuk** YAZ!') kelime = 'Tavuk'
     else if (msg == 'Hemen **Köpek** YAZ!') kelime = 'Köpek'
     else if (msg == 'Hemen **Kedi** YAZ!') kelime = 'Kedi'
     else if (msg == 'Hemen **İnsan** YAZ!') kelime = 'İnsan'
     else if (msg == 'Hemen **Lahmacun** YAZ!') kelime = 'Lahmacun'
     else return console.log('Bir hata var!')
        
        
      while(!neblm){
        console.log(kelime)
        const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
          if(!response.size){
           await message.channel.send('⏱️ Üzgünüm, kimse mesaj yazmadığı için zaman **doldu.**');
          sessions.delete(message.channel.id);
          break;
        }
        if (message.channel.lastMessage.author.id == message.author.id || message.channel.lastMessage.author.id == opponent.id) {
          const choice = response.first().content
          if(choice === kelime) neblm = true;
        } else {
          console.log('oWo')
        }
      }
        sessions.delete(message.channel.id);
        if(neblm) return message.channel.send(`Tebrikler! ${message.channel.lastMessage.author} kazandı!`);
        else return console.log('uWu')
      })
      }, sure)
        
       } catch (err) {
         sessions.delete(message.channel.id);
         throw err;
       }
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "kelime-yarışı",
  kategori: "Oyun",
  açıklama: "Kelime yarışı oyununu oynarsınız.",
  kullanım: "kelime-yarışı"
};
