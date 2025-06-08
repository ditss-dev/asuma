//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//         MODULE IMPORT         //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const fs = require('fs');
const chalk = require('chalk');

/*
 * -----------------------------------------------------------------------------
 *  Created by    : ditss
 *  GitHub        : https://github.com/ditss-dev
 *  WhatsApp      : https://wa.me/6281513607731
 *  Description   : Source code project Asuma Gen 2 - WhatsApp Bot
 *  Created Date  : 2025
 * -----------------------------------------------------------------------------
 *  Feel free to use and modify this script.
 *  Please keep the header intact when distributing.
 * -----------------------------------------------------------------------------
 */


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//        GLOBAL SETTINGS        //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Thumbnail gambar untuk menu
global.thumb = {
    menu: 'https://raw.githubusercontent.com/ditss-dev/database/main/mbnzhvk0.jpg',
    allmenu: 'https://raw.githubusercontent.com/ditss-dev/database/main/mbo0tfe0.jpg',
}

// Thumbnail gambar untuk balasan bot
global.reply = {
    error: 'https://raw.githubusercontent.com/ditss-dev/database/main/mbnx3plm.jpg',
    load: 'https://raw.githubusercontent.com/ditss-dev/database/main/mbnwogqx.jpg',
}

// Nomor owner bot (gunakan format string internasional)
global.owner = ['447920601019'] // <- Ini adalah nomor pemilik bot
global.namaowner = 'ditss' // Nama owner
global.packname = 'asuma toki.' // Nama pack stiker default
global.author = 'ditss ganteng' // Penulis pack stiker
global.botname = 'asuma bot' // Nama bot
global.listprefix = ['+','!','.'] // Daftar prefix untuk perintah
global.listv = ['•','●','■','✿','▲','➩','➢','➣','➤','✦','✧','△','❀','○','□','♤','♡','◇','♧','々','〆'] // List bullet

// Lokasi database lokal atau URL MongoDB
global.tempatDB = 'database.json'
global.tempatStore = 'baileys_store.json'

// Gunakan pairing code login?
global.pairing_code = true

// Nomor bot utama (isi jika sudah login/manual pairing)
global.number_bot = '' // Contoh: '6281234567890'

// Aktifkan AI untuk private chat?
global.AutoaiPrivat = true

// URL thumbnail loading bot
global.reply_load = "https://raw.githubusercontent.com/ditss-dev/database/main/mbnwogqx.jpg"

// Fake file & dokumen (biasanya dipakai untuk kirim pesan mirip dokumen)
global.fake = {
	anonim: 'https://telegra.ph/file/95670d63378f7f4210f03.png',
	thumbnailUrl: 'https://ditss.vercel.app/icon.png',
	thumbnail: fs.readFileSync('./system-asuma/media/ditss.jpg'),
	docs: fs.readFileSync('./system-asuma/media/fake.pdf'),
	listfakedocs: [
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/pdf'
	],
}

// Link terkait pemilik bot (bisa dipakai di fitur `info` atau menu)
global.my = {
	yt: 'https://youtube.com/c/paaditt',
	gh: 'https://github.com/ditss-dev',
	web: 'https://www.ditss.cloud',
	gc: 'https://chat.whatsapp.com/IEGSv0bv5gC2etNuXJajd0',
	ch: '120363314209665405@newsletter',
}

// Batas limit harian pengguna berdasarkan level
global.limit = {
	free: 20,
	premium: 999,
	vip: 9999
}

// Uang awal pengguna berdasarkan level
global.money = {
	free: 10000,
	premium: 1000000,
	vip: 10000000
}

// Pesan-pesan default bot
global.mess = {
  key: '[x] API_KEY_REVOKED → Please update your key to continue.',
  owner: '[ACCESS DENIED]\nThis command is restricted to the bot owner.',
  admin: '[403 FORBIDDEN]\nYou must be a group admin to use this command.',
  botAdmin: '[ERROR]\nBot requires admin privileges to execute this action.',
  group: '[RESTRICTED]\nThis command can only be used in a group chat.',
  private: '[PRIVATE_ONLY]\nUse this command in private chat only.',
  limit: '[QUOTA_EXCEEDED]\nDaily usage limit reached. Please wait or upgrade.',
  prem: '[PREMIUM_REQUIRED]\nThis feature is available for premium users only.',
  wait: '[PROCESSING...]\nPlease stand by while your request is being handled.',
  error: '[SYSTEM_FAILURE]\nAn unexpected error occurred. Try again later.',
  done: '[OK]\nTask completed successfully.'
}

// API list (tambahkan jika ada endpoint lain)
global.APIs = {
	hitori: 'https://api.hitori.pw',
	ditss: 'https://api.ditss.cloud',
}

// API Keys untuk masing-masing endpoint
global.APIKeys = {
	'https://api.hitori.pw': 'htrkey-77eb83c0eeb39d40',
    'https://api.ditss.cloud': 'DitssGanteng',
	geminiApikey: [
		'AIzaSyD0lkGz6ZhKi_MHSSmJcCX3wXoDZhELPaQ',
		'AIzaSyDnBPd_EhBfr73NssnThVQZYiKZVhGZewU',
		'AIzaSyA94OZD-0V4quRbzPb2j75AuzSblPHE75M',
		'AIzaSyB5aTYbUg2VQ0oXr5hdJPN8AyLJcmM84-A',
		'AIzaSyB1xYZ2YImnBdi2Bh-If_8lj6rvSkabqlA'
	]
}

// Kata-kata kasar (untuk filter badword atau auto-kick)
global.badWords = ['tolol','goblok','asu','pantek','kampret','ngentot','jancok','kontol','memek','lonte']

// Batas maksimal panjang chat per user (anti spam?)
global.chatLength = 1000


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//     AUTO UPDATE GLOBAL.JS     //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})