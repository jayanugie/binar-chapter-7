# Challenge Chapter 7


### Kolaborator

* Nugie Jaya Nugraha
* Naufal Faruq
* Wiridho P.
* M. S. Podungge


### Menerapkan

* Menggunakan Asynchronous pada setiap function.
* Model Controller Router.
* Authentication dan Authorization menggunakan JWT.
* Dapat bermain game `Rock Paper Scissor` di satu endpoint room secara multiplayer.
* Dapat melihat hasil pada history.


### Cara Install

1. Clone repository ini via terminal

```
git clone https://github.com/jayanugie/challenge-chapter-7.git
```

2. Buka folder tersebut di VSC, lalu buka terminal dan install modul

```
npm install
```

3. Isi 'password' pada 'development' sesuai database local anda di config.json 

```
"password": "....."
```

4. Buat database

```
sequelize db:create
```

5. Migrasikan tabel 

```
sequelize db:migrate
```

7. Jalankan program

```
npm run devStart
```


### Mengakses API di Postman
* `/register` dengan metode POST, pengguna harus mengisi "name", "email", "role", "password" pada Body.
* `/login` dengan metode POST, pengguna harus mengisi "email", dan "password" pada Body dan akan mendapatkan token.
* `/room/create` dengan metode POST, pengguna harus mengisi "roomName" dan harus memasukkan salah satu token user.
* `/room/play` dengan metode POST, pengguna harus mengisi "room_name" dan "playerChoice" (tiga pilihan array) serta mengisi token sesuai player yang akan bermain. Response pemenang akan muncul jika player kedua telah mengisi pilihan.
* `/histories` dengan metode GET, pengguna akan melihat history setiap player yang bermain, untuk melihatnya pengguna harus mengisi token.