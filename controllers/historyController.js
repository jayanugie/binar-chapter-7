const { User, User_History, Room } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');

exports.showHistories = (req, res) => {
    User_History.findAll()
    .then(histories => {
        res.json(histories)
    });
}