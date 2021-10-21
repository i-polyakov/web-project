const express = require("express");

const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const AuthenticateRouter=  require("./routes/AuthenticateRouter");
const MenuRouter=  require("./routes/MenuRouter");
const FilmsRouter=  require("./routes/FilmsRouter");
const UsersRouter=  require("./routes/UsersRouter");

const http_logs = require("./db/mongo/http_logs");
require("dotenv").config();
  
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cookieParser('secret'));


app.use(flash());
app.use( session({
   cookie: { maxAge: 24*360000 },
    // Key we want to keep secret which will encrypt all of our information
    secret: "secret",
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
  })
);


app.use(express.static(__dirname ));


app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.message = req.flash();

    next();
});



app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json())
.set("view engine", "ejs");

app.use(http_logs);
app.use('/',AuthenticateRouter);
app.use('/',MenuRouter);
app.use('/',FilmsRouter);
app.use('/',UsersRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports =app;
