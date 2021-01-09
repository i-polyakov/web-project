const LocalStrategy = require("passport-local").Strategy;
const  db  = require("../db");
const passport = require('passport');
const bcrypt = require("bcrypt");
const flash = require("express-flash");


class FilmsController {

  async getFilmsByName(req, res) {  
    let name=req.body.search;
   // console.log(name);
     db.query(
        `SELECT * FROM films
         WHERE name  LIKE $1`, ['%'+name+'%'], (err, results) => {
          if (err) 
           console.log(err);
            res.json( results.rows);
        
     });

  }

  async getOrderFilms(req, res) {
   
   db.query(
        `SELECT * FROM films
         ORDER BY  year DESC LIMIT 20`, (err, results) => {
          if (err) {
           throw err;
          }
     // console.log(results.rows);
     res.json( results.rows);


    });
}

  async watchFilm(req, res) {

      let film_id=req.body.film_id;
      let user_id=req.user.id;
   db.query(
        `DELETE FROM users_films
         WHERE user_id = $1 AND film_id=$2  RETURNING *`, [user_id,film_id], (err, results) => {
          if (err) 
           throw err;
          
          if (results.rows.length > 0) 
            res.json(false );
          else{
     db.query(

       `INSERT INTO users_films (user_id, film_id,status)
                  VALUES ($1, $2,$3)
                  RETURNING *`,
       [ user_id, film_id,false], (err, results) => {
          if (err) 
           console.log(err);

            res.json( true);
          
            }
            );
          }
        }
      );
  }


async changeStatusFilm(req, res) {

      let film_id=req.body.film_id;
      let user_id=req.user.id;
      let filmStatus=req.body.filmStatus;
      //console.log("film_id: "+film_id);
      db.query(
        `SElECT * FROM users_films
         WHERE user_id = $1 AND film_id=$2`, [user_id,film_id], (err, results) => {
          if (err) 
           throw err;
          //console.log(results.rows.length > 0&&filmStatus!=results.rows[0].status);
          if (results.rows.length > 0&&filmStatus!=results.rows[0].status) {
                 db.query(
                 `UPDATE users_films SET status = $3 WHERE user_id = $1 AND film_id=$2
                            RETURNING *`,
                  [user_id,film_id,filmStatus], (err, results) => {
                    if (err) 
                     console.log(err);

                     //console.log("1:"+results.rows[0].status);
                       res.json({status: results.rows[0].status });
                    
                      });
                   
          }
          else if(results.rows.length > 0){

                 db.query(
            `DELETE FROM users_films
             WHERE user_id = $1 AND film_id=$2  RETURNING *`, [user_id,film_id], (err, results) => {
              if (err) 
               throw err;
              // console.log("2:"+results.rows[0].status);
             res.json({status: results.rows[0].status });
            
              });
           }
          else{
         db.query(

           `INSERT INTO users_films (user_id, film_id,status)
                      VALUES ($1, $2,$3)
                      RETURNING *`,
           [ user_id, film_id,filmStatus], (err, results) => {
              if (err) 
               console.log(err);
              //console.log("3:"+results.rows[0].status);
                res.json({status: results.rows[0].status });
              
                }
                );
          }
        }
      );
  }
   async watchFilms(req, res) {

      let user_id=req.user.id;
      db.query(
        `SELECT films.* FROM users_films, films
         WHERE  user_id = $1  AND users_films.film_id=films.id  AND status=false`,[user_id] ,(err, results) => {
          if (err) {
           throw err;
          }
      //console.log(results.rows);
     res.json( results.rows);


    });

}
   async getViewedFilms(req, res) {
  
    let user_id=req.user.id;
      db.query(
        `SELECT films.* FROM users_films, films
         WHERE  user_id = $1 AND users_films.film_id=films.id AND status=true`,[user_id],  (err, results) => {
          if (err) {
           throw err;
          }
      //console.log(results.rows);
     res.json( results.rows);


    });

}
  async upRating(req, res) {

    let film_id=req.body.film_id;
    let user_id=req.user.id;
    // console.log("user_id "+user_id+" film_id "+film_id);
    db.query(
       `UPDATE users_films SET rating = rating + 1 WHERE user_id = $1 AND film_id = $2 AND status=true
                          RETURNING *`
                      , [user_id,film_id]    , (err, results) => {
        if (err) {

             db.query(
            `SELECT users_films.* FROM users_films, films
             WHERE users_films.film_id=films.id AND status=true`, (err, results) => {
                if (err) {
                 throw err;
                }
                   //console.log(results.rows[0]);
                 res.json({ rating: results.rows[0].rating});
              });
            
        }
        else
        //console.log("qweqwe"+results.rows[0]);
        
        res.json({ rating: results.rows[0].rating});

  });

}

  async downRating(req, res) {

  
    let film_id=req.body.film_id;
    let user_id=req.user.id;
    db.query(
       `UPDATE users_films SET rating = rating - 1 WHERE user_id = $1 AND film_id=$2 AND status=true
                          RETURNING *`
                   , [user_id,film_id]        , (err, results) => {
        if (err) {

             db.query(
            `SELECT users_films.* FROM users_films, films
             WHERE users_films.film_id=films.id AND status=true`, (err, results) => {
                if (err) {
                 throw err;
                }

                 res.json({ rating: results.rows[0].rating});
              });
            
        }
        else
        //console.log(results.rows);
        
        res.json({ rating: results.rows[0].rating});

  });
}
async filmStatistics(req, res) {

   let film_id=req.body.film_id;
   let user_id=req.user.id;
       //console.log("film_id: "+film_id+" ser_id " +req.user.id);
    let  buff;
    let temp;
     db.query(
                  `SELECT *  FROM users_films
                   WHERE film_id=$1 AND user_id=$2 AND status=true`, [film_id, user_id],(err, results) => {
                      if (!results.rows.length>0) {
                        temp={ rating: 0};
                      }
                      else{
                        
                    
                       temp={ rating: results.rows[0].rating };
                      }
               
                      
       db.query(
                  `SELECT * FROM users_films
                   WHERE users_films.film_id=$1`, [film_id],(err, results) => {
                      if (err) {
                        res.json({ avg:null, viewed:0,watch:0});
                      }
                      else{
                           db.query(
                          `SELECT AVG(rating) AS avg, COUNT(user_id) AS viewed FROM users_films
                           WHERE users_films.film_id=$1 AND status=true`, [film_id],(err, results) => {
                              if (err) {
                                
                              }
                                    buff={avg: results.rows[0].avg, viewed: results.rows[0].viewed };

                                     db.query(
                          `SELECT  COUNT(user_id) AS watch FROM users_films
                           WHERE users_films.film_id=$1  AND status=false`, [film_id], (err, results) => {
                              if (err) {
                               throw err;
                              }
                                    // console.log(JSON.parse((JSON.stringify(temp)+JSON.stringify(buff) + JSON.stringify({watch: results.rows[0].watch })).replace(/}{/g,",")));
                                    res.json(JSON.parse((JSON.stringify(temp)+JSON.stringify(buff) + JSON.stringify({watch: results.rows[0].watch })).replace(/}{/g,",")));
                              
                            });
                               
                          });
                      }
                 });
             });
      


}
async checkStatusFilm(req, res) {

    let film_id=req.body.film_id;
    let user_id=req.user.id;
 //console.log(film_id+": "+user_id);
    db.query(
     `SELECT * FROM users_films
       WHERE user_id = $1 AND film_id=$2`, [user_id,film_id], (err, results) => {
        if (err) {
         throw err;
        }
       // console.log(results.rows[0].id+": "+results.rows[0].status);
         if (results.rows.length > 0) 

          res.json({status: results.rows[0].status });
        else
           res.json({ status: null});

  });

}



async unviewedFilm(req, res) {

    let film_id=req.body.film_id;
    let user_id=req.user.id;

     db.query(
          `DELETE FROM users_films
           WHERE user_id = $1 AND film_id=$2  RETURNING *`, [user_id,film_id], (err, results) => {
            if (err) 
             throw err;
           res.json( results.rows[0]);
          
            });
}

async getFilm(req, res) {

    let film_id=req.body.film_id;
    let user_id=req.user.id;
     db.query(
          `SEELCT FROM films
           WHERE film_id=$1 `, [film_id], (err, results) => {
            if (err) 
             throw err;
           res.json( results.rows[0]);
          
            });
}

async filmPage(req, res) {
   

    let film_id=req.params.id;
    let user_id=req.user.id;
    // console.log(film_id+": "+user_id);
    let film;
    let  buff;
    let temp;
    let stat;
    db.query(
          `SELECT * FROM films
           WHERE  id=$1 `, [film_id], (err, results) => {
            if (err) 
             throw err;

           film=results.rows[0];
          
           
    //console.log(film);

       //console.log("film_id: "+film_id+" ser_id " +req.user.id);
   
     db.query(
                  `SELECT *  FROM users_films
                   WHERE film_id=$1 AND user_id=$2 AND status=true`, [film_id, user_id],(err, results) => {
                      if (!results.rows.length>0) {
                        temp={ rating: 0};
                      }
                      else{
                        
                    
                       temp={ rating: results.rows[0].rating };
                      }
               
                      
       db.query(
                  `SELECT * FROM users_films
                   WHERE users_films.film_id=$1`, [film_id],(err, results) => {
                      if (err) {
                         stat={ avg:null, viewed:0,watch:0};
                      }
                      else{
                           db.query(
                          `SELECT AVG(rating) AS avg, COUNT(user_id) AS viewed FROM users_films
                           WHERE users_films.film_id=$1 AND status=true`, [film_id],(err, results) => {
                              if (err) {
                                
                              }
                                    buff={avg: results.rows[0].avg, viewed: results.rows[0].viewed };

                                     db.query(
                          `SELECT  COUNT(user_id) AS watch FROM users_films
                           WHERE users_films.film_id=$1  AND status=false`, [film_id], (err, results) => {
                              if (err) {
                               throw err;
                              }
                                    
                                    stat=JSON.parse((JSON.stringify(temp)+JSON.stringify(buff) + JSON.stringify({watch: results.rows[0].watch })).replace(/}{/g,","));
                               
                          
                          
                                 res.render(__dirname + "/../src/ejs/film.ejs",{ user: req.user, film: film, stat: stat });
                                         });   
                              });
                         }
                 });
           });
      });
    }


}


module.exports = new FilmsController();
