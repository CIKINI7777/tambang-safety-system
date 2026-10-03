# PT. KNE: Tambang Safety System

Dashboard keselamatan kerja tambang berbasis web untuk monitoring real-time kondisi K3 di area operasional. Aplikasi ini dirancang untuk memudahkan pelaporan insiden, tracking APD, manajemen pelatihan, dan monitoring status karyawan.

![Safety Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## 🚀 Fitur Utama

✅ **Dashboard Overview**
- KPI ringkas (total karyawan, insiden, PPE compliance, pelatihan)
- Status shift dan operasional
- Navigasi menu yang mudah

✅ **Laporan Insiden**
- Form input insiden real-time
- Kategori: Near Miss, Kecelakaan Ringan, Kecelakaan Berat, Kondisi Bahaya
- Tingkat keparahan: Rendah, Sedang, Tinggi, Kritis
- Tracking tindakan penanganan

✅ **Checklist PPE**
- Pencatatan kepatuhan penggunaan alat pelindung diri
- Status item: Baik, Perlu Diganti, Belum Lengkap
- Kategori: Helm, Sabuk, Sepatu, Masker, Sarung Tangan, Pelindung Mata

✅ **Pelatihan & Sertifikasi**
- Daftar pelatihan karyawan
- Status sertifikasi: Valid, Review
- Tracking tanggal dan catatan masa berlaku

✅ **Daftar Karyawan**
- Data personil per divisi
- Shift kerja
- Status kerja real-time
- Last check waktu

✅ **Data Persistence**
- Semua data disimpan di browser
- Data tetap tersimpan setelah refresh halaman
- Tombol reset untuk mengembalikan data demo

## 📋 Struktur Project

```
tambang-safety-system/
├── index.html                    # Halaman utama
├── style.css                     # Styling dashboard
├── script.js                     # Logika aplikasi
├── README.md                     # Dokumentasi project
├── LICENSE                       # Lisensi MIT
├── dashboard/
│   ├── README.md                # Dokumentasi dashboard design
│   └── database-structure.md    # Struktur database lengkap
└── videos/
    └── README.md                # Dokumentasi video kampanye K3
```

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: Browser LocalStorage
- **Font**: Google Fonts (Inter)
- **Responsive**: Mobile-first design

## ⚡ Quick Start

### 1️⃣ Jalankan Lokal (Opsi A: Direct Open)
Cukup buka file `index.html` di browser Anda:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 2️⃣ Jalankan Lokal (Opsi B: Server)
Jika Anda memiliki Python:
```bash
python -m http.server 8000
```

Atau jika menggunakan Node.js:
```bash
npx http-server
```

Lalu buka browser dan akses:
```
http://localhost:8000
```

## 🌐 Deploy ke GitHub Pages

**Cara tercepat untuk publikasi GRATIS:**

### Langkah 1: Clone Repository (atau gunakan repo Anda sendiri)
```bash
git clone https://github.com/CIKINI7777/tambang-safety-system.git
cd tambang-safety-system
```

### Langkah 2: Push ke GitHub
```bash
git add .
git commit -m "Initial commit: Dashboard keselamatan tambang"
git push origin main
```

### Langkah 3: Aktifkan GitHub Pages
1. Buka repository di GitHub
2. Masuk ke tab **Settings**
3. Scroll ke bawah ke bagian **Pages**
4. Di bawah "Source", pilih:
   - Branch: `main`
   - Folder: `/ (root)`
5. Klik **Save**
6. GitHub akan generate URL otomatis

### Langkah 4: Akses Website
Website Anda akan online di:
```
https://USERNAME.github.io/tambang-safety-system/
```

Contoh:
```
https://CIKINI7777.github.io/tambang-safety-system/
```

> ⏱️ Proses publikasi biasanya memakan waktu 1-2 menit.

## 🚀 Deploy ke Netlify (Alternatif)

### Opsi 1: Langsung dari GitHub
1. Masuk ke https://app.netlify.com
2. Klik **Add new site** → **Import an existing project**
3. Pilih GitHub dan pilih repository `tambang-safety-system`
4. Netlify akan auto-detect setting
5. Klik **Deploy site**

### Opsi 2: Drag and Drop
1. Buka https://app.netlify.com
2. Drag folder project ke area upload
3. Selesai! Netlify akan membuat URL unik

Website akan online di URL seperti:
```
https://xyz-123.netlify.app
```

## 🚀 Deploy ke Vercel (Alternatif)

1. Masuk ke https://vercel.com
2. Klik **Add New** → **Project**
3. Pilih repository dari GitHub
4. Klik **Deploy**
5. Vercel akan auto-deploy setiap push

Website akan online di:
```
https://nama-project.vercel.app
```

## 📊 Cara Menggunakan Dashboard

### 1. Dashboard Overview
- Lihat KPI utama di kartu atas
- Monitor status shift dan operasional
- Refresh data dengan tombol **Refresh**

### 2. Form Laporan Insiden
- Isi nama karyawan, divisi, jenis insiden
- Pilih tingkat risiko
- Deskripsi kejadian dan tindakan
- Klik **Simpan Laporan**
- Data akan muncul di panel "Ringkasan Risiko"

### 3. Checklist PPE
- Input nama karyawan dan kategori PPE
- Pilih status (Baik / Perlu Diganti / Belum Lengkap)
- Klik **Catat PPE**
- Data tampil di tabel PPE

### 4. Pelatihan & Sertifikasi
- Lihat daftar pelatihan dan status
- Monitor sertifikasi yang masih valid
- Catatan masa berlaku otomatis ditampilkan

### 5. Reset Data Demo
- Klik tombol **Reset Data Demo**
- Pilih Confirm untuk mengembalikan data awal
- Semua input manual akan dihapus

## 💾 Data & Storage

### LocalStorage Keys
Data disimpan di browser dengan key:
```javascript
- tambang-safety-employees
- tambang-safety-incidents
- tambang-safety-ppe
- tambang-safety-training
```

### Catatan Penting
- ✅ Data otomatis tersimpan setiap kali submit form
- ✅ Data persisten setelah refresh halaman
- ⚠️ Data akan hilang jika browser cache dihapus
- ⚠️ Data tidak tersinkronisasi antar browser/device

## 🎨 Customize Data Demo

Untuk mengubah data awal yang tampil di dashboard, edit file `script.js`:

```javascript
const defaultData = {
  employees: [
    { name: 'Rahmat S', department: 'Penambangan', shift: 'Pagi', status: 'Siap Kerja', lastCheck: '08:00' },
    // Tambah employee baru di sini
  ],
  incidents: [
    // Tambah insiden di sini
  ],
  ppe: [
    // Tambah PPE di sini
  ],
  training: [
    // Tambah pelatihan di sini
  ],
};
```

Simpan file dan refresh browser.

## 🔒 Catatan Keamanan

### Tidak Ada Autentikasi
- Dashboard ini tidak memiliki login/password
- Cocok untuk deployment publik demo
- **Hindari data sensitif atau rahasia**

### Tips Keamanan
- ✅ Gunakan data dummy untuk publik showcase
- ✅ Jangan simpan data karyawan real
- ✅ Jangan simpan gaji atau informasi pribadi
- ✅ Untuk produksi, tambahkan backend + authentication

## 📱 Responsif & Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| Opera | ✅ |
| Mobile (iOS/Android) | ✅ |

## 📚 Dokumentasi Lengkap

- **Dashboard Design**: Lihat `/dashboard/README.md`
- **Database Structure**: Lihat `/dashboard/database-structure.md`
- **Video Kampanye K3**: Lihat `/videos/README.md`

## 🎯 Rencana Pengembangan

Fitur yang bisa ditambahkan di masa depan:
- [ ] Backend API (Node.js / Python)
- [ ] Database (PostgreSQL / MySQL)
- [ ] User Authentication (JWT)
- [ ] Real-time sync antar device
- [ ] Export PDF & Excel
- [ ] Chart & Analytics
- [ ] Mobile app (React Native)
- [ ] Email notification
- [ ] Role-based access control

## 📄 Lisensi

Project ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lengkap.

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat branch baru (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push ke branch (`git push origin feature/improvement`)
5. Buat Pull Request

## 📞 Support & Feedback

Jika Anda mengalami masalah atau punya saran:
- Buat GitHub Issue
- Kontak: eldynohoidla77@gmail.com

## 🎓 Tagline

> **PT. KNE: Budaya Keselamatan, Kinerja Berkelanjutan**
>
> *Bekerja dengan aman, pulang dengan selamat. Zero Accident Culture.*

---

**Made with ❤️ for PT. KNE Mining Safety**

Versi 1.0.0 | Updated: Oktober 2026
