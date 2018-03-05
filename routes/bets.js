var express         = require("express");
var router          = express.Router({mergeParams: true});

var Client          = require('node-rest-client').Client;
var client          = new Client();

var bet             = require("../models/bet");
var middleware      = require("../middleware");

//===================bets routes
//index route
router.get("/", function(req, res) {
    bet.find({}, function(err, bets) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("bets/index", {bets: bets});
        }
    });
});

// show route
router.get("/:id", function(req, res) {
    bet.findById(req.params.id).populate("comments").exec(function(err, foundBet) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(foundBet);
            res.render("bets/show", {match: foundBet});
        }
    });
});

// new route
router.get("/new/:matchid", middleware.isLoggedIn, function(req, res) {
    var matchId = req.params.matchid;
    client.get("https://api.pandascore.co/matches?filter[id]=" + matchId + "&token=xFEMHt5iIXzTaDydesV2fk01-L-YKp7OFLcZcWZJ4tav2Og-7jA", function (data, response) {

        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour:'2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
        };

        var date = new Date(data[0].begin_at);
        data[0].begin_at = date.toLocaleDateString('en-US', options);

        res.render("bets/new", {match: data});

    });
});

// create route
router.post("/", middleware.isLoggedIn, function(req, res) {

    var matchId             = req.body.bet.matchId;
    var betAmount           = req.body.bet.betAmount;
    var videogame           = req.body.bet.videogame;
    var league              = req.body.bet.league;
    var league_imageurl     = req.body.bet.league_imageurl;
    var begin_at            = req.body.bet.begin_at;
    var opponent1_name      = req.body.bet.opponent1_name;
    var opponent1_imageurl  = req.body.bet.opponent1_imageurl;
    var opponent2_name      = req.body.bet.opponent2_name;
    var opponent2_imageurl  = req.body.bet.opponent2_imageurl;

    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newBet = {
        matchId: matchId,
        betAmount: betAmount,
        videogame: videogame,
        league: league,
        league_imageurl: league_imageurl,
        begin_at: begin_at,
        opponent1_name: opponent1_name,
        opponent2_name: opponent2_name,
        opponent1_imageurl: opponent1_imageurl,
        opponent2_imageurl: opponent2_imageurl,
        author: author
    };

    bet.create(newBet, function(err, newBet) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/bets");
        }
    })
});

// delete route
router.delete("/:id", middleware.checkBetOwnership, function(req, res) {
    bet.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            req.flash("success", "Bet deleted!");
            res.redirect("/bets");
        }
    })
});

module.exports = router;