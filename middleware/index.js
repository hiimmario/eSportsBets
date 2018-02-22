var bet             = require("../models/bet");
var middlewareObject = {};

middlewareObject.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    req.flash("error", "Please log in first!");
    res.redirect("/login");
};

middlewareObject.checkBetOwnership = function (req, res, next) {
    if(req.isAuthenticated()) {
        bet.findById(req.params.id, function(err, foundBet) {
            if(err) {
                console.log(err);
            }
            else {
                if(foundBet.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "You don't have the permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "Please log in first!");
        res.redirect("/login");
    }
};

module.exports = middlewareObject;