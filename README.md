📱 WA Tanpa Save Nomor
   
WA Tanpa Save Nomor adalah aplikasi web modern yang memungkinkan Anda mengirim pesan WhatsApp tanpa perlu menyimpan nomor tujuan di kontak Anda. Dibangun dengan Next.js, aplikasi ini menawarkan pengalaman pengguna yang intuitif, cepat, dan responsif, dengan dukungan dua bahasa (Indonesia 🇮🇩 dan Inggris 🇬🇧), animasi halus, dan penyimpanan riwayat pesan secara lokal. Dideploy langsung di Vercel untuk aksesibilitas maksimal.
🌐 Demo: https://wasend.aibiz.id!

🚀 Fitur Utama

📩 Kirim Pesan Tanpa Simpan NomorForm sederhana untuk mengirim pesan WhatsApp langsung dengan nomor tujuan dan pesan. Pilih kode negara dari dropdown (default: +62 🇮🇩).

🌍 Dukungan Kode NegaraDropdown dengan daftar lengkap negara dan kode telepon menggunakan react-select-country-list, memudahkan pengiriman ke nomor internasional.

📜 Riwayat PesanSimpan hingga 10 pesan terakhir di localStorage (permanen hingga cache dihapus manual). Fitur:

Salin Pesan 📋: Salin nomor dan pesan ke clipboard.
Kirim Ulang 🔄: Isi ulang form dengan data riwayat.
Hapus Riwayat 🗑️: Tombol untuk menghapus semua riwayat secara instan.


📚 Panduan PenggunaanPanduan langkah demi langkah untuk membantu pengguna memahami cara menggunakan aplikasi.

ℹ️ Tentang Aibiz IDInformasi tentang Aibiz ID sebagai penyedia resmi WhatsApp Business API, dengan tautan ke situs resmi aibiz.id.

🌟 Animasi dan Styling Modern  

Animasi halus menggunakan Framer Motion untuk transisi section dan tombol interaktif.
Slider riwayat pesan dengan animasi CSS (animate-slide).
Desain responsif dengan Tailwind CSS, tema warna WhatsApp-inspired (hijau dan krem).


🗣️ Dukungan Dua BahasaTeks dalam bahasa Indonesia dan Inggris, dengan deteksi otomatis berdasarkan bahasa perangkat pengguna dan tombol untuk beralih bahasa secara manual.

⚡ Deployment CepatDideploy langsung di Vercel tanpa setup lokal, memastikan performa optimal dan pembaruan instan.



🛠️ Teknologi yang Digunakan

Frontend: Next.js 14.2.15, React 18.3.1
Styling: Tailwind CSS 3.4.14, PostCSS, Autoprefixer
Animasi: Framer Motion 11.18.2
Ikon: React Icons 5.5.0
Data Negara: React Select Country List 2.2.3
Lainnya: date-fns, date-fns-tz untuk pengelolaan waktu
Deployment: Vercel


🎨 Animasi dan Font
Animasi

Framer Motion:
Transisi masuk untuk section (fade-in, slide-up) dengan motion.section.
Efek hover dan tap pada tombol dengan skala (scale: 1.1 saat hover, scale: 0.95 saat tap).
Animasi ikon berulang (misalnya, naik-turun pada ikon di riwayat).


CSS Animasi:
Slider riwayat pesan menggunakan @keyframes slide untuk pergerakan horizontal yang mulus.
Scrollbar kustom dengan warna tema WhatsApp (--whatsapp-dark-green).



Font

Helvetica Neue dan Poppins untuk heading (h1-h6), memberikan tampilan modern dan profesional.
Inter untuk teks body, memastikan keterbacaan tinggi.
Di-load melalui Google Fonts dengan fallback ke sans-serif:<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@500;700&display=fallback" rel="stylesheet" />



Ikon

Menggunakan React Icons (Io5 series) untuk ikon seperti:
📱 WhatsApp (IoLogoWhatsapp)
📋 Copy (IoCopyOutline)
🔄 Resend (IoSendSharp)
🗑️ Trash (IoTrashOutline)
🏳️ Flag (FiFlag) untuk toggle bahasa




📂 Struktur Proyek
├── components
│   ├── Footer.js
│   ├── Header.js
│   ├── MainContent.js
├── pages
│   ├── _app.js
│   ├── delete.js
│   ├── index.js
│   ├── privacy.js
│   ├── tos.js
├── public
│   ├── favicon.ico
├── styles
│   ├── globals.css
│   ├── tailwind.config.js
├── LICENSE
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js


🖥️ Cara Menjalankan (Untuk Pengembangan)

Catatan: Proyek ini di-deploy langsung di Vercel, tetapi Anda bisa menjalankannya secara lokal untuk pengembangan.


Clone Repositori
git clone https://github.com/your-username/wa-tanpa-save-nomor.git
cd wa-tanpa-save-nomor


Install Dependensi
npm install


Jalankan Mode Development
npm run dev


Buka di BrowserAkses http://localhost:3000 untuk melihat aplikasi.



🌐 Deployment di Vercel

Hubungkan repositori GitHub Anda ke Vercel.
Konfigurasi proyek di Vercel dengan pengaturan default Next.js.
Deploy otomatis akan berjalan setiap kali Anda push ke branch utama.
Akses aplikasi melalui URL yang diberikan Vercel (misalnya, https://your-vercel-app.vercel.app).


📜 Lisensi
Dilisensikan di bawah MIT License. Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode ini sesuai ketentuan lisensi.

🤝 Kontribusi
Kami menyambut kontribusi! Jika ingin menambahkan fitur atau memperbaiki bug:

Fork repositori ini.
Buat branch baru (git checkout -b feature/nama-fitur).
Commit perubahan Anda (git commit -m 'Menambahkan fitur X').
Push ke branch (git push origin feature/nama-fitur).
Buat Pull Request di GitHub.


📬 Kontak
Dibuat oleh Aibiz ID, penyedia resmi WhatsApp Business API. Hubungi kami untuk pertanyaan atau dukungan:

WhatsApp: +62 877-8761-5432 📱
Email: support@aibiz.id ✉️
Alamat: Alday Group, DI Yogyakarta 🗺️ Lihat di Google Maps
Website: aibiz.id 🌐

⭐ Berikan bintang di GitHub jika Anda menyukai proyek ini!