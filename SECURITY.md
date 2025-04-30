# Kebijakan Keamanan

## Versi yang Didukung

Berikut adalah versi proyek Semangat Sayang yang saat ini didukung dengan pembaruan keamanan:

| Versi  | Didukung          |
| ------ | ----------------- |
| 1.2.x  | :white_check_mark: |
| 1.1.x  | :white_check_mark: |
| 1.0.x  | :x:               |
| < 1.0  | :x:               |

## Melaporkan Kerentanan

Kami sangat menghargai kontribusi Anda dalam menjaga keamanan proyek Semangat Sayang. Jika Anda menemukan kerentanan keamanan, mohon ikuti langkah-langkah berikut:

### Proses Pelaporan

1. **Pelaporan Awal**
   - Kirim email ke [email protected] dengan subjek "Kerentanan Keamanan: Semangat Sayang"
   - JANGAN membuat issue publik untuk masalah keamanan
   - Sertakan detail sebanyak mungkin tentang kerentanan yang ditemukan

2. **Informasi yang Diperlukan**
   - Deskripsi detail tentang kerentanan
   - Langkah-langkah untuk mereproduksi masalah
   - Dampak potensial dari kerentanan
   - Saran perbaikan (jika ada)

3. **Respons dan Tindak Lanjut**
   - Anda akan menerima konfirmasi dalam 48 jam
   - Update status akan diberikan setiap 7 hari
   - Prioritas penanganan berdasarkan tingkat keparahan

### Kebijakan Pengungkapan

- Kerentanan akan ditangani secara pribadi hingga patch tersedia
- Kredit akan diberikan kepada pelapor dalam catatan rilis (jika diinginkan)
- Pengungkapan penuh akan dilakukan setelah 30 hari atau setelah patch tersedia

### Penghargaan

Kami menghargai upaya Anda dalam membantu mengamankan Semangat Sayang. Pelapor kerentanan yang valid akan:
- Disebutkan dalam Hall of Fame keamanan kami
- Menerima pengakuan dalam catatan rilis
- Diberikan prioritas untuk kontribusi di masa mendatang

### Cakupan

Fokus keamanan meliputi:
- Keamanan data pengguna
- Integritas localStorage
- Kerentanan XSS
- Masalah privasi
- Keamanan API (jika ada)

### Pengecualian

Berikut adalah hal-hal yang BUKAN termasuk dalam cakupan keamanan:
- Bug yang tidak mempengaruhi keamanan
- Masalah kinerja
- Masalah UX/UI
- Spam atau serangan DoS

## Praktik Keamanan

Proyek ini menerapkan praktik keamanan berikut:
- Validasi input yang ketat
- Sanitasi data
- Enkripsi data sensitif
- Pembaruan berkala untuk dependencies
- Pengujian keamanan rutin

## Pembaruan

Kebijakan keamanan ini akan diperbarui sesuai kebutuhan. Perubahan signifikan akan dikomunikasikan melalui:
- Pembaruan SECURITY.md
- Pengumuman di repository
- Notifikasi kepada kontributor aktif
