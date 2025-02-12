// Mengimpor modul yang diperlukan
const express = require("express"); // Mengimpor framework Express untuk membuat aplikasi web
const http = require("http"); // Mengimpor modul HTTP bawaan Node.js untuk membuat server
const socketIo = require("socket.io"); // Mengimpor Socket.io untuk komunikasi real-time
const cors = require("cors"); // Mengimpor CORS untuk mengizinkan permintaan lintas asal

// Membuat instance aplikasi Express
const app = express();
// Membuat server HTTP menggunakan aplikasi Express
const server = http.createServer(app);
// Menginisialisasi Socket.io dengan server dan mengatur CORS agar mengizinkan semua asal
const io = socketIo(server, {
    cors: { origin: "*" }
});

// Menggunakan middleware CORS pada aplikasi Express
app.use(cors());

// Variabel untuk menyimpan daftar pengguna yang terhubung
let pengguna = {}; // Menyimpan daftar pengguna yang terhubung

// Menangani event 'connection' ketika pengguna terhubung ke server
io.on("connection", (socket) => {
    console.log("Pengguna terhubung:", socket.id); // Mencetak ID socket pengguna yang terhubung

    // Menangani event 'join' ketika pengguna masuk dengan nama pengguna
    socket.on("join", (namaPengguna) => {
        pengguna[socket.id] = namaPengguna; // Menyimpan nama pengguna berdasarkan ID socket
        io.emit("daftarPengguna", Object.values(pengguna)); // Mengirim daftar pengguna yang terhubung ke semua klien
        io.emit("pesanObrolan", { pengguna: "Server", pesan: `${namaPengguna} bergabung dalam obrolan` }); // Mengirim pesan bahwa pengguna baru telah bergabung
    });

    // Menangani event 'pesanObrolan' untuk mengirim pesan dari pengguna
    socket.on("pesanObrolan", (data) => {
        io.emit("pesanObrolan", { pengguna: pengguna[socket.id], pesan: data }); // Meneruskan pesan ke semua klien
    });

    // Menangani event 'disconnect' ketika pengguna terputus
    socket.on("disconnect", () => {
        if (pengguna[socket.id]) { // Memeriksa apakah pengguna terdaftar
            io.emit("pesanObrolan", { pengguna: "Server", pesan: `${pengguna[socket.id]} meninggalkan obrolan` }); // Mengirim pesan bahwa pengguna telah meninggalkan obrolan
            delete pengguna[socket.id]; // Menghapus pengguna dari daftar
            io.emit("daftarPengguna", Object.values(pengguna)); // Memperbarui daftar pengguna yang terhubung
        }
        console.log("Pengguna terputus:", socket.id); // Mencetak ID socket pengguna yang terputus
    });
});

// Menjalankan server pada port 3000
server.listen(3000, () => {
    console.log("Server Socket.io berjalan di port 3000"); // Mencetak pesan bahwa server berjalan
});
