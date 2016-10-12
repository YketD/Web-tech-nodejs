/**
 * Created by yketd on 4-10-2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ratingSchema = new schema({
    rating: {type: Number, required: true},
    gebruiker: {type: Object, required: true},
    movie: {type: String, required: true},
    datum: {type: Date, required: true}
});

module.exports = mongoose.model('RatingModel.js', ratingSchema);