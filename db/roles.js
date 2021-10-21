const sequelize = require("./index.js");
const Sequelize = require("sequelize");
const Role = sequelize.define("roles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  }
  
});


module.exports= Role;