const db = require("quick.db")

module.exports = async (client, guild) => {
  //client.user.setActivity(`${client.guilds.size} sunucu | !!yardım`)
  client.channels.get("777157141025783839").send(`:outbox_tray: Bir sunucudan atıldım. Sunucu ismi **${guild.name}**.`)
}