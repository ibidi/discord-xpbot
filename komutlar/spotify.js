const Discord = require("discord.js");

exports.run = async (client, message, argüman) => {
  let idArama = client.users.get(argüman[0]);
  let etiket = message.mentions.users.first();
  let kendi = message.author;
  let user = etiket || idArama || kendi;

  if (!user.presence.game)
    return message.channel.send(`${user.username} spotify dinlemiyor.`);
  if (user.presence.game.name === "Spotify" && user.presence.game.type === 2) {
    try {
      var trackImg = user.presence.game.assets.largeImageURL;
      var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
      var trackName = user.presence.game.details;
      var trackAlbum = user.presence.game.assets.largeText;
      var trackAuthor = user.presence.game.state;

      const embed = new Discord.RichEmbed()
        .setAuthor('Spotify', 'https://cdn.discordapp.com/emojis/703556687239577621.png?v=1')
        .setColor("#0xdb954")
        .setThumbnail(trackImg)
        .setDescription(
          `
**Şarkı adı:**  ${trackName}
**Albüm:**  ${trackAlbum}
**Şarkıcı(lar):**  ${trackAuthor}
`
        )
        .addField("Bu parçayı dinle:", `[${trackUrl}](${trackUrl})`, false);

      return message.channel.send(embed);
    } catch (error) {
      return message.channel.send(
        `${user.username} kayıtlı bir şarkı dinlemiyor.`
      );
    }
  } else {
    return message.channel.send(`${user.username} spotify dinlemiyor.`);
  }
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "spotify",
  kategori: "Kullanıcı",
  açıklama: "Kullanıcının dinlediği şarkı bilgisini gösterir.",
  kullanım: "spotify <kullanıcı>"
};
