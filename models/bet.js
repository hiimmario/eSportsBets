var mongoose                = require("mongoose");

// mongoose model config
var betSchema = new mongoose.Schema({
    matchId: String,
    fromAddress: String,
    betAmount: Number,
    videogame: String,
    league: String,
    league_imageurl: String,
    begin_at: Date,
    opponent1_name: String,
    opponent1_imageurl: String,
    opponent2_name: String,
    opponent2_imageurl: String,
    created: {
        type: Date, default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

module.exports = mongoose.model("bet", betSchema);

