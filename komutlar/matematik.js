exports.run = async (client, msg, argüman) => {
  var değer = argüman[0]
  var sayi = Number(argüman[1])
  var sayi2 = Number(argüman[2])
  if(!değer) return msg.channel.send(`Lütfen \`topla, çıkart, böl, çarp, karekök, yuvarla\` ve \`üs\` değerlerinden birini girin.`)
  if(!sayi || isNaN(sayi)) return msg.channel.send(`Lütfen bir sayı girin.`)
  if(değer === "topla") {
    if(sayi2) {
      msg.channel.send(`${sayi} + ${sayi2} = ${sayi+sayi2}`)
    } else if(!sayi2 || isNaN(sayi2)) {
      return msg.channel.send(`Lütfen bir sayı girin.`)
    }
  }
  if(değer === "çıkart") {
    if(sayi2) {
      msg.channel.send(`${sayi} - ${sayi2} = ${sayi-sayi2}`)
    } else if(!sayi2 || isNaN(sayi2)) {
      return msg.channel.send(`Lütfen bir sayı girin.`)
    }
  }
  if(değer === "böl") {
    if(sayi2) {
      msg.channel.send(`${sayi} % ${sayi2} = ${sayi/sayi2}`)
    } else if(!sayi2 || isNaN(sayi2)) {
      return msg.channel.send(`Lütfen bir sayı girin.`)
    }
  }
  if(değer === "çarp") {
    if(sayi2) {
      msg.channel.send(`${sayi} x ${sayi2} = ${sayi*sayi2}`)
    } else if(!sayi2 || isNaN(sayi2)) {
      return msg.channel.send(`Lütfen bir sayı girin.`)
    }
  }
  if(değer === "karekök") {
      msg.channel.send(`√${sayi} = ${Math.sqrt(sayi)}`)
  }
  if(değer === "yuvarla") {
      msg.channel.send(`${sayi} sayısının yuvarlanmış hali = ${Math.round(sayi)}`)
  }
  if(değer === "üs") {
    if(sayi2) {
      msg.channel.send(`${sayi} üssü ${sayi2} = ${Math.pow(sayi,sayi2)}`)
    } else if(!sayi2 || isNaN(sayi2)) {
      if(sayi2 === 0) return msg.channel.send(`${sayi} üssü 0 = 1`)
      return msg.channel.send(`Lütfen bir sayı girin.`)
    }
  }
};

exports.bilgi = {
  açık: false,
  kullanımlar: [],
};

exports.yardım = {
  isim: "matematik",
  kategori: "Kullanıcı",
  açıklama: "Matematik hesaplamaları yaparsınız.",
  kullanım: "matematik [topla-çıkart-böl-çarp/karekök/üs] [sayı]"
};
