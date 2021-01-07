const Discord = require("discord.js")
const db = require("quick.db")
module.exports = async (client, user) => {
  db.delete(user.id+"."+user.guild.id)
}