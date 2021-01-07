const Discord = require("discord.js")
const { stripIndents } = require('common-tags');
const snekfetch = require('snekfetch');

exports.run = async (client, msg, argüman) => {
		try {
			const { body } = await snekfetch
				.get('http://aws.random.cat/meow');
                let embed = {
                    color: 3447003,
                    description: `🐱`,
                    image: {
                        url: body.file,
                    }
                  };
                  return msg.channel.send({embed});
		} catch (err) {
			return msg.say(`Opss bir hata var galiba! \`${err.message}\`. Lütfen daha sonra tekrar dene!`);
		}
    };
exports.bilgi = {
  açık: true,
  kullanımlar: ['random-cat', 'kedipng', 'kedijpg', '🐱'],
  zaman: 2000
};

exports.yardım = {
  isim: "kedi",
  kategori: "Eğlence",
  açıklama: "Rastgele bir 🐱 resmi gönderir.",
  kullanım: "kedi"
};
