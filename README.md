# Semangat Sayang - Motivational Website

Sebuah website sederhana untuk memberikan motivasi dan semangat bagi pasangan dalam mencapai target pekerjaan.

## Fitur

- 📅 Tampilan tanggal otomatis dan jam digital
- 💬 Kutipan motivasi acak dengan 15+ quotes inspiratif
- ✅ Daftar target yang dapat dicentang
- 📊 Progress bar untuk melacak pencapaian
- 📝 Kemampuan menambahkan target baru
- 🗑️ Opsi untuk menghapus target yang tidak diperlukan
- 🔄 Reset otomatis target setiap hari Minggu
- 🔔 Notifikasi pengingat untuk target yang belum diselesaikan
- 💾 Penyimpanan lokal untuk menjaga data target tetap ada saat browser di-refresh
- 💌 Pesan personal

## Teknologi

- HTML5
- CSS3
- JavaScript (Vanilla)
- Local Storage API
- Web Notifications API
- Responsive design (mobile-first approach)

## Cara Menggunakan

1. Clone repository ini
2. Buka file `index.html` di browser
3. Personalisasi pesan dan target sesuai kebutuhan
4. Klik "Aktifkan Notifikasi" untuk menerima pengingat
5. Tambahkan target baru yang ingin dicapai
6. Dapatkan quote motivasi baru dengan mengklik tombol "Quote Baru"

## Preview

Website ini didesain dengan pendekatan mobile-first, sehingga tampilan akan optimal pada perangkat mobile maupun desktop.

## Fitur Khusus

### Reset Mingguan Otomatis
Target akan otomatis direset setiap hari Minggu, memberikan kesempatan untuk memulai minggu baru dengan target yang segar tanpa perlu menghapus target lama satu per satu.

### Sistem Notifikasi
Website ini menggunakan Web Notifications API untuk mengirimkan pengingat tentang target yang belum diselesaikan. Notifikasi akan muncul 2 jam setelah target dibuat jika belum ditandai selesai.

### Quote Motivasi Acak
Terdapat 15+ kutipan motivasi dan cinta yang dapat diganti secara acak dengan mengklik tombol "Quote Baru".

## Kustomisasi

Anda dapat menyesuaikan website ini dengan:
- Mengubah warna tema di file `style.css` (variabel CSS)
- Menambah, mencentang, atau menghapus target sesuai kebutuhan
- Menambahkan quote baru di array `quotes` dalam file `index.html`
- Menyesuaikan waktu pengingat notifikasi (default: 2 jam)
- Menyesuaikan pesan personal di bagian "Pesan Untukmu"

---

Dibuat dengan ❤️ untuk memberikan semangat dan dukungan
