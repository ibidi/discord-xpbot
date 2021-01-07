const db = require("quick.db")
const Discord = require("discord.js")
const moment = require('moment');
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

exports.run = async (client, msg, argüman) => {
  msg.channel.send(`**Konu:** \`@Tomoe#9551\` <a:ibidi_star:776800148675231744> **Güncelleme**
**Açıklama:** Botta bulunan bir kaç hatadan dolayı geçen günlerde bir güncelleme yapma kararı aldık. Bu güncellemelerden sonra bot stabil olarak çalışacağından bu durumu sizlere daha önceden söylemiştik.

Eski sürüme kıyasla komut biçimlendirmesi bakımından bazı farklılıklar göreceksiniz. Bazı komutlar ve sistemler kaldırılmış olup siz değerli kullanıcılarımızın isteğine göre tekrardan eklenmeye planlanmıştır.

Önümüzdeki birkaç hafta boyunca komutları, performansı ve eksik komutları/işlevleri yeniden ekleyeceğiz. Bu, birçok açıdan beta olarak kabul edilebilir ve herhangi bir hatayla karşılaşırsanız, lütfen bunları bize bildirmekten çekinmeyin.

<a:ibidi_hayir:776800162902442014> **Kaldırılan Sistem ve Komutlar**
**>** emoji-ekle
**>** emoji-kaldır
**>** emojiler
**>** telefon
**>** telefon-numarası
**>** telefon-numaraları
**>** starboard
**>** starboard-kanalı
**>** zamanlı-mesaj

<a:ibidi_onay:776800196314529822> **Eklenen Sistemler**
**>** günlük-ödül
**>** kedi
**>** köpek
**>** spotify
**>** vikipedi
`)
  }

exports.bilgi = {
  açık: true,
  kullanımlar: ["yenilikler"],
  zaman: 2000
};

exports.yardım = {
  isim: "güncelleme",
  kategori: "Kullanıcı",
  açıklama: "Bota yeni gelen içerikler hakkında bilgiler verir.",
  kullanım: "güncelleme"
};
