const db = require("quick.db")
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');

exports.run = async (client, msg, argüman) => {
		const pingMsg = await msg.reply('Hesaplanıyor...');
		return pingMsg.edit(oneLine`
			${msg.channel.type !== 'dm' ? `${msg.author},` : ''}
			Hey! Botun son gecikmesi: **${Math.ceil(client.ping)}ms.**`);
	}

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "ping",
  kategori: "Kullanıcı",
  açıklama: "Botun gecikmesini gösterir.",
  kullanım: ""
};
