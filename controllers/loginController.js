const { User, User_History, Room } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if (!email) {
            res.status(400).json({
                message: "Please Fill Your Email",
                status: "Error"
            });
        }

        const user = await User.findOne({
            where: {
                email: email.toLowerCase()
            }
        });

        if (!user) {
            res.status(404).json({
                message: "Email Not Found",
                status: "Error"
             });
        }

        let passwordValidation = bcrypt.compareSync(password, user.password);
        if (!passwordValidation){
            res.status(400).json({
                message: "Incorrect Password",
                status: "Error"
             });
        }

        let token = jwt.sign(
            {
                user_id: user.uuid,
                role: user.role,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 86400
            }
        );

        res.status(200).json({
            user_id: user.uuid,
            message: `You are logged in as ${user.name}`,
            role: user.role,
            token: token
        });

    } catch (error) {
        console.log('=============LOGIN==================');
        console.log(error);
        console.log('=============LOGIN==================');
        res.status(500).json({
            message: error.message,
            status: "Error"
        });
    }
}
