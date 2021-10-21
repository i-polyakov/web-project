
const User=require("./users.js");
const Film=require("./films.js");
const sequelize = require("./index.js");
const Sequelize = require("sequelize");
const Users_films = sequelize.define('users_films', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    //unique: 'uniqueTag',
    allowNull: false
  },
  film_id: {
    type: Sequelize.INTEGER,
    //unique: 'uniqueTag',
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: { len: [0,10]},
     defaultValue:0   
  }
  
}

);

User.belongsToMany(Film, { through: Users_films, foreignKey:'user_id' });
Film.belongsToMany(User, { through: Users_films, foreignKey:'film_id' });

sequelize.sync()
.catch(err=> console.log("users_filmserr:"+err));

module.exports= Users_films;

