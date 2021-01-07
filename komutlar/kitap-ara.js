const db = require("quick.db")
const Discord = require("discord.js")
const request = require('node-superfetch')
const moment = require('moment')
const { GOOGLE_KEY } = process.env

exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send("Lütfen bir kitap ismi girin.")
  }

  const kitap = args.join(" ")

  try {
    const { body } = await request
      .get('https://www.googleapis.com/books/v1/volumes')
      .query({
        apiKey: GOOGLE_KEY,
        q: kitap,
        maxResults: 1,
        printType: 'books'
      });

    if(!body.items) {
      return message.channel.send("Lütfen geçerli bir kitap ismi girin.")
      
    }
  
    const data = body.items[0].volumeInfo;

    const embed = new Discord.RichEmbed()
      .setAuthor(`${data.title} | Kitap Bilgileri`, "https://i.imgur.com/N3oHABo.png", `https://books.google.com.tr/`)
      .addField(`Yazarlar`, data.authors || 'Bilinmiyor')
      if(!data.publishedDate) {
        embed.addField(`Yayın Tarihi`, `Bilinmiyor`)
      } else {
        embed.addField(`Yayın Tarihi`, `${moment(data.publishedDate).format('DD/MM/YYYY')}`)
      }
      embed.addField(`Sayfa Sayısı`, data.pageCount || 'Bilinmiyor')
      if(data.imageLinks) {
        embed.setThumbnail(`${data.imageLinks ? data.imageLinks.thumbnail : null}`)
      }
      embed.setColor(client.ayarlar.renk)
      .setTimestamp()
    message.channel.send({embed})
  } catch (err) {
    console.log(err)
  }
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "kitap-ara",
  kategori: "Kullanıcı",
  açıklama: "Yazılan kitabı arar.",
  kullanım: "kitap-ara [kitap ismi]"
};
