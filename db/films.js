const sequelize = require("./index.js");
const Sequelize = require("sequelize");
const Film = sequelize.define("films", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  year: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  director: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  country: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  poster: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
  
});

module.exports= Film;
