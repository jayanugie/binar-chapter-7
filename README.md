# Referensi Challenge Chapter 6

Dibuat dengan ExpressJS , EJS, Sequelize & Postgres

### Dependencies

Library yang digunakan adalah

* `sequelize-cli`: untuk membuat database, migration, dan operasi sejenisnya.
* `sequelize`: untuk ORM sebagai pembantu pengelolaan data database di javascript.
* `pg`: untuk menghubungkan antara project ini dengan database postgres.
* `ejs`: untuk template engine yang digunakan menampilkan halaman web.

### Goal

* Program ini bertujuan untuk melakukan login admin.
* Data yang digunakan untuk login adalah data JSON statis.
* Setelah login, admin akan diarahkan ke dashboard.
* Dalam Dashboard, admin dapat melakukan Create, Read, Update, dan Delete (CRUD) data user.

### Fungsional
* Ketika mengakses route `/` dengan metode GET, pengguna akan dialihkan ke halaman index.
* Ketika mengakses route `/game` dengan metode GET, pengguna akan dialihkan ke halaman game.
* Ketika mengakses route `/login` dengan metode GET, pengguna akan dialihkan ke halaman login.
* Ketika mengakses route `/dashboard/index` dengan metode GET, pengguna akan dialihkan ke halaman dashboard yang menampilkan semua data.
* Ketika mengakses route `/dashboard/create` dengan metode GET, pengguna akan dialihkan ke halaman penambahan data.
* Ketika mengakses route `/dashboard/update/:id` dengan metode GET, pengguna akan dialihkan ke halaman pembaruan data user yang memiliki id tersebut.
* Ketika mengakses route `/dashboard/detail/:id` dengan metode GET, pengguna akan dialihkan ke halaman detail 1 data.
* Ketika mengirim data ke route `/users/create` dengan metode POST, data yang dikirim akan digunakan untuk membuat user baru.
* Ketika mengirim data ke route `/users/udpate/:id` dengan metode POST, data yang dikirim akan digunakan untuk mengupdate data user yang memiliki id tersebut.
* Ketika mengakses route `/users/delete/:id` dengan metode GET, data user yang memiliki id tersebut akan dihapus.

### Foreign Key & Association
Untuk menghubungkan antar tabel, dibutuhkan penggunaan Foreign Key & Association

* Perhatikan pembuatan Foreign Key pada file `migrations` pada bagian `references`.
* Perhatikan penggunaan Associate pada file `models` pada bagian `static associate(models)`.

### Sequelize Include
Untuk mengambil & menulis data ke beberapa tabel yang terhubung, dibutuhkan penggunaan objeck `include`.

* Perhatikan penggunaan `include` pada `index.js` bagian `user_game.findAll`.
* Perhatikan penggunaan `include` pada `index.js` bagian `user_game.findByPk`.
* Perhatikan penggunaan `include` pada `index.js` bagian `user_game.create`.

Untuk memperbarui / menghapus data dari beberapa tabel yang terhubung, tidak bisa menggunakan `include`, jadi proses tersebut dilakukan dengan melakukan operasi beberapa kali secara berurutan (chaining). Urutan berpengaruh besar pada operasi.

* Perhatikan cara memperbarui data pada `index.js` bagian `UserGameBiodata.destroy` dan `UserGame.destroy`.
* Perhatikan cara menghapus data pada `index.js` bagian `UserGame.destroy` dan `UserGameBiodata.destroy`.

### Cara menggunakan

1. Clone repository ini via terminal

```
git clone https://github.com/binar-fullstack-web/referensi-challenge-6
```

2. Setelah selesai, masuk ke dalam direktori repository

```
cd referensi-challenge-6
```

3. Install module yang dibutuhkan

```
npm install
```

4. Edit `config/config.json`

5. Buat database (Pastikan sudah menginstall `sequelize-cli` secara global)

```
sequelize db:create
```

6. Migrasikan tabel (Pastikan sudah menginstall `sequelize-cli` secara global)

```
sequelize db:migrate
```

7. Jalankan program

```
node index.js
```