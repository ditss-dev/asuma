const path = require('path');
const chalk = require('chalk');
const { spawn } = require('child_process');

function start() {
	let args = [path.join(__dirname, 'index.js'), ...process.argv.slice(2)]
	let p = spawn(process.argv[0], args, {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc']
	}).on('message', data => {
		if (data === 'reset') {
			console.log(chalk.yellow.bold('[BOT] Restarting...'))
			p.kill()
			start()
			delete p
		} else if (data === 'uptime') {
			p.send(process.uptime())
		}
	}).on('exit', code => {
		if (code !== 0) {
			console.error(chalk.red.bold(`[BOT] Exited with code: ${code}`))
			start()
		} else {
			console.log(chalk.green.bold('[BOT] Process exited cleanly. Goodbye!'))
			process.exit(0)
		}
	})
}
start()

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
