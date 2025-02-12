<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obrolan Multi-Pengguna</title>
    <!-- Memuat pustaka socket.io dari CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.4/socket.io.js"></script>
    <style>
        /* Gaya untuk elemen body, menggunakan font Arial dan mengatur teks agar rata tengah */
        body { font-family: Arial, sans-serif; text-align: center; margin: 0; }
        /* Gaya untuk elemen obrolan, mengatur lebar maksimum, margin, padding, dan border */
        #chat { max-width: 500px; margin: 20px auto; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
        /* Gaya untuk daftar pesan, menghilangkan bullet list dan mengatur tinggi maksimum dengan scroll otomatis */
        #messages { list-style: none; padding: 0; max-height: 300px; overflow-y: auto; }
        /* Gaya untuk setiap item pesan, mengatur padding, margin, dan background */
        #messages li { padding: 5px; margin-bottom: 5px; border-radius: 5px; background: #f1f1f1; }
        /* Gaya untuk daftar pengguna, menghilangkan bullet list */
        #userList { list-style: none; padding: 0; }
        /* Gaya untuk input dan tombol, mengatur lebar, padding, dan margin */
        input { width: 80%; padding: 10px; margin: 5px; }
        button { padding: 10px; }
    </style>
</head>
<body>
    <h2>Obrolan Multi-Pengguna</h2>
    <div id="chat">
        <!-- Daftar pesan akan ditampilkan di sini -->
        <ul id="messages"></ul>
        <!-- Input untuk mengetik pesan -->
        <input id="messageInput" placeholder="Ketik pesan..." autocomplete="off">
        <!-- Tombol untuk mengirim pesan -->
        <button onclick="kirimPesan()">Kirim</button>
    </div>

    <h3>Pengguna Online</h3>
    <!-- Daftar pengguna online akan ditampilkan di sini -->
    <ul id="userList"></ul>

    <script>
        // Menghubungkan ke server socket.io yang berjalan di localhost pada port 3000
        const socket = io("http://localhost:3000");
        // Meminta pengguna memasukkan nama pengguna melalui prompt
        let username = prompt("Masukkan nama pengguna Anda:");

        // Mengirimkan event 'join' ke server dengan nama pengguna yang dimasukkan
        socket.emit("join", username);

        // Fungsi untuk mengirim pesan ke server
        function kirimPesan() {
            const input = document.getElementById("messageInput");
            const message = input.value.trim(); // Menghapus spasi di awal dan akhir pesan
            if (message) {
                // Jika pesan tidak kosong, kirimkan pesan ke server
                socket.emit("chatMessage", message);
                input.value = ""; // Kosongkan input setelah pesan dikirim
            }
        }

        // Mendengarkan event 'chatMessage' dari server
        socket.on("chatMessage", (data) => {
            const li = document.createElement("li");
            // Menampilkan pesan dengan format "nama pengguna: pesan"
            li.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
            document.getElementById("messages").appendChild(li); // Menambahkan pesan ke daftar pesan
        });

        // Mendengarkan event 'userList' dari server
        socket.on("userList", (users) => {
            const userList = document.getElementById("userList");
            userList.innerHTML = ""; // Mengosongkan daftar pengguna sebelum memperbarui
            users.forEach(user => {
                const li = document.createElement("li");
                li.textContent = user; // Menambahkan nama pengguna ke daftar
                userList.appendChild(li);
            });
        });
    </script>
</body>
</html>
