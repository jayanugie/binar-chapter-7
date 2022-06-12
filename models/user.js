'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Room, {
        foreignKey: 'owned_by',
        as: 'room'
      })

      User.hasMany(models.Room, {
        foreignKey: 'player_1_uuid',
        as: 'room_player_1_uuid'
      })

      User.hasMany(models.Room, {
        foreignKey: 'player_2_uuid',
        as: 'room_player_2_uuid'
      })

      User.hasMany(models.Room, {
        foreignKey: 'winner_uuid',
        as: 'winner_room'
      })

      User.hasMany(models.Room, {
        foreignKey: 'loser_uuid',
        as: 'loser_room'
      })

      User.hasOne(models.User_History, {
        foreignKey: 'user_uuid',
        as: 'history'
      })
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false},
    role: {
      type: DataTypes.ENUM('SuperAdmin', 'PlayerUser'),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
      msg: "Email Has Been Used"
    }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  });
  //hooks
  User.beforeCreate((user)=>{
    user.email = user.email.toLowerCase()
  })
  User.beforeUpdate((user)=>{
    user.email = user.email.toLowerCase()
  })
  return User;
};