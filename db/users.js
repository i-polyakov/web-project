const sequelize = require("./index.js");
const Sequelize = require("sequelize");
const Role=require("./roles.js");
const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  login: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
   password: {
    type: Sequelize.STRING(100),
    allowNull: false   
  },
   role_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue:0   
  }
  
});

Role.hasMany(User,{ foreignKey: 'role_id' });

module.exports= User;