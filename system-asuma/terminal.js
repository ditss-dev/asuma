let loadingInterval;
let isForward = true;
let position = 0;

function startIdleLoading(text = '🤖 Menunggu pesan masuk...') {
    const barLength = 20;
    if (loadingInterval) return;

    position = 0;
    isForward = true;

    loadingInterval = setInterval(() => {
        let bar = Array(barLength).fill('░');
        bar[position] = '█';
        const output = `\r\x1b[36m${text} [${bar.join('')}]\x1b[0m`;
        process.stdout.write(output);

        if (isForward) {
            position++;
            if (position >= barLength - 1) isForward = false;
        } else {
            position--;
            if (position <= 0) isForward = true;
        }
    }, 80);
}

function stopIdleLoading() {
    if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
        process.stdout.write('\n\x1b[32m✔ Menerima pesan!\x1b[0m\n');
    }
}

module.exports = {
    startIdleLoading,
    stopIdleLoading
};
