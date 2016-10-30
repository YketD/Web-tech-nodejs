/**
 * Created by yketd on 4-10-2016.
 */
var mongoose = require("mongoose");
var schema = mongoose.Schema;

var movieSchema = new schema({
    title: {type: String, required: true},
    imdb: {type: String, required: true, index: { unique: true }},
    date: {type: Date, required: true},
    length: {type: Number, required: true},
    director: {type: String, required: true},
    description: {type: String, required: true},
    averagerating: {type: Number, required: false}
});

module.exports = mongoose.model("movieModel.js", movieSchema);