const { User, User_History, Room } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');

exports.register = async (req,res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            email: email,
            role: role,
            password: hashedPassword
            
        });

        await User_History.create({
            user_uuid: newUser.uuid
        });

        res.json({
            message: "User Created SuccessFully"
        });

    } catch (error) {
        console.log('=============REGISTER==================');
        console.log(error);
        console.log('=============REGISTER==================');
        res.status(500).json({
            message: error.message,
            status: "Error"
         });
    }
}
