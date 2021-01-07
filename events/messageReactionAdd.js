const Discord = require("discord.js");
const db = require("quick.db");

module.exports = async function(client, reaction, user) {
  function getImage(reaction, attachment) {
    let imageLink = attachment.split(".");
    let typeOfImage = imageLink[imageLink.length - 1];
    let image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return "";
    return attachment;
  }
  let emojis = {
    0: "⭐",
    1: "✅"
  };
  let emoji = db.has(reaction.message.guild.id + ".starEmoji")
    ? emojis[db.get(reaction.message.guild.id + ".starEmoji")]
    : emojis[0];
  let minCount = db.has(reaction.message.guild.id + ".starCount")
    ? emojis[db.get(reaction.message.guild.id + ".starCount")]
    : 1;
  if (reaction.emoji.name !== emoji) return;
  let channel = db.has(reaction.message.guild.id + ".starChannel")
    ? reaction.message.guild.channels.get(
        db.get(reaction.message.guild.id + ".starChannel")
      )
      ? reaction.message.guild.channels.get(
          db.get(reaction.message.guild.id + ".starChannel")
        )
      : undefined
    : undefined;
  if (!channel || reaction.message.channel.id === channel.id) return;
  if (reaction.message.author.bot)
    return;
  let fetchedMessages = await channel.fetchMessages();
  let image =
    reaction.message.attachments.size > 0
      ? getImage(reaction, reaction.message.attachments.array()[0].url)
      : "";
  let starEmbeds = fetchedMessages
    .array()
    .filter(
      msg =>
        msg.embeds[0].footer.text.startsWith(emoji) &&
        msg.embeds[0].footer.text.endsWith(reaction.message.id)
    );
  if (minCount <= reaction.count && starEmbeds[0]) {
    let embed = new Discord.RichEmbed()
      .setColor(starEmbeds[0].embeds[0].color)
      .setDescription(starEmbeds[0].embeds[0].description || "")
      .setImage(image)
      .setTimestamp()
      .setAuthor(
        reaction.message.author.tag,
        reaction.message.author.displayAvatarURL
      )
      .setFooter(
        emoji + " " + reaction.count + " | Mesaj ID: " + reaction.message.id
      );
    let message = await channel.fetchMessage(starEmbeds[0].id);
    message.edit(embed);
  } else if (minCount <= reaction.count) {
    let embed = new Discord.RichEmbed()
      .setColor(client.ayarlar.renk)
      .setDescription(reaction.message.content)
      .setImage(image)
      .setTimestamp()
      .setAuthor(
        reaction.message.author.tag,
        reaction.message.author.displayAvatarURL
      )
      .setFooter(
        emoji + " " + reaction.count + " | Mesaj ID: " + reaction.message.id
      );
    channel.send(embed);
  }
};
