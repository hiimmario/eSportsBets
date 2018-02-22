var mongoose = require("mongoose");

// mongoose model config
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("comment", commentSchema);