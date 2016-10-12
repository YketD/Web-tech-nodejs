/**
 * Created by yketd on 27-9-2016.
 */
var mongoose = require('mongoose');
var express = require('express');
var movieModel = require('./api/moviemodel.js');
var ratingModel = require('./api/RatingModel.js');
var userModel = require('./api/UserModel');
var ratingadta = require('./api/Rating');
var moviedata = require('./api/Movie.js');
var userdata = require('./api/User.js');
var headersSent = false;

var jwt = require('jsonwebtoken');

var app = express();
mongoose.connect('mongodb://localhost/notflix');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('private-key', 'wachtwoord');

app.get('/token', function (req, res) {
    res.send(token);
});

app.get('/api/Movie', function (req, res) {
    var token = req.headers['authorization'];
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            res.send('invalid key, authorization failed!');
        } else {
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
            movieModel.find(
                moviequery
                , {title: 1},
                function (err, results) {
                    if (err) return console.error(err);
                    res.send(results);
                });
        }
    });
});

app.post('/api/register', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var voornaam = req.body.voornaam;
    var achternaam = req.body.achternaam;
    var newuser = new userModel({
        achternaam: achternaam,
        voornaam: voornaam,
        username: username,
        wachtwoord: password,
    })
    if (req.body.tussenvoegsel != undefined) {
        newuser[tussenvoegsel] = req.body.tussenvoegsel;
    }
    newuser.save(function (err, result) {
        if (err)
            console.log(err);
        else
            console.log('user has been saved, log in with: ' + username + password);
    })
});

app.post('/api/login', function (req, res) {
    var password = 'password';
    var username = 'username';
    var loginQuery = {};
    loginQuery[password] = req.body.password;
    loginQuery[username] = req.body.username;
    userModel.find(loginQuery, {username: 1, password: 1}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            if (result != undefined && result.username == loginQuery.username && result.password == loginQuery.password) {
                res.send(jwt.sign(new userModel({
                        achternaam: result.achternaam,
                        tussenVoegsels: result.tussenVoegsels,
                        voornaam: result.voornaam,
                        username: result.username,
                        password: result.password
                    }),
                    app.get('private-key'),
                    {expiresIn: '1440m'}));
                headersSent = true;

            }

        }
    });
});

app.post('/api/rating', function (req, res) {
    var token = req.headers['authorization'];
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            res.send('invalid key, authorization failed!');
        } else {
            var rating = new ratingModel({
                rating: req.body.rating,
                gebruiker: user,
                movie: req.body.movie,
                datum: Date.now()
            });
            rating.save(function (err, result) {
                if (err) {
                    return console.error(err);
                    res.sendStatus(401)
                }
                else {
                    console.log('ratingmodel', "rating has been saved succesfully, result + " + result);
                    res.sendStatus(201)
                }
            });
        }
    })
});

app.get('/api/rating', function (req, res) {
    var token = req.headers['authorization'];
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            res.send('invalid key, authorization failed!');
        } else {
            ratingModel.find(
                {user: this.user},
                {rating: 1, movie: 1},
                function (err, results) {
                    if (err) return console.error(err);
                    res.send(results);
                });
        }
    })
});

app.listen(3000, function () {
    console.log('example app listening');
});