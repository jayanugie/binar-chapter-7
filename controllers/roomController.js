const { User, User_History, Room } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');

exports.createRoom = async (req,res) => {
    try {
        const roomName = req.body.roomName;
        const user = req.user;

        console.log(roomName);

        if (!roomName){
            res.status(400).json({
                message: "Please Fill Room Name",
                status: "Error"
            });
        }

        const newRoom = await Room.create({
            room_name: roomName,
            owned_by: user.user_id
        });

        res.status(201).json({
            status: "SUCCESS",
            message: "New Room Created",
            room_name: newRoom.room_name
        });
    } catch (error) {
        console.log('=============CREATEROOM==================');
        console.log(error);
        console.log('=============CREATEROOM==================');
        res.status(500).json({
            message: error.message,
            status: "Error"
        });
    }
}