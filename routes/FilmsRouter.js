const Router=require("express");
const router = new Router();
const FilmsController = require("../controllers/FilmsController");


router.get("/films", checkNotAuthenticated, FilmsController.getOrderFilms);
router.post("/film", checkNotAuthenticated, FilmsController.getFilmsByName);


router.post("/unviewedFilm", checkNotAuthenticated, FilmsController.unviewedFilm);


router.post("/checkStatusFilm", checkNotAuthenticated, FilmsController.checkStatusFilm);
router.post("/changeStatusFilm", checkNotAuthenticated, FilmsController.changeStatusFilm);

router.post("/filmStatistics", checkNotAuthenticated, FilmsController.filmStatistics);

router.post("/upRating", checkNotAuthenticated, FilmsController.upRating);
router.post("/downRating", checkNotAuthenticated, FilmsController.downRating);


router.get("/filmPage/:id", checkNotAuthenticated, FilmsController.filmPage);


router.post("/watchFilm", checkNotAuthenticated, FilmsController.watchFilm);
router.get("/watchFilms", checkNotAuthenticated, FilmsController.watchFilms);
router.get("/getViewedFilms", checkNotAuthenticated, FilmsController.getViewedFilms);


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) 
    return next();
  
  res.redirect("/login");
}




module.exports = router;