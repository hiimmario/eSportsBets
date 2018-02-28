var express                     = require("express");
var app = express();

var mongoose                    = require("mongoose");
var bodyParser                  = require("body-parser");
var passport                    = require("passport");
var localStrategy               = require("passport-local");
var flash                       = require("connect-flash");
var methodOverride              = require("method-override");

var user                        = require("./models/user");
var comment                     = require("./models/comment");

var indexRoutes                 = require("./routes/index");
var betsRoutes                  = require("./routes/bets");
var matchesRoutes               = require("./routes/matches");
var commentsRoutes              = require("./routes/comments");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/eSportsBets");

//passport configuration
app.use(require("express-session")({
    secret: "eSportsBet2018",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(flash());
//middleware function - all routes receive req.user
app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/bets/:id/comments", commentsRoutes);
app.use("/bets", betsRoutes);
app.use("/matches", matchesRoutes);


//server listens to port 3000
app.listen(3000, function() {
    console.log("server started");
});