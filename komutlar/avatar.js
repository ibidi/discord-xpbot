const Discord = require('discord.js');

exports.run = (client, message, args) => {
    
    let user;
    
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    
    const avatar = new Discord.RichEmbed()
        .setAuthor(`${user.username} - kullanıcısının avatarı`)
        .setColor(0x36393E)
        .setImage(user.avatarURL)
    message.channel.send(avatar)
    
};

exports.bilgi = {
  açık: true,
  kullanımlar: ['fish']
};

exports.yardım = {
  isim: "avatar",
  kategori: "Kullanıcı",
  açıklama: "Etiketlediğiniz kullanıcının avatarını gösterir.",
  kullanım: "avatar @Kullanıcı"
};
