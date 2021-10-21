 const Sequelize = require("sequelize");
 module.exports = new Sequelize("filmsfinder_db", "postgres", "root", {
  dialect: "postgres",
  host: "localhost",
  define: {
    timestamps: false
  },
  // disable logging; default: console.log
  logging: false
});


