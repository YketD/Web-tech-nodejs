/**
 * Created by yketd on 4-10-2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var movieSchema = new schema({
    title: {type: String, required: true},
    imdb: {type: String, required: true},
    date: {type: Date, required: true},
    length: {type: Number, required: true},
    director: {type: String, required: true},
    description: {type: String, required: true}
});
module.exports = mongoose.model('moviemodel.js', movieSchema);