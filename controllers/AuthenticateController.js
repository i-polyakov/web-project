const LocalStrategy = require("passport-local").Strategy;
const  db  = require("../db");
const passport = require('passport');
const bcrypt = require("bcrypt");
const flash = require("express-flash");

const options = {
        // by default, local strategy uses username
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    };



passport.serializeUser((user, done) => done(null, user.id));

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user

  passport.deserializeUser((id, done) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
      if (err) 
         сonsole.error(err);
      
      //console.log("id: "+results.rows[0].id);
      return done(null, results.rows[0]);
    });
  });

passport.use('login',new LocalStrategy(options, (req,username, password, done) => {
  // check to see if the username exists
     db.query(
      `SELECT * FROM users WHERE login = $1`,
      [username],
      (err, results) => {
          
        if (err) 
          console.error(err);
        
        //console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, result) => {
            if (err) 
              console.error(err);

            if (result) 
              return done(null, user);     
            else  //password is incorrect                
             return done(null, false, req.flash( 'error_messages', "Неправильный пароль!"));
            
          });
        } else  // No user
         
          return done(null, false,  req.flash( 'error_messages', "Пользователь не существует!"));
        
      }
    );
}));


passport.use('register',new LocalStrategy(options, (req,username, password, done) => {
  let password_confirm=req.body.password_confirm;
  

  if (!username  || !password || !password_confirm) 
    return done(null, false, req.flash( 'error_messages', 'Заполните все поля!') );
  

  if (password.length < 5) 
    return done(null, false, req.flash( 'error_messages', 'Пароль слишком короткий! (не менее 5 символов)') );

  

  if (password !== password_confirm) 
    return done(null, false, req.flash( 'error_messages', 'Пароли не совпадают!' ));
     
  

  hashPassword(password).then( (hashedPassword) => {
 
    //console.log(hashedPassword);
    // Validation passed
    db.query(
      `SELECT * FROM users
       WHERE login = $1`, [username], (err, results) => {
        if (err) 
         throw err;
        
       
        if (results.rows.length > 0) 
          return done(null, false,  req.flash( 'error_messages', 'Логин занят!!' ));
        
        else {
          db.query(
            `INSERT INTO users (login, password)
                VALUES ($1, $2)
                RETURNING *`,
            [ username, hashedPassword],
            (err, results) => {
              if (err) 
                throw err;
              
              //console.log(results.rows[0]);

             return done(null, results.rows[0]);
            }
          );
        }
      }
    );
  })
.catch( (err) => {
  console.log(err);
});

}));




async function hashPassword (password) {


  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) reject(err)
        resolve(hash);
    });
  })

  return hashedPassword;
}



module.exports = passport;


