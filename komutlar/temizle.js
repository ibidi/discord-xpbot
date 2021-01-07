exports.run = (client, message, argüman) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(`Bu komutu kullanmak için yetkin bulunmuyor.`);
  if (!argüman[0])
    return message.channel.send(`Temizlenecek sayıyı belirtmelisiniz.`);
  let temizlik = argüman[0];
  if (isNaN(temizlik)) return message.channel.send(`Girilen sayı geçersiz.`);
  if (temizlik > 100)
    return message.channel.send(`100 adet mesajdan fazlasını silemem.`);
  message.channel
    .bulkDelete(temizlik)
    .then(temizlendi => {
      message.channel
        .send(`${temizlik} adet mesaj silindi.`)
        .then(m => m.delete(2000));
    })
    .catch(error => {
      message.channel.send(`Mesajları silerken bir hata ile karşılaştım.`);
    });
};

exports.bilgi = {
  açık: true,
  kullanımlar: ["temizle", "sil"],
};

exports.yardım = {
  isim: "temizle",
  yetki: "MANAGE_MESSAGES", 
  kategori: "Ayar",
  açıklama: "Belirttiğiniz kadar mesaj siler.",
  kullanım: "temizle 100"
};
