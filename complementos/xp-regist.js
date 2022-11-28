const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Ya estás registrado\¿Quieres volver a registrarte?? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Formato incorrecto\n*${usedPrefix}lista nombre.años*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Los nombres no pueden estar vacíos (Alphanumeric)'
  if (!age) throw 'La edad no puede estar vacía (Número)'
  age = parseInt(age)
  if (age > 120) throw '𝚃𝚊𝚗 𝚟𝚒𝚎𝚓𝚘 𝚎𝚛𝚎𝚜 𝚖𝚒 𝚊𝚋𝚞𝚎𝚕𝚘/𝚊 '
  if (age < 5) throw '𝙻𝚘𝚜 𝚋𝚎𝚋𝚎𝚜 𝚜𝚊𝚋𝚎𝚗 𝙴𝚜𝚌𝚛𝚒𝚋𝚒𝚛 😳'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
Regístro 🌌 galactico 🌌 con éxito!

╭─「🌌 𝐈𝐍𝐅𝐎 🌌」
│ 👤𝙉𝙊𝙈𝘽𝙍𝙀: ${name} 
│ 👑𝙀𝘿𝘼𝘿: ${age} año 
╰────
Serial Number: 
${sn}
`.trim())
}
handler.help = ['lista', 'reg', 'register'].map(v => v + ' <nombre>.<años>')
handler.tags = ['xp']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler
