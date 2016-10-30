/**
 * Created by yketd on 4-10-2016.
 */
var mongoose = require("mongoose");
var schema = mongoose.Schema;

var ratingSchema = new schema({
    rating: {type: Number, required: true},
    user: {type: String, required: true},
    imdb: {type: String, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model("RatingModel.js", ratingSchema);