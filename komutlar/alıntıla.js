const Discord = require("discord.js");

exports.run = async (client, message, argüman) => {
  const link = [
    "discord.gg",
    "discord.io",
    "discordapp.com",
    "invite.gg",
    "@everyone",
    "@here"
  ];
  if (!argüman[0])
    return message.channel.send(`Alıntılanacak mesaj idsini girmelisin.`);
  const kanal = argüman[1] || message.channel.id;
  const fetchle = client.channels
    .get(kanal)
    .fetchMessage(argüman[0])
    .then(mesaj => {
      if (link.some(kelime => mesaj.content.includes(kelime)))
        return message.channel.send(`Alıntı yaptığın mesajda yasaklı kelime bulunuyor.`);
      let embed = new Discord.RichEmbed()
        .setColor(client.ayarlar.renk)
        .setAuthor(mesaj.author.username, mesaj.author.displayAvatarURL)
        .addField("Mesaj", mesaj.content)
        .setDescription(
          `[Mesaja git!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${mesaj.id})`
        )
        .setFooter(`Alıntılayan Kişi: ${message.author.tag}`);
      message.channel.send(embed);
    })
    .catch(error => {
      message.channel.send(`${error.message}`);
    });
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
  zaman: 2000
};

exports.yardım = {
  isim: "altıntıla",
  kategori: "Kullanıcı",
  açıklama: "Belirtilen mesajın içeriğini çeker.",
  kullanım: "alıntıla <mesaj id> <kanal id (yoksa mesaj kanalını çeker)>"
};
