exports.run = async (client, message, argüman) => {
  let Discord = require("discord.js");
  let embed = new Discord.RichEmbed()
    .setAuthor("Tomoe — Komut Grupları")
    .setColor("#17a166")
    .setFooter(`1/1 | !!yardım - !!davet`, message.author.displayAvatarURL);
  let p = client.veri.fetch(`${message.guild.id}.prefix`) || client.ayarlar.prefix;
  if (!argüman[0]) {
    const komutlarım = client.komutlar;

    const komutİsimleri = komutlarım.keyArray();
    const longest = komutİsimleri.reduce(
      (long, str) => Math.max(long, str.length),
      20
    );

    let currentCategory = "";
    const sorted = komutlarım
      .array()
      .sort((p, c) =>
        p.yardım.kategori > c.yardım.kategori
          ? 1
          : p.yardım.kategori > c.yardım.kategori &&
            p.yardım.kategori == c.yardım.kategori
          ? 1
          : -1
      );
    let output = " ";
    let cat;
    sorted.forEach(async c => {
      cat = c.yardım.kategori;
      if (currentCategory != cat) {
        output += `\n[${cat}](https://discord.gg/ibi): `;
        currentCategory = cat;
      }
      output += ` **\`${c.yardım.isim}\`** **|** `;
    });
    embed.setDescription(output);
    message.channel.send(embed).catch(error => console.log(error.message));
  } else {
    let command = argüman[0];
    if (client.komutlar.has(command)) {
      command =
        client.komutlar.get(command) ||
        client.komutlar.get(client.kullanımlar.get(command));
      embed.setDescription(
        `Komut: ${command.yardım.isim}\nAçıklama: ${
          command.yardım.açıklama
        }\nKullanım: ${p}${command.yardım.kullanım}\nKullanımlar: ${
          command.bilgi.kullanımlar.join(", ")
            ? command.bilgi.kullanımlar.join(", ")
            : "Bulunmuyor."
        }`
      );
      message.channel.send(embed).catch(error => console.log(error.message));
    }
  }
};

exports.bilgi = {
  açık: true,
  kullanımlar: ["y", "yardım", "h", "help", "halp"],
  zaman: 2000
};

exports.yardım = {
  isim: "yardım",
  kategori: "Kullanıcı",
  açıklama: "Botun bütün komutlarını görebilirsiniz.",
  kullanım: "yardım <komut>"
};
