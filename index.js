require('./config');
const fs = require('fs');
const pino = require('pino');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const NodeCache = require('node-cache');
const { 
	toBuffer, 
	toDataURL 
} = require('qrcode');
const { 
	exec, 
	spawn, 
	execSync 
} = require('child_process');
const { parsePhoneNumber } = require('awesome-phonenumber');
//const { startIdleLoading, stopIdleLoading } = require('./system-asuma/terminal');
const { default: WAConnection, useMultiFileAuthState, Browsers, DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, proto, getAggregateVotesInPollMessage } = require('baileys');

const { dataBase } = require('./system-asuma/database');
const { 
	app, 
	server, 
	PORT } = require('./system-asuma/server');

const pairingCode = process.argv.includes('--qr') ? false : process.argv.includes('--pairing-code') || global.pairing_code;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
let pairingStarted = false;
let phoneNumber;

global.fetchApi = async (path = '/', query = {}, options) => {
	const urlnya = (options?.name || options ? ((options?.name || options) in global.APIs ? global.APIs[(options?.name || options)] : (options?.name || options)) : global.APIs['hitori'] ? global.APIs['hitori'] : (options?.name || options)) + path + (query ? '?' + decodeURIComponent(new URLSearchParams(Object.entries({ ...query }))) : '')
	const { data } = await axios.get(urlnya, { ...((options?.name || options) ? {} : { headers: { 'accept': 'application/json', 'x-api-key': global.APIKeys[global.APIs['hitori']]}})})
	return data
}

const storeDB = dataBase(global.tempatStore);
const database = dataBase(global.tempatDB);
const msgRetryCounterCache = new NodeCache();
const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false });

server.listen(PORT, () => {
	console.log('App listened on port', PORT);
});

const { GroupParticipantsUpdate, MessagesUpsert, Solving } = require('./system-asuma/message');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./lib/function');
/*
 * -----------------------------------------------------------------------------
 *  Created by    : ditss
 *  GitHub        : https://github.com/ditss-dev
 *  WhatsApp      : https://wa.me/6281513607731
 *  Description   : Source code project Asuma Gen 2 - WhatsApp Bot
 *  Created Date  : 2025.
 * -----------------------------------------------------------------------------
 *  Feel free to use and modify this script.
 *  Please keep the header intact when distributing.
 * -----------------------------------------------------------------------------
 */
async function StartAsumaBoett() {
	const { state, saveCreds } = await useMultiFileAuthState('sesi');
	const { version, isLatest } = await fetchLatestBaileysVersion();
	const level = pino({ level: 'silent' });
	
	try {
		const loadData = await database.read()
		const storeLoadData = await storeDB.read()
		if (!loadData || Object.keys(loadData).length === 0) {
			global.db = {
				hit: {},
				set: {},
				list: {},
				store: {},
				users: {},
				game: {},
				groups: {},
				database: {},
				premium: [],
				sewa: [],
				...(loadData || {}),
			}
			await database.write(global.db)
		} else {
			global.db = loadData
		}
		if (!storeLoadData || Object.keys(storeLoadData).length === 0) {
			global.store = {
				contacts: {},
				presences: {},
				messages: {},
				groupMetadata: {},
				...(storeLoadData || {}),
			}
			await storeDB.write(global.store)
		} else {
			global.store = storeLoadData
		}
		
		setInterval(async () => {
			if (global.db) await database.write(global.db)
			if (global.store) await storeDB.write(global.store)
		}, 30 * 1000)
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
	
	store.loadMessage = function (remoteJid, id) {
		const messages = store.messages?.[remoteJid]?.array;
		if (!messages) return null;
		return messages.find(msg => msg?.key?.id === id) || null;
	}
	
	const getMessage = async (key) => {
		if (store) {
			const msg = await store.loadMessage(key.remoteJid, key.id);
			return msg?.message || ''
		}
		return {
			conversation: 'Halo Saya Asuma bot'
		}
	}
	
	const Ditss = WAConnection({
		logger: level,
		getMessage,
		syncFullHistory: true,
		maxMsgRetryCount: 15,
		msgRetryCounterCache,
		retryRequestDelayMs: 10,
		defaultQueryTimeoutMs: 0,
		connectTimeoutMs: 60000,
		browser: Browsers.ubuntu('Chrome'),
		generateHighQualityLinkPreview: true,
		//waWebSocketUrl: 'wss://web.whatsapp.com/ws',
		cachedGroupMetadata: async (jid) => groupCache.get(jid),
		shouldSyncHistoryMessage: msg => {
			console.log(`\x1b[32mMemuat Chat [${msg.progress || 0}%]\x1b[39m`);
			return !!msg.syncType;
		},
		transactionOpts: {
			maxCommitRetries: 10,
			delayBetweenTriesMs: 10,
		},
		appStateMacVerification: {
			patch: true,
			snapshot: true,
		},
		auth: {
			creds: state.creds,
			keys: makeCacheableSignalKeyStore(state.keys, level),
		},
	})
	
	if (pairingCode && !phoneNumber && !Ditss.authState.creds.registered) {
		async function getPhoneNumber() {
			phoneNumber = global.number_bot ? global.number_bot : process.env.BOT_NUMBER || await question('Please type your WhatsApp number : ');
			phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
			
			if (!parsePhoneNumber('+' + phoneNumber).valid && phoneNumber.length < 6) {
				console.log(chalk.bgBlack(chalk.redBright('Start with your Country WhatsApp code') + chalk.whiteBright(',') + chalk.greenBright(' Example : 62xxx')));
				await getPhoneNumber()
			}
		}
		(async () => {
			await getPhoneNumber();
			await exec('rm -rf ./sesi/*');
			console.log('Phone number captured. Waiting for Connection...\n' + chalk.blueBright('Estimated time: around 2 ~ 5 minutes'))
		})()
	}
	
	await Solving(Ditss, store)
	
	Ditss.ev.on('creds.update', saveCreds)
	
	Ditss.ev.on('connection.update', async (update) => {
		const { qr, connection, lastDisconnect, isNewLogin, receivedPendingNotifications } = update
		if (!Ditss.authState.creds.registered) console.log('Connection: ', connection || false);
		if ((connection === 'connecting' || !!qr) && pairingCode && phoneNumber && !Ditss.authState.creds.registered && !pairingStarted) {
			setTimeout(async () => {
				pairingStarted = true;
				console.log('Requesting Pairing Code...')
				let code = await Ditss.requestPairingCode(phoneNumber);
				console.log(`Your Pairing Code : ${code}`);
			}, 3000)
		}
		if (connection === 'close') {
			const reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.connectionLost) {
				console.log('Connection to Server Lost, Attempting to Reconnect...');
				StartAsumaBoett()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log('Connection closed, Attempting to Reconnect...');
				StartAsumaBoett()
			} else if (reason === DisconnectReason.restartRequired) {
				console.log('Restart Required...');
				StartAsumaBoett()
			} else if (reason === DisconnectReason.timedOut) {
				console.log('Connection Timed Out, Attempting to Reconnect...');
				StartAsumaBoett()
			} else if (reason === DisconnectReason.badSession) {
				console.log('Delete Session and Scan again...');
				StartAsumaBoett()
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log('Close current Session first...');
			} else if (reason === DisconnectReason.loggedOut) {
				console.log('Scan again and Run...');
				exec('rm -rf ./sesi/*')
				process.exit(1)
			} else if (reason === DisconnectReason.forbidden) {
				console.log('Connection Failure, Scan again and Run...');
				exec('rm -rf ./sesi/*')
				process.exit(1)
			} else if (reason === DisconnectReason.multideviceMismatch) {
				console.log('Scan again...');
				exec('rm -rf ./sesi/*')
				process.exit(0)
			} else {
				Ditss.end(`Unknown DisconnectReason : ${reason}|${connection}`)
			}
		}
		if (connection == 'open') {
console.log(
  chalk.bold.bgBlue.white(' BOT  ') +
  ' ' +
  chalk.cyan('Terhubung sebagai ') +
  chalk.bold.yellow(Ditss.user?.name || 'Unknown') +
  chalk.cyan(' | ID: ') +
  chalk.bold.green(Ditss.user?.id || 'No ID')
);
			let botNumber = await Ditss.decodeJid(Ditss.user.id);
			if (global.db?.set[botNumber] && !global.db?.set[botNumber]?.join) {
				if (my.ch.length > 0 && my.ch.includes('@newsletter')) {
					if (my.ch) await Ditss.newsletterMsg(my.ch, { type: 'follow' }).catch(e => {})
					db.set[botNumber].join = true
				}
			}
		}
		if (qr) {
			if (!pairingCode) qrcode.generate(qr, { small: true })
			app.use('/qr', async (req, res) => {
				res.setHeader('content-type', 'image/png')
				res.end(await toBuffer(qr))
			});
		}
		if (isNewLogin) console.log(chalk.green('New device login detected...'))
		if (receivedPendingNotifications == 'true') {
			console.log('Please wait About 1 Minute...')
			Ditss.ev.flush()
		}
	});
	Ditss.ev.on('contacts.update', (update) => {
		for (let contact of update) {
			let id = Ditss.decodeJid(contact.id)
			if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
		}
	});
	
	Ditss.ev.on('call', async (call) => {
		let botNumber = await Ditss.decodeJid(Ditss.user.id);
		if (global.db?.set[botNumber]?.anticall) {
			for (let id of call) {
				if (id.status === 'offer') {
					let msg = await Ditss.sendMessage(id.from, { text: `Saat Ini, Kami Tidak Dapat Menerima Panggilan ${id.isVideo ? 'Video' : 'Suara'}.\nJika @${id.from.split('@')[0]} Memerlukan Bantuan, Silakan Hubungi Owner :)`, mentions: [id.from]});
					await Ditss.sendContact(id.from, global.owner, msg);
					await Ditss.rejectCall(id.id, id.from)
				}
			}
		}
	});
	
	Ditss.ev.on('messages.upsert', async (message) => {
		await MessagesUpsert(Ditss, message, store, groupCache);
	});
	
	Ditss.ev.on('group-participants.update', async (update) => {
		await GroupParticipantsUpdate(Ditss, update, store, groupCache);
	});
	
	Ditss.ev.on('groups.update', (update) => {
		for (const n of update) {
			if (store.groupMetadata[n.id]) {
				groupCache.set(n.id, n);
				Object.assign(store.groupMetadata[n.id], n);
			}
		}
	});
	
	Ditss.ev.on('presence.update', ({ id, presences: update }) => {
		store.presences[id] = store.presences?.[id] || {};
		Object.assign(store.presences[id], update);
	});
	
	setInterval(async () => {
		if (Ditss?.user?.id) await Ditss.sendPresenceUpdate('available', Ditss.decodeJid(Ditss.user.id)).catch(e => {})
	}, 10 * 60 * 1000);

	return Ditss
}

StartAsumaBoett()

// Process Exit
const cleanup = async (signal) => {
	console.log(`Received ${signal}. Menyimpan database...`)
	if (global.db) await database.write(global.db)
	if (global.store) await storeDB.write(global.store)
	server.close(() => {
		console.log('Server closed. Exiting...')
		process.exit(0)
	})
}

process.on('SIGINT', () => cleanup('SIGINT'))
process.on('SIGTERM', () => cleanup('SIGTERM'))
process.on('exit', () => cleanup('exit'))

server.on('error', (error) => {
	if (error.code === 'EADDRINUSE') {
		console.log(`Address localhost:${PORT} in use. Please retry when the port is available!`);
		server.close();
	} else console.error('Server error:', error);
});

setInterval(() => {}, 1000 * 60 * 10);
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
/* base by naze.
 * -----------------------------------------------------------------------------
 *  Created by    : ditss
 *  GitHub        : https://github.com/ditss-dev
 *  WhatsApp      : https://wa.me/6281513607731
 *  Description   : Source code project Asuma Gen 2 - WhatsApp Bot
 *  Created Date  : 2025.
 * -----------------------------------------------------------------------------
 *  Feel free to use and modify this script.
 *  Please keep the header intact when distributing.
 * -----------------------------------------------------------------------------
 */
