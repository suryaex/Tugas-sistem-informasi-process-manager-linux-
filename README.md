# Process Manager Linux Berbasis Web

## Deskripsi

Project ini dibuat untuk memenuhi tugas mata kuliah Sistem Operasi. Aplikasi ini berfungsi untuk memonitor dan mengontrol proses yang berjalan pada sistem Linux melalui web browser.

Dengan aplikasi ini, user tidak perlu membuka terminal secara langsung karena semua fitur dasar seperti melihat proses, menghentikan proses, dan menjalankan perintah sudah tersedia dalam tampilan web.

---

## Fitur Utama

* Menampilkan daftar proses yang sedang berjalan
* Mencari proses berdasarkan nama
* Kill process (menghentikan proses)
* Mengubah prioritas proses (nice value)
* Deteksi proses zombie
* Terminal berbasis web (seperti SSH)
* Download database (backup)

---

## Teknologi yang Digunakan

### Backend

* Python
* Flask
* psutil

### Frontend

* React (Vite)
* Tailwind CSS

---

## Struktur Project

```
project-os/
│
├── backend/
│   ├── app.py
│   └── backup.sql
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Cara Install dan Menjalankan

### 1. Clone Repository

```
git clone https://github.com/suryaex/Tugas-sistem-informasi-process-manager-linux-.git
cd Tugas-sistem-informasi-process-manager-linux-
```

---

## 2. Setup Backend

Masuk ke folder backend:

```
cd backend
```

Buat virtual environment:

```
python3 -m venv venv
```

Aktifkan virtual environment:

```
source venv/bin/activate
```

Install dependency:

```
pip install flask flask-cors psutil
```

Jalankan server:

```
python app.py
```

Backend akan berjalan di:

```
http://localhost:5000
```

---

## 3. Setup Frontend

Buka terminal baru, lalu:

```
cd frontend
```

Install dependency:

```
npm install
```

Build project:

```
npm run build
```

Install serve:

```
npm install -g serve
```

Jalankan frontend:

```
serve -s dist -l 5173
```

Frontend akan berjalan di:

```
http://localhost:5173
```

---

## 4. Akses Aplikasi

Buka browser dan akses:

```
http://IP_SERVER:5173
```

Contoh:

```
http://192.168.1.12:5173
```

---

## 5. Menjalankan Otomatis Saat Server Nyala

Backend dan frontend sudah dikonfigurasi menggunakan systemd, jadi akan otomatis berjalan saat server restart.

Cek status:

```
sudo systemctl status process-manager
sudo systemctl status frontend
```

---

## 6. Cara Menggunakan

### Melihat proses

Semua proses akan langsung tampil di halaman utama.

### Mencari proses

Gunakan kolom search untuk mencari nama proses tertentu.

### Kill process

Klik tombol **Kill** pada proses yang ingin dihentikan.

### Mengubah prioritas

* Nice → menurunkan prioritas
* High → menaikkan prioritas

### Terminal

Masukkan perintah Linux lalu klik Execute.

### Zombie process

Klik tombol **Zombie Only** untuk menampilkan hanya proses zombie.

### Download database

Klik tombol **Download DB** untuk mengunduh file backup.

---

## Catatan

* Pastikan port backend (5000) tidak digunakan oleh aplikasi lain
* Pastikan backend sudah berjalan sebelum membuka frontend
* Jika tidak bisa akses, cek firewall atau IP server

---

## Penutup

Project ini dibuat sebagai implementasi sederhana dari konsep manajemen proses pada sistem operasi Linux yang dikombinasikan dengan teknologi web.

---

## dokumentasi
<img width="960" height="1032" alt="Screenshot 2026-04-16 165601" src="https://github.com/user-attachments/assets/b51763fa-fa3f-493d-91fd-70b5ca515396" />
<img width="1920" height="1080" alt="Screenshot 2026-04-16 165631" src="https://github.com/user-attachments/assets/b3941db7-bfe7-4987-9df1-f6ac1052b2a7" />
