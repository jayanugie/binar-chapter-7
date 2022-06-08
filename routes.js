// import router
const router = require('express').Router();

// baca data user statis
const users = require('./db/users.json');

// import models
const { user_game, user_game_biodata } = require('./models');

// rute halaman utama
router.get('/', (req, res) => {
  res.render('main/index');
});

// rute halaman game
router.get('/game', (req, res) => {
  return res.render('main/game');
});

// rute halaman login
router.get('/login', (req, res) => {
  const errorType = req.query.error;
  let errorMessage = '';

  if (errorType === 'email') {
    errorMessage = 'Not registered';
  }

  if (errorType === 'password') {
    errorMessage = 'Incorrect password';
  }

  return res.render('main/login', { message: errorMessage });
});

// rute halaman dashboard (lihat semua data)
router.get('/dashboard/index', (req, res) => {
  user_game.findAll().then((data) => {
    res.render('dashboard/index', { users: data })
  })
});

// rute halaman dashboard (tambah data)
router.get('/dashboard/create', (req, res) => {
  res.render('dashboard/create');
});

// rute halaman dashboard (update data)
router.get('/dashboard/update/:id', (req, res) => {
  // untuk mengambil 1 data yang menggunakan Primary Key, bisa menggunakan "findByPk"
  // kalau data yang digunakan bukan Primary Key, gunakan "findOne"
  user_game.findByPk(req.params.id, {
    include: {
      model: user_game_biodata, // mengambil data biodata, hanya bisa jika tabel sudah punya relasi, Primary Key di user_game === Foreign Key di user_game_biodata 
    }
  }).then((data) => {
    res.render('dashboard/update', { user: data });
  });
});

// rute halaman dashboard (lihat 1 data)
router.get('/dashboard/detail/:id', (req, res) => {
  // untuk mengambil 1 data yang menggunakan Primary Key, bisa menggunakan "findByPk"
  // kalau data yang digunakan bukan Primary Key, gunakan "findOne"
  user_game.findByPk(req.params.id, {
    include: {
      model: user_game_biodata, // mengambil data biodata, hanya bisa jika tabel sudah punya relasi, Primary Key di user_game === Foreign Key di user_game_biodata 
    }
  }).then((data) => {
    console.log(data);
    res.render('dashboard/detail', { user: data });
  });
});

// api login
router.post('/login', (req, res) => {
  // baca email & password dari request body
  const email = req.body.email;
  const password = req.body.password;

  // siapkan variabel untuk menampung data user
  let userFound;

  // lakukan perulangan
  for (let index = 0; index < users.length; index++) {
    // jika email user pada index sekian sama dengan email dari request body
    if (users[index].email === email) {
      // masukkan data user tersebut ke variable userFound
      userFound = users[index];
    } 
  }

  if (!userFound) {
    return res.redirect('/login?error=email');
  }

  if (userFound.password != password) {
    return res.redirect('/login?error=password');
  }

  res.redirect('/dashboard/index');
});

// api tambah data
router.post('/users/create', (req, res) => {
  user_game.create({
    email: req.body.email,
    password: req.body.password,

    // menyatakan table yg ikut dioperasikan, tapi menggunakan bentuk singular bukan plural (biodatum bukan biodata)
    // hadeh, sequelize ribet bet sih
    user_game_biodatum: {
      name: req.body.name,
    }
  }, {
    // menjelaskan nama model & tabel yang ikut dioperasikan
    include: {
      model: user_game_biodata,
    }
  }).then(() => {
    res.redirect('/dashboard/index');
  });
});

// api update data
router.post('/users/update/:id', (req, res) => {
  // Tidak memungkinkan menggunakan include dalam proses update, alternatifnya gunakan operasi tabel berurutan

  // Update user game dulu
  user_game.update({
    email: req.body.email,
    password: req.body.password,
  }, {
    where: { id: req.params.id },
  }).then(() => {
    // Kemudian update user game biodata
    user_game_biodata.update({
      name: req.body.name,
    }, {
      where: { id_user: req.params.id },
    });
  }).then(() => {
    res.redirect('/dashboard/index');
  });
});

// api hapus data
router.get('/users/delete/:id', (req, res) => {
  // Tidak memungkinkan menggunakan include dalam proses delete, alternatifnya gunakan operasi tabel berurutan, namun terbalik dari update
  // Karena data yang dijadikan referensi harus dihapus terakhir

  // delete user game biodata dulu
  user_game_biodata.destroy({
    where: { id_user: req.params.id },
  }).then(() => {
    // Kemudian delete user game
    user_game.destroy({
      where: { id: req.params.id },
    });
  }).then(() => {
    res.redirect('/dashboard/index');
  });
});

module.exports = router;