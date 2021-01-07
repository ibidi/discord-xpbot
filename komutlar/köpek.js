const Discord = require("discord.js")
const { stripIndents } = require('common-tags');
const snekfetch = require('snekfetch');

exports.run = async (client, msg, argüman) => {
		try {
			const { body } = await snekfetch
				.get('https://random.dog/woof.json');
                let embed = {
                    color: 3447003,
                    image: {
                        url: body.url,
                    }
                  };
                  return msg.channel.send({embed});
		} catch (err) {
			return msg.say(`Opss bir hata var galiba! \`${err.message}\`. Lütfen daha sonra tekrar dene!`);
		}
    };

exports.bilgi = {
  açık: true,
  kullanımlar: ['random-dog', 'köpekpng', 'köpekjpg', '🐶'],
  zaman: 2000
};

exports.yardım = {
  isim: "köpek",
  kategori: "Eğlence",
  açıklama: "Rastgele bir 🐶 resmi gönderir.",
  kullanım: "köpek"
};
