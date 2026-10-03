# PT. KNE: Safety Storytelling Platform

Platform bercerita PT. KNE adalah ruang digital untuk membangun koneksi emosional dan memperkuat budaya keselamatan kerja. Platform ini dirancang untuk mendorong karyawan berbagi pengalaman, belajar dari near miss, mengenali kekuatan tim, dan menumbuhkan kepedulian terhadap kehidupan, keluarga, dan masa depan.

## Fitur utama
- Hero section dengan tema budaya K3 dan zero accident culture
- Dashboard KPI motivasi dan perilaku aman
- Cerita karyawan yang dapat dibaca dan dinikmati
- Filter cerita berdasarkan tema: APD, leadership, keluarga, near miss, SOP
- Form berbagi kisah pribadi dari karyawan
- Modal detail cerita agar pengalaman terasa lebih personal
- Interaksi like pada cerita
- Data disimpan di browser melalui localStorage
- Cocok untuk deployment gratis di GitHub Pages

## Tujuan platform
- Meningkatkan kesadaran K3 secara emosional
- Mengubah mindset dari sekadar aturan menjadi tanggung jawab bersama
- Menumbuhkan empati dan rasa saling menjaga antar karyawan
- Membuka ruang bagi karyawan untuk berbagi pengalaman nyata
- Memotivasi lebih banyak orang untuk melaporkan near miss dan masalah safety

## Struktur project

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
├── .gitignore
├── dashboard/
│   ├── README.md
│   └── database-structure.md
├── videos/
│   └── README.md
└── README.md
```

## Teknologi yang digunakan
- HTML5
- CSS3
- JavaScript (vanilla)
- LocalStorage
- GitHub Pages friendly

## Cara menjalankan lokal

### Opsi 1: buka file langsung
Buka file `index.html` di browser.

### Opsi 2: jalankan server lokal
```bash
python -m http.server 8000
```

Lalu buka:
```text
http://localhost:8000
```

## Cara deploy gratis ke GitHub Pages

1. Push project ke repository GitHub
2. Buka `Settings` repository Anda
3. Pilih `Pages`
4. Source: `Deploy from a branch`
5. Branch: `main`
6. Folder: `/root`
7. Simpan
8. GitHub akan menghasilkan URL publik

Contoh:
```text
https://username.github.io/nama-repo/
```

## Catatan penting
- Platform ini dibuat untuk demo publik dan kebutuhan internal K3
- Tidak ada login/password
- Data disimpan di browser menggunakan localStorage
- Data bersifat demo dan cocok untuk showcase organisasi

## Rekomendasi penggunaan internal
Untuk penggunaan lebih lanjut di perusahaan, project ini bisa dikembangkan ke:
- backend API
- database real-time
- autentikasi admin
- upload foto cerita
- leaderboard dan badge karyawan
- CMS untuk editor internal

## Tagline
> Bekerja dengan aman, pulang dengan selamat. Setiap cerita adalah bentuk kepedulian.

## Lisensi
MIT License
