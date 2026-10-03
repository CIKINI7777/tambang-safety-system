# Tambang Safety System

Dashboard keamanan tambang sederhana berbasis HTML, CSS, dan JavaScript yang dapat di-deploy secara gratis tanpa autentikasi/login. Aplikasi ini dibuat untuk memantau data keselamatan kerja seperti laporan insiden, checklist PPE, pelatihan, dan status karyawan.

## Fitur utama
- Dashboard KPI keselamatan kerja
- Form laporan insiden
- Checklist PPE
- Pelatihan dan sertifikasi
- Daftar karyawan dan status kerja
- Simpan data di browser menggunakan localStorage
- Tanpa backend, tanpa database, tanpa login/password

## Teknologi
- HTML
- CSS
- JavaScript
- LocalStorage (browser)

## Struktur project
```text
.
├── index.html
├── style.css
├── script.js
├── README.md
├── dashboard/
│   ├── README.md
│   └── database-structure.md
├── videos/
│   └── README.md
├── LICENSE
└── .gitignore
```

## Cara menjalankan lokal
### Opsi 1: buka langsung file HTML
- Buka file `index.html` di browser.
- Ini paling sederhana dan cocok untuk demo cepat.

### Opsi 2: jalankan server lokal
```bash
python -m http.server 8000
```
Lalu buka:
```text
http://localhost:8000
```

## Cara deploy gratis tanpa login/password
Aplikasi ini bersifat statis, jadi sangat cocok untuk deployment gratis tanpa autentikasi.

### 1) GitHub Pages (gratis)
1. Upload project ke GitHub.
2. Buka repository Anda.
3. Masuk ke `Settings` -> `Pages`.
4. Pilih source:
   - Branch: `main`
   - Folder: `/root`
5. Save.
6. Link deploy akan dibuat otomatis seperti:
```text
https://username.github.io/nama-repo/
```

### 2) Netlify (gratis)
1. Masuk ke https://www.netlify.com
2. Pilih `Add new site` -> `Deploy manually`
3. Drag-and-drop folder project Anda
4. Netlify akan otomatis membuat URL publik

### 3) Vercel (gratis)
1. Import repository ke Vercel
2. Pilih framework: `Other` atau `Static` project
3. Deploy tanpa konfigurasi khusus

## Catatan penting
- Aplikasi ini tidak memiliki login/password karena dibuat untuk deployment publik dan demo sederhana.
- Semua data disimpan di browser menggunakan `localStorage`.
- Data akan hilang jika browser membersihkan data penyimpanan lokal.

## Customize data demo
File `script.js` berisi data awal untuk demo. Anda bisa mengedit blok berikut:
```js
const defaultData = {
  employees: [...],
  incidents: [...],
  ppe: [...],
  training: [...],
};
```

## Tips deploy aman untuk demo publik
Karena tidak ada login, pastikan:
- data yang ditampilkan adalah data demo bukan data sensitif
- jangan simpan informasi rahasia atau data karyawan real di localStorage
- gunakan data dummy untuk publik showcase

## Lisensi
Project ini menggunakan lisensi MIT. Lihat file `LICENSE`.

## Catatan pengembangan
Jika Anda ingin versi yang lebih lengkap di masa depan, project ini dapat dikembangkan ke:
- backend API
- database PostgreSQL/MySQL
- autentikasi admin
- dashboard real-time
- fitur upload foto dan laporan

## Kesimpulan
Project ini siap untuk deployment gratis tanpa login/password karena berbasis HTML statis dan localStorage. Anda cukup upload ke GitHub Pages, Netlify, atau Vercel dan situs akan langsung online.
