// import express
const express = require('express');
const app = express();

// import router
const router = require('./routes');

// atur port
const port = 3000;

// gunakan middleware
app.use(express.static('public')); // menyajikan folder public secara statis
app.use(express.urlencoded({ extended: false })); // agar bisa baca request body format form

// atur view engine yang digunakan
app.set('view engine', 'ejs');

// terapkan router
app.use('/', router);

// run app in port 3000
app.listen(port, () => {
  console.log('App is running in http://localhost:3000');
});
