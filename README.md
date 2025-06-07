<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Asuma Gen 2 - WhatsApp Bot</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f4f6f9;
      color: #222;
      line-height: 1.6;
      padding: 20px;
      max-width: 900px;
      margin: auto;
    }
    h1, h2 {
      color: #007BFF;
    }
    img {
      max-width: 180px;
      border-radius: 12px;
    }
    code {
      background: #eee;
      padding: 2px 6px;
      border-radius: 4px;
    }
    pre {
      background: #1e1e1e;
      color: #eee;
      padding: 10px;
      overflow-x: auto;
      border-radius: 8px;
    }
    a {
      color: #007BFF;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .badge {
      display: inline-block;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>🧠 Asuma Gen 2 - WhatsApp Bot</h1>
  <img src="https://n.uguu.se/HoZfesxq.jpg" alt="Asuma Gen 2 Logo" />
  <p><strong>Asuma Gen 2</strong> adalah bot WhatsApp berbasis <strong>Node.js</strong> yang ringan, modular, dan mudah dikembangkan. Cocok untuk otomatisasi WhatsApp seperti auto-reply, manajemen grup, hingga interaksi berbasis perintah.</p>

  <blockquote>⚠️ Disarankan menggunakan <strong>WhatsApp Business</strong> agar lebih kompatibel dengan library.</blockquote>

  <h2>🚀 Fitur Unggulan</h2>
  <ul>
    <li>🔁 Auto-reply pesan masuk</li>
    <li>💬 Custom prefix command</li>
    <li>📷 Pengolahan media (gambar, video, audio)</li>
    <li>🗃️ Dukungan database lokal & remote</li>
    <li>🔌 Mudah dikembangkan & dimodifikasi</li>
    <li>📦 Support Termux dan VPS</li>
  </ul>

  <h2>🧰 Persiapan Sistem</h2>
  <ul>
    <li>Termux (Android)</li>
    <li>Git</li>
    <li>Node.js</li>
    <li>FFmpeg</li>
    <li>ImageMagick</li>
    <li>Yarn</li>
  </ul>

  <h2>📥 Cara Instalasi</h2>
  <ol>
    <li>Update Termux:
      <pre><code>pkg update && pkg upgrade</code></pre>
    </li>
    <li>Opsional: ganti mirror repo:
      <pre><code>termux-change-repo</code></pre>
    </li>
    <li>Install dependensi:
      <pre><code>pkg install git nodejs ffmpeg imagemagick yarn</code></pre>
    </li>
    <li>Clone repositori:
      <pre><code>git clone https://github.com/ditss-dev/asuma
cd asuma</code></pre>
    </li>
    <li>Install module:
      <pre><code>yarn</code></pre>
    </li>
    <li>Jalankan bot:
      <pre><code>node .</code></pre>
    </li>
    <li>Pindai QR via WhatsApp Business</li>
  </ol>

  <h2>⚙️ Konfigurasi Tambahan</h2>
  <p>Edit file berikut jika ingin kustomisasi:</p>
  <ul>
    <li><code>config.js</code> – konfigurasi utama</li>
    <li><code>.env</code> – token, API Key, dsb</li>
    <li><code>database.json</code> – data pengguna</li>
  </ul>

  <h2>🙌 Terima Kasih Kepada</h2>
  <ul>
    <li><a href="https://github.com/ditss-dev" target="_blank">ditss</a></li>
    <li><a href="https://github.com/contributor2" target="_blank">whiskey socket</a></li>
    <li>Creator Library <a href="https://github.com/adiwajshing/Baileys">Baileys</a></li>
    <li>Komunitas Open Source Indonesia</li>
  </ul>

  <h2>💬 Bantuan & Support</h2>
  <ul>
    <li>Buka <a href="https://github.com/ditss-dev/asuma/issues" target="_blank">issue di GitHub</a></li>
    <li>Email: <a href="mailto:ditss-cloud@gmail.com">ditss-cloud@gmail.com</a></li>
  </ul>

  <h2>📄 Lisensi</h2>
  <p>Lisensi: <strong>MIT</strong>. Lihat file <code>LICENSE</code> untuk info lengkap.</p>

  <h2>✅ Catatan Penting</h2>
  <p>Bot hanya aktif jika WhatsApp Web terhubung. Jika Termux dimatikan, jalankan ulang:</p>
  <pre><code>node .</code></pre>

  <div class="badge">
    <img src="https://github.com/naz.../actions/workflows/main.yml/badge.svg" alt="Build Status"/>
  </div>
</body>
</html>
