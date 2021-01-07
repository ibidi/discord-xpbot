exports.run = async (client, message, argüman) => {
      let color = argüman[0];
      let url = `http://www.colourlovers.com/img/${color}/100/100/color.png`;
      message.channel.send(`Renk \`#${color}\``, { files: [url] })
          .catch(error => message.channel.send("Yanlış renk kodu girdiniz. *ya da bu işte bir terslik var.* "))
};

exports.bilgi = {
  açık: true,
  kullanımlar: [],
};

exports.yardım = {
  isim: "renk",
  kategori: "Kullanıcı",
  açıklama: "Rengi resim olarak atar.",
  kullanım: "renk <renk kodu>"
};