exports.run = (client, message, argüman) => {
  if (!argüman[0]) return message.channel.send(":information_source: Bir komut ismi girmelisiniz. Botu yenilemek istiyorsan **bot** yaz.");
  if(argüman[0].toLowerCase() === "bot") { 
  message.channel.send("<a:ibidi_onay:776800196314529822> Bot yeniden başlatılıyor...").then(k => process.exit(2)) }
  const komut = argüman[0];

  if (!client.komutlar.has(komut)) {
    return message.channel.send("<:hayir:702786528430260254> Böyle bir komut bulunmuyor.");
  }

  delete require.cache[require.resolve(`./${komut}.js`)];

  client.komutlar.delete(komut);
  const veri = require(`./${komut}.js`);
  client.komutlar.set(komut, veri);
  message.channel.send(`<a:ibidi_onay:776800196314529822> Komut yeniden başlatıldı: ${komut}`);
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
  zaman: 2000
};

exports.yardım = {
  isim: "yenile",
  kategori: "Admin",
  açıklama: "Botu veya botun komutlarını yenileyebilirsiniz.",
  kullanım: "yenile <komut ismi>"
};
