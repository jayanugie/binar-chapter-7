const { User, User_History, Room } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');

exports.playGame = async (req,res) => {
    try {
        const room_name = req.body.room_name;
        const playerChoice = req.body.playerChoice;
        
        if (!playerChoice){
            res.status(400).json({
                message: "No Choice Inputed",
                status: "Error"
            });
        }
        if (!Array.isArray(playerChoice)) {
            res.status(400).json({
                message: "Input Data is Not Array",
                status: "Error"
            });
        }
        if (playerChoice.length != 3) {
            res.status(400).json({
                message: "Inputed Data Must be 3 Choice",
                status: "Error"
            });
        }
        if (!room_name) {
            res.status(400).json({
                message: "No Room Inputed",
                status: "Error"
            });
        }

        const foundRoom = await Room.findOne({
            where:{
                room_name: room_name
            }
        });

        if (!foundRoom) {
            res.status(400).json({
                message: "No Room Founded",
                status: "Error"
            });
        } else {
            if (!foundRoom.player_1_uuid) {
                await foundRoom.update({
                    player_1_choices: req.body.playerChoice,
                    player_1_uuid: req.user.user_id
                });
            } else if (!foundRoom.player_2_uuid) {
                await foundRoom.update({
                    player_2_choices: req.body.playerChoice,
                    player_2_uuid: req.user.user_id
                });
            } else {
                res.status(400).json({
                    message: "Room Full",
                    status: "Error"
                });
            }
        }
        
        if (foundRoom.player_1_choices && foundRoom.player_2_choices) {
            const user1History = await User_History.findOne({
                where:{
                    user_uuid: foundRoom.player_1_uuid
                }
            });
            const user2History = await User_History.findOne({
                where:{
                    user_uuid: foundRoom.player_2_uuid
                }
            });
            
            let player1Score = 0
            let player2Score = 0
            
            for (const index in foundRoom.player_1_choices) {
                const player1Choice = foundRoom.player_1_choices[index];
                const player2Choice = foundRoom.player_2_choices[index];
                const playersChoice = `${player1Choice}${player2Choice}`;
                
                switch (playersChoice) {
                    case "ROCKROCK":
                        player1Score += 1
                        player2Score += 1
                        break;
                    case "ROCKPAPER":
                        player2Score += 1
                        break;
                    case "ROCKSCISSOR":
                        player1Score += 1
                        break;
                    case "PAPERROCK":
                        player1Score += 1
                        break;
                    case "PAPERPAPER":
                        player1Score += 1
                        player2Score += 1
                        break;
                    case "PAPERSCISSOR":
                        player2Score += 1
                        break;
                    case "SCISSORROCK":
                        player2Score += 1
                        break;
                    case "SCISSORPAPER":
                        player1Score += 1
                        break;
                    case "SCISSORSCISSOR":
                        player1Score += 1
                        player2Score += 1
                        break;
                    default:
                        break;
                    }
                }
                
                if (player1Score > player2Score) {
                    await user1History.update({
                        win: Number(user1History.win) + 1
                    })
                    await user2History.update({
                        lose: Number(user2History.lose) + 1
                    })
                    await foundRoom.update({
                        winner_uuid : foundRoom.player_1_uuid,
                        loser_uuid: foundRoom.player_2_uuid,
                        draw: false
                    })
                    return res.status(200).json({
                        message: "PLAYER 1 WIN"
                    });
                } else if (player1Score < player2Score) {
                    await user1History.update({
                        lose: Number(user2History.lose) + 1
                    });
                    await user2History.update({
                        win: Number(user1History.win) + 1
                    });
                    await foundRoom.update({
                        winner_uuid : foundRoom.player_2_uuid,
                        loser_uuid: foundRoom.player_1_uuid,
                        draw: false
                    });
                    return res.status(200).json({
                        message: "PLAYER 2 WIN"
                    });
                } else {
                    await user1History.update({
                        draw: Number(user2History.draw) + 1
                    });
                    await user2History.update({
                        draw: Number(user1History.draw) + 1
                    });
                    await foundRoom.update({
                        draw: true
                    });
                    return res.status(200).json({
                        message: "DRAW"
                    });
                }
            }
        } catch (error) {
            console.log('================PLAYGAME===============');
            console.log(error);
            console.log('================PLAYGAME===============');
            return res.status(400).json({
                message: error.message,
                status: "Error"
            })
        }
    }