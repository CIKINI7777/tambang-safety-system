# Dashboard PT. KNE - Safety & Risk Monitoring

## 1. Tujuan Dashboard
Dashboard ini dirancang untuk membantu PT. KNE memonitor dan menganalisis kondisi keselamatan kerja di area tambang secara real-time. Fokus utama dashboard adalah:

- memantau kecelakaan dan near miss
- mengevaluasi kepatuhan penggunaan APD
- memantau inspeksi alat dan area kerja
- melihat pelatihan dan sertifikasi karyawan
- mendeteksi area berisiko tinggi
- mengelola tindakan perbaikan dan follow-up

## 2. Struktur Menu Dashboard

### Sidebar navigation
- Dashboard
- Overview
- Insiden
- Near Miss
- APD
- Safety Audit
- Inspeksi Alat
- Pelatihan
- Sertifikasi
- Risk Matrix
- Karyawan
- Divisi
- Laporan
- Pengaturan

## 3. Halaman Utama (Dashboard)

### 3.1 Header
- Logo PT. KNE
- Search bar
- Notifikasi
- Pilihan tanggal
- Pilihan shift
- Nama user / role
- Tombol Export

### 3.2 KPI Ringkas
Card KPI utama:
- Total karyawan aktif
- Total insiden bulan ini
- Near miss bulan ini
- Kepatuhan APD
- Pelatihan selesai
- Sertifikasi mendekati expired
- Inspeksi alat tertunda
- Corrective actions yang belum ditangani
- Risiko tinggi
- Waktu kerja tanpa insiden

### 3.3 Grafik Trend
- Trend insiden per bulan
- Trend near miss per bulan
- Trend kepatuhan APD
- Trend pelatihan dan sertifikasi
- Trend inspeksi alat
- Trend corrective action closure

### 3.4 Analisis Risiko
- Heatmap area berisiko
- Area kerja kritis
- Tingkat kemungkinan dan dampak
- Prioritas tindakan

### 3.5 Tabel Aktivitas Terbaru
- Laporan baru
- Insiden masuk
- Inspeksi alat gagal
- APD tidak lengkap
- Tindak lanjut tertunda

## 4. Modul Insiden & Kecelakaan

### Fitur utama
- daftar insiden harian
- grafik jenis insiden
- insiden per divisi
- insiden per shift
- insiden per area kerja
- tingkat keparahan
- root cause

### Filter
- tanggal
- divisi
- shift
- area
- kategori kecelakaan
- status

### Tabel data
- ID laporan
- Tanggal
- Area kerja
- Divisi
- Jenis insiden
- Tingkat keparahan
- Status penyelesaian
- Penanggung jawab

## 5. Modul Near Miss

### Data yang ditampilkan
- jumlah near miss per hari / bulan
- kategori near miss
- lokasinya
- potensi dampak
- status tindak lanjut

### Tujuan
- mencegah kecelakaan sebelum terjadi
- mengidentifikasi pola risiko
- menilai efektivitas budaya keselamatan

## 6. Modul APD & Kepatuhan

### KPI
- compliance rate APD
- total pekerja tanpa APD lengkap
- divisi dengan kepatuhan rendah
- item APD yang paling sering tidak dipakai

### Tampilan
- pie chart penggunaan APD
- bar chart compliance per divisi
- tabel pekerja yang belum lengkap APD

## 7. Modul Inspeksi Alat & Area

### Data utama
- jumlah inspeksi harian
- inspeksi lulus / gagal
- alat dengan kondisi kritis
- area berpotensi berbahaya
- status corrective action

### Kategori inspeksi
- alat berat
- kendaraan operasional
- area kerja tambang
- fasilitas pendukung
- rambu dan signage

## 8. Modul Pelatihan & Sertifikasi

### KPI
- pelatihan selesai
- pelatihan tertunda
- sertifikasi aktif
- sertifikasi akan expired
- pekerja yang perlu refresher

### Tampilan
- table pelatihan karyawan
- grafik pelatihan per divisi
- daftar sertifikasi yang mendekati expired

## 9. Modul Risk Matrix

### Kategori risiko
- longsor
- tertimpa material
- benturan alat berat
- bunyi bising
- paparan debu
- kebakaran
- kerja di ketinggian
- listrik

### Parameter
- kemungkinan kejadian
- dampak
- tingkat risiko
- prioritas tindakan
- status mitigasi

## 10. Modul Karyawan & Divisi

### Data utama
- nama karyawan
- divisi
- shift
- status kerja
- pelatihan terakhir
- sertifikasi aktif
- riwayat insiden
- status APD

## 11. Modul Laporan & Audit

### Fitur
- laporan harian
- laporan bulanan
- export PDF / Excel
- audit K3
- ringkasan tindak lanjut

## 12. Role Access
- Admin
- Safety Manager
- Supervisor
- Officer K3
- HR / Training
- Site Manager
- User

## 13. Visual Design

### Warna utama
- biru: profesional dan stabil
- hijau: aman, sehat, terkendali
- kuning: perhatian / warning
- merah: risiko tinggi / kritis
- abu-abu: neutral
- putih: ruang kosong / clarity

### Font yang disarankan
- Inter
- Poppins
- Montserrat
- Roboto

### Style UI
- clean
- modern
- minimal
- mudah dibaca
- menonjolkan data dan urgensi

## 14. Mockup Halaman Utama

### Layout umum
- Header atas
- Sidebar
- KPI cards
- Chart area
- Risk matrix panel
- Recent activity panel
- Corrective action panel

### Struktur blok utama
1. Header
2. KPI cards
3. Trend chart section
4. Risk overview
5. APD compliance
6. Recent incidents
7. Corrective action list

## 15. Teknologi Rekomendasi
- Frontend: React, Next.js, Tailwind CSS
- Backend: Node.js, Express, NestJS
- Database: PostgreSQL
- Chart library: Recharts, Chart.js, ApexCharts
- Authentication: JWT
- Deployment: Vercel, Railway, Render

## 16. Target output aplikasi
Dashboard ini dapat digunakan untuk:
- manajemen K3 PT. KNE
- monitoring real-time area tambang
- inspeksi alat dan area kerja
- analisis kecelakaan dan near miss
- pelaporan internal perusahaan
- support proses audit dan evaluasi K3

## 17. Ringkasan
Desain dashboard PT. KNE ini harus memberi fokus pada keamanan, kepatuhan, risks, dan tindakan perbaikan. dashboard ini harus mempermudah tim manajemen dalam mengambil keputusan cepat dan berbasis data, sekaligus memperkuat budaya keselamatan kerja dan nol kecelakaan.
