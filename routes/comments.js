var express     = require("express");
var router      = express.Router({mergeParams: true});

var comment     = require("../models/comment");
var bet         = require("../models/bet");

var middleware = require("../middleware");

// comments create post
router.post("/new", middleware.isLoggedIn, function(req, res) {
    bet.findById(req.params.id, function(err, foundBet) {
        if(err) {
            consolole.log(err);
        }
        else {
            comment.create(req.body.comment, function(err, comment) {
                if(err){
                    console.log(err);
                }
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundBet.comments.push(comment._id);
                    foundBet.save();
                    res.redirect("/bets/" + foundBet._id);
                }
            });
        }
    });
});

module.exports = router;