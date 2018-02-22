var express = require("express");
var router = express.Router({mergeParams: true});
var Client = require('node-rest-client').Client;
var client = new Client();

//===================bets routes
//index route
router.get("/", function(req, res) {
    client.get("https://api.pandascore.co/matches/upcoming.json?token=xFEMHt5iIXzTaDydesV2fk01-L-YKp7OFLcZcWZJ4tav2Og-7jA", function (data, response) {

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

        var date = new Date();

        for (var i = 0; i < data.length; i++) {
            date = new Date(data[i].begin_at);
            data[i].begin_at = date.toLocaleDateString('en-US', options);
        }

        res.render("matches/index", {matches: data});
    });
});

module.exports = router;