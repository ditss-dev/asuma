# 🧠 Asuma Gen 2 - WhatsApp Bot  
  
![Asuma Gen 2 Logo](https://o.uguu.se/rHqEwdMX.jpg)    
**Asuma Gen 2** adalah WhatsApp bot berbasis Node.js yang ringan dan mudah dikembangkan. Cocok digunakan untuk kebutuhan otomatisasi seperti auto-reply, pengelolaan grup, dan interaksi berbasis command.  
  
> ⚠️ Pastikan kamu menggunakan WhatsApp Messenger agar kompatibel dengan library WhatsApp yang digunakan.
> atau gunakan WhatsApp bisnis terbaru di PlayStore
  
---  
  
## 📦 Fitur Utama  
- Auto-reply pesan masuk  
- Support perintah custom (`prefix`)  
- Pengolahan media (gambar, video, dll)  
- Integrasi database lokal/remote  
- Mudah dikembangkan dan dimodifikasi  
  
---  
  
## 🧰 Kebutuhan Sistem  
  
Pastikan semua dependensi berikut sudah terinstal:  
  
- Termux (Android)  
- Git  
- Node.js  
- FFmpeg  
- ImageMagick  
- Yarn  
  
---  
  
## 📥 Cara Instalasi  
  
1. Update dan upgrade paket Termux:  
   ```bash  
   pkg update && pkg upgrade  
   ```  
  
2. Ganti repository Termux jika dibutuhkan:  
   ```bash  
   termux-change-repo  
   ```  
  
3. Install dependensi:  
   ```bash  
   pkg install git  
   pkg install nodejs  
   pkg install imagemagick  
   pkg install ffmpeg  
   pkg install yarn  
   ```  
  
4. Clone repository:  
   ```bash  
   git clone https://github.com/ditss-dev/asuma  
   ```  
  
5. Masuk ke direktori project:  
   ```bash  
   cd asuma  
   ```  
  
6. Install modul JavaScript:  
   ```bash  
   yarn  
   ```  
  
7. Jalankan bot:  
   ```bash  
   node .  
   ```  
  
8. Pindai kode QR menggunakan aplikasi WhatsApp Business kamu.  
  
---  
  
## 🛠️ Konfigurasi Tambahan (Opsional)  
  
Jika kamu ingin mengubah konfigurasi seperti prefix, token, atau database, silakan edit file berikut:  
- `config.js`  
- `.env` *(jika ada)*  
- `database.json` *(atau format lain tergantung implementasi)*  
  
---  
  
## 🙏 Terima Kasih (Thanks To)  
  
Kami mengucapkan terima kasih kepada pihak-pihak yang telah memberikan kontribusi atau inspirasi dalam pembuatan bot ini:  
  
- [ditss](https://github.com/ditss-dev)  
- [WhiskeySockets](https://github.com/WhiskeySockets)  
- Creator Library Baileys  
- Komunitas Open Source Indonesia
- [WhatsApp](https://github.com/whatsapp)
  
---  
  
## 💬 Support & Bantuan  
  
Jika kamu menemui error atau butuh bantuan, kamu bisa:  
- Membuka issue di [disni](https://github.com/ditss-dev/asuma/issues)
- My saluran [WhatsApp](https://whatsapp.com/channel/0029VaflxUXGE56szLxlPJ3c)
- Hubungi saya via email: ditss-cloud@gamil.com  
  
---  
  
## 📄 Lisensi  
  
Project ini dilisensikan di bawah lisensi MIT. Silakan lihat file `LICENSE` untuk detail lebih lanjut.  
  
---  
  
## ✅ Catatan Penting  
  
Bot ini hanya bekerja selama WhatsApp Web tetap terhubung. Jika kamu menutup aplikasi Termux atau restart perangkat, kamu harus menjalankan ulang perintah `node .`.  
```markdown  
![Build Status](https://github.com/ditss-dev/actions/workflows/main.yml/badge.svg)  
```  
