exports.run = async (client, message, argüman) => {
  const ytdl = require("ytdl-core");
  const Discord = require("discord.js");
  const YouTube = require("simple-youtube-api");
  const youtube = new YouTube(process.env.youtubeKey);
  const searchString = argüman.slice(0).join(" ");
  const url = argüman[0] ? argüman[0].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = client.müzik.get(message.guild.id);
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel)
    return message.channel.send("**Lütfen sesli bir kanala giriniz.**");
  const permissions = voiceChannel.permissionsFor(client.user);
  if (!permissions.has("CONNECT")) {
    return message.channel.send("**Lütfen bağlanma iznimi açınız.**");
  }
  if (!permissions.has("SPEAK")) {
    return message.channel.send("**Lütfen mikrofonumu açınız.**");
  }
  if (!argüman[0])
    return message.channel.send(
      "**Bir müzik ismi veya müzik linki girmelisiniz.**"
    );
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    for (const video of Object.values(videos)) {
      const video2 = await youtube.getVideoByID(video.id);
      await handleVideo(video2, message, voiceChannel, true);
    }

    const embed2 = new Discord.RichEmbed()
      .setAuthor("Sıraya eklendi", message.author.displayAvatarURL)
      .setDescription(
        `[${video.title}](https://www.youtube.com/watch?v=${video.id})`
      )
      .setThumbnail(video.thumbnails.default.url)
      .addField("Kanal", video.channel.title, true)
      .addField("Zaman", video.durationm + ":" + video.durations, true)
      //.addField("Ses", serverQueue.volume + "%", true)
      .addField("İsteyen", message.author.username, true);
    return message.channel.send(
      `<:youtube:704033140053770343> **Aranıyor** 🔎 \`${argüman
        .slice(0)
        .join(" ")}\``
    );
  } else {
    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(searchString, 10);
        let index = 0;
        if (!serverQueue) {
          message.channel.send(
            `<:youtube:704033140053770343> **Aranıyor** 🔎 \`${argüman
              .slice(0)
              .join(" ")}\``
          );
        }
        if (serverQueue) {
        }
        const videoIndex = parseInt("1");
        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
      } catch (err) {
        console.error(err);
        return message.channel.send("**Aradığınız şarkı bulunamadı.**");
      }
    }
    return handleVideo(video, message, voiceChannel);
  }
  async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = client.müzik.get(message.guild.id);
    const name = argüman.join(" ");
    const { get } = require("snekfetch");
    const snippet = await get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${video.id}&key=AIzaSyBOU9HIOlvB9Jb8ZJ4mumogWvcd2MQoAL8&maxResults=1&type=video`
    );
    const song = {
      id: video.id,
      title: video.title,
      author: message.author.username,
      image: video.thumbnails.default.url,
      channel: video.channel.title,
      içerik: argüman.slice(0).join(" "),
      url: `https://www.youtube.com/watch?v=${video.id}`,
      durationh: video.duration.hours,
      durationm: video.duration.minutes,
      durations: video.duration.seconds,
      views: video.views
    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
      client.müzik.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`**Error:** ${error}`);
        client.müzik.delete(message.guild.id);
        return message.channel.send(`**Hata:** ${error}`);
      }
    } else {
      if (serverQueue.songs.length >= 10)
        return message.channel.send(
          "Bir sunucuda en fazla listede 10 şarkı bulunmalıdır."
        );
      serverQueue.songs.push(song);
      if (playlist) return undefined;
      const embed2 = new Discord.RichEmbed()
        .setAuthor("Sıraya eklendi", message.author.displayAvatarURL)
        .setDescription(
          `[${song.title}](https://www.youtube.com/watch?v=${song.id})`
        )
        .setThumbnail(song.image)
        .addField("Kanal", song.channel, true)
        .addField("Zaman", song.durationm + ":" + song.durations, true)
        //.addField("Ses", serverQueue.volume + "%", true)
        .addField("İsteyen", song.author, true);
      return message.channel.send(
        `<:youtube:704033140053770343> **Aranıyor** 🔎 \`${song.içerik}\``,
        embed2
      );
    }
    return undefined;
  }

  function play(guild, song) {
    const serverQueue = client.müzik.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      client.müzik.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .playStream(ytdl(song.url))
      .on("end", reason => {
        if (reason == `error`) console.log("Çalınan tüm şarkılar bitti.");
        else console.log(reason);
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(
      `**Oynuyor** 🎶 \`${song.title}\` - ${song.author}!`
    );
  }
};

exports.bilgi = {
  açık: true,
  kullanımlar: ["play", "oynat", "çal"],
  zaman: 5000
};

exports.yardım = {
  isim: "çal",
  kategori: "Müzik",
  açıklama: "YouTube üzerinden bir şarkı oynatırsınız.",
  kullanım: "çal <müzik ismi>"
};
