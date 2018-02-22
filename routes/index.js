var express         = require("express");
var router          = express.Router({mergeParams: true});

var passport        = require("passport");
var user            = require("../models/user");

//main route
router.get("/", function(req, res) {
    res.redirect("/bets");
});

//==================auth routes

router.get("/register", function(req, res) {
    res.render("register");
});

//handling registers
router.post("/register", function(req, res) {

    var userName = req.body.username;
    var userEMail = req.body.email;
    var password = req.body.password;

    var newUser = new user({
        username: userName,
        email: userEMail
    });

    user.register(newUser, password, function(err, user) {
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/bets");
        });
    });
});

//login route
router.get("/login", function(req,res) {
    res.render("login");
});

//handling logins
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/bets",
        failureRedirect: "/login"
    }), function(req, res){
});

//handling logut
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/bets");
});

module.exports = router;