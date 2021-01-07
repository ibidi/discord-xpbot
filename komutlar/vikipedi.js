const Discord = require('discord.js');
const request = require('request');

exports.run = async (client, message, argüman) => {
    if(!argüman[0]) return message.channel.send("Lütfen aranacak kelimeyi giriniz.");
    request("https://tr.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + argüman.join(" ") + "&format=json", async function(error, response, body) {
        let embed = new Discord.RichEmbed();
        if(!body || !JSON.parse(body).query.search[0]) {
            embed.setDescription("Herhangi bir sonuç bulunamadı.")
            message.channel.send(embed)
            return;
        } else {
            let data = JSON.parse(body);
            embed.setDescription(" Toplam **" + data.query.search.length.toLocaleString() + "** sonuç bulundu. Seçmek için `10` saniyeniz var;\n\n" + data.query.search.map(entry => "**" + (data.query.search.indexOf(entry) + 1) + "**. [" + decodeURIComponent(encodeURIComponent(entry.title)) + "](https://tr.wikipedia.org/wiki/" + encodeURIComponent(entry.title) + ")").join("\n"))
            message.channel.send(embed)
            message.channel.awaitMessages(msg => ((msg.author.id === message.author.id) && Number(msg.content) && ((Number(msg.content) - 1) <= data.query.search.length)), {
                max: 1,
                time: 10000,
                errors: ["time"]
            }).then(async function(collected) {
                embed.setAuthor(decodeURIComponent(encodeURIComponent(data.query.search[Number(collected.first().content) - 1].title)), "https://tr.wikipedia.org/static/apple-touch/wikipedia.png", ("https://tr.wikipedia.org/wiki/" + encodeURIComponent(data.query.search[Number(collected.first().content) - 1].title)))
                embed.setDescription(decodeURIComponent(encodeURIComponent(data.query.search[Number(collected.first().content) - 1].snippet)).replace(/(<([^>]+)>)/ig, "") + "\n\n[Buraya Tıkla](https://tr.wikipedia.org/wiki/" + encodeURIComponent(data.query.search[Number(collected.first().content) - 1].title) + ")")
                message.channel.send(embed)
            }).catch(async function(collected) {
                message.channel.send(message.author + ", verilen **`10`** saniye dolduğu için komut iptal edildi.")
                return;
            })
        }
    })
};

exports.bilgi = {
  açık: true,
  kullanımlar: ["wikipedia"],
};

exports.yardım = {
  isim: "vikipedi",
  kategori: "Kullanıcı",
  açıklama: "Vikipedi'den bilgi gösterir.",
  kullanım: "vikipedi <kelime>"
};
