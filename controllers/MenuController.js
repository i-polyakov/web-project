const LocalStrategy = require("passport-local").Strategy;
//const  db  = require("../db");
const passport = require('passport');
const bcrypt = require("bcrypt");
const flash = require("express-flash");


class MenuController {

  async mainPage(req, res) {    

   
   res.render(__dirname + "/../src/ejs/index.ejs",{ user: req.user });
  }

  async watchPage(req, res) {
   

   res.render(__dirname + "/../src/ejs/watch.ejs",{ user: req.user });
  }

  async viewedPage(req, res) {
    res.render(__dirname + "/../src/ejs/viewed.ejs",{ user: req.user });
  }

   async aboutPage(req, res) {
    res.render(__dirname + "/../src/ejs/about.ejs",{ user: req.user });
  }
 async searchPage(req, res) {
 res.json({user: req.user, search: req.query.search});
  // res.render(__dirname + "/../src/ejs/search.ejs",{ user: req.user, search: req.query.search });

}
}



module.exports = new MenuController();
