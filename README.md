# Chat Multi-User dengan Socket.io dan PHP Native

## 📌 Deskripsi Proyek
Proyek ini adalah aplikasi chat multi-user berbasis web menggunakan **PHP Native** dan **Socket.io**. Aplikasi ini memungkinkan pengguna untuk berkomunikasi secara real-time tanpa perlu melakukan refresh halaman.

## 🚀 Fitur
- Chat multi-user dengan WebSocket
- Komunikasi real-time menggunakan **Socket.io**
- Interface sederhana berbasis **HTML, CSS, dan JavaScript**
- Backend menggunakan **PHP Native**

## 🛠️ Teknologi yang Digunakan
- **PHP** (Backend)
- **Node.js & Express.js** (WebSocket Server)
- **Socket.io** (Real-time communication)
- **MySQL** (Database, jika digunakan untuk menyimpan chat)
- **Bootstrap** (UI Framework)

## 📂 Struktur Folder
```
chat_app/
│-- public/
│   │-- index.php  # Halaman utama chat
│-- server.js  # Server WebSocket dengan Node.js


## 🔧 Cara Instalasi dan Menjalankan

### 1️⃣ **Clone Repository**
```bash
git clone https://github.com/edisuherlan/socket.io-chat_multi_user.git
cd chat_app2
```

### 2️⃣ **Menjalankan Server WebSocket (Node.js)**
- Install **Node.js** jika belum terpasang.
- Jalankan perintah berikut di terminal:
```bash
cd server
npm install express socket.io cors
node server.js
```

> Server akan berjalan di `http://localhost:3000`

### 3️⃣ **Jalankan Aplikasi Chat**
- Akses `http://localhost/chat_app/public/` di browser.
- Buka beberapa tab untuk menguji chat multi-user secara real-time.

## 🎯 Cara Menggunakan
1. Buka aplikasi di browser.
2. Masukkan nama dan mulai mengirim pesan.
3. Cobalah membuka aplikasi di dua atau lebih tab/browser untuk melihat komunikasi real-time.

## 📜 Lisensi
Proyek ini bersifat open-source dan dapat digunakan serta dimodifikasi sesuai kebutuhan.

---
**🚀 Selamat mencoba! Jika ada pertanyaan, jangan ragu untuk bertanya!**

