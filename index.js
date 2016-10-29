/* Libraries */
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

/* Data model */
var movieModel = require('./api/moviemodel.js');
var ratingModel = require('./api/RatingModel.js');
var User = require('./api/UserModel');

/* Web server */
var app = express();
var jwt = require('jsonwebtoken');

/* Private key */
app.set('private-key', 'wachtwoord');

/* Body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Static files directory */
app.use(express.static("public"));

/* MongoDB connection */
mongoose.connect('mongodb://localhost/notflix');

/* API calls */
app.post('/api/register', function(req, res) {

    // Validation
    if (req.body.username === undefined)
        res.status(400).send();
    else if (req.body.password === undefined || req.body.password2 === undefined)
        res.status(400).send();
    else if (req.body.password != req.body.password2)
        res.status(200).send({error: "Password validation did not match"});
    else if (req.body.firstname === undefined || req.body.lastname === undefined)
        res.status(400).send();

    // Validation passed
    else
    {
        // Save user in database
        /*var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            lastname: req.body.lastname,
            middlename: req.body.middlename,
            firstname: req.body.firstname
        });*/

        // Create a token
        res.status(400).send({
            token: jwt.sign(result, app.get("private-key"), {expiresIn: "1440m"})
        });
    }
});

app.post('/api/login', function (req, res) {

    var loginQuery = {}
    loginQuery['password'] = req.body.password;
    loginQuery['username'] = req.body.username;
    User.findOne(loginQuery, {}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            if (result != null) {
                if (result.username == loginQuery.username && result.password == loginQuery.password) {
                    res.status(200).send({
                        token: jwt.sign(result,
                            app.get('private-key'),
                            {expiresIn: '1440m'})
                    });
                }
            } else
                res.status(400).send();
        }
    });
});

app.get('/api/rating', function (req, res) {

    var token = req.headers['authorization'];
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            res.send(401, 'invalid key, authorization failed!');
        } else {
            ratingModel.find(
                {user: this.user},
                {rating: 1, movie: 1},
                function (err, results) {
                    if (err) return console.error(err);
                    res.send(200, results);
                });
        }
    })
});

app.post('/api/rating', function (req, res) {

    var token = req.headers['authorization'];
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            res.send('invalid key, authorization failed!');
        } else {
            var rating = new ratingModel({
                rating: req.body.rating,
                user: this,
                movie: req.body.movie,
                date: Date.now()
            });
            rating.save(function (err, result) {
                if (err) {
                    res.status(401).send({error: err})
                }
                else {
                    console.log('ratingmodel', "rating has been saved succesfully, result + " + result);
                    res.sendStatus(201)
                }
            });
        }
    })
});

/* Start app */
app.listen(3000, function() {
    console.log('example app listening');
});