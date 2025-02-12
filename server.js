// Mengimpor modul yang diperlukan
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

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
const pengguna = {};

// Menangani event 'connection' ketika pengguna terhubung ke server
io.on("connection", (socket) => {
    console.log("Pengguna terhubung:", socket.id);

    // Menangani event 'join' ketika pengguna masuk dengan nama pengguna
    socket.on("join", (namaPengguna) => {
        if (namaPengguna) {
            pengguna[socket.id] = namaPengguna;
            io.emit("daftarPengguna", Object.values(pengguna));
            io.emit("pesanObrolan", { pengguna: "Server", pesan: `${namaPengguna} bergabung dalam obrolan` });
        }
    });

    // Menangani event 'pesanObrolan' untuk mengirim pesan dari pengguna
    socket.on("pesanObrolan", (data) => {
        if (pengguna[socket.id] && data) {
            io.emit("pesanObrolan", { pengguna: pengguna[socket.id], pesan: data });
        }
    });

    // Menangani event 'disconnect' ketika pengguna terputus
    socket.on("disconnect", () => {
        if (pengguna[socket.id]) {
            io.emit("pesanObrolan", { pengguna: "Server", pesan: `${pengguna[socket.id]} meninggalkan obrolan` });
            delete pengguna[socket.id];
            io.emit("daftarPengguna", Object.values(pengguna));
        }
        console.log("Pengguna terputus:", socket.id);
    });
});

// Menjalankan server pada port 3000
server.listen(3000, () => {
    console.log("Server Socket.io berjalan di port 3000");
});
