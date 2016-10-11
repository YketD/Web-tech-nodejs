/**
 * Created by yketd on 27-9-2016.
 */
var mongoose = require('mongoose');
var express = require('express');
var model = require('./api/moviemodel.js');
var moviedata = require('./api/Movie.js');
var jwt = require('jsonwebtoken');

var app = express();
mongoose.connect('mongodb://localhost/notflix');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('private-key', 'wachtwoord');
var user = 'janpiet'
var token = jwt.sign({Username: "jan"},
    app.get('private-key'),
    {expiresIn: '1440m'}
);

app.get('/', function (req, res) {
    // res.send(token);

});

app.get('/api/Movie', function (req, res) {
    // var token = req.headers['authorization'];
    // jwt.verify(token, app.get('private-key'), function (err, decoded) {
    //     if (err){
    //         res.send('invalid key, authorization failed!');
    //     }   else{
    //         res.send('used token =' + decoded);
    //     }
    // });
    // var moviequery = '';
    // if (req.query.title != undefined)
    //     moviequery +='"title": ' + '"'+ req.query.title+ '"' + ',';
    // if (req.query.imdb != undefined)
    //     moviequery +='imdb: ' + req.query.imdb + ',';
    // if (req.query.date != undefined)
    //     moviequery +='date: ' + req.query.date + ',';
    // if (req.query.length != undefined)
    //     moviequery += 'length: ' + req.query.length + ',';
    // if (req.query.director != undefined)
    //     moviequery += 'director: ' + req.query.director + ',';
    // if (req.query.description != undefined)
    //     moviequery  += 'description: ' + req.query.description + ',';
    var title = 'title';
    var imdb = 'imdb';
    var date = 'date';
    var length = 'length';
    var director = 'director';
    var description = 'description';
    var moviequery = {};
    if (req.query.title != undefined)
        moviequery[title] = req.query.title;
    if (req.query.imdb != undefined)
        moviequery[imdb] = req.query.imdb;
    if (req.query.date != undefined)
        moviequery[date] = req.query.date;
    if (req.query.length != undefined)
        moviequery[length] = req.query.length;
    if (req.query.director != undefined)
        moviequery[director] = req.query.director;
    if (req.query.description != undefined)
        moviequery[description] = req.query.description;


    model.find(
        moviequery
        // title: title,
        // imdb: imdb,
        // date: date,
        // length: length,
        // director: director,
        // description: description
        , {title: 1},
        function (err, results) {
            if (err) return console.error(err);
            res.send(results);
        });


});
app.listen(3000, function () {
    console.log('example app listening');
});