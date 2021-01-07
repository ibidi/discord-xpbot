const db = require("quick.db")

module.exports = async (client, guild) => {
  //client.user.setActivity(`${client.guilds.size} sunucu | !!yardım`)
  client.channels.get("777157141025783839").send(`:inbox_tray: Yeni bir sunucuya eklendim. Sunucu ismi **${guild.name}** ve içinde **${guild.members.size}** kullanıcı var.`)
}