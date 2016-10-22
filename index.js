/**
 * Created by yketd on 27-9-2016.
 */
var mongoose = require('mongoose');
var express = require('express');
var movieModel = require('./api/moviemodel.js');
var ratingModel = require('./api/RatingModel.js');
var user = require('./api/UserModel');
var path = require('path')


var headersSent = false;
var app = express();

app.set('private-key', 'wachtwoord');
var jwt = require('jsonwebtoken');


mongoose.connect('mongodb://localhost/notflix');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/api/token', function (req, res) {
    res.send(jwt.sign(testUser,
        app.get('private-key'),
        {expiresIn: '1440m'}));
});

app.get('/api/Movie', function (req, res) {
    var token = req.headers['authorization'];
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            res.send('invalid key, authorization failed!');
        } else {
            // var currentuser;
            // var userquery = {};
            // userquery['username'] = token.username;
            // ratingModel.findOne(
            //     userquery,
            //     {rating: 1},
            //     function (err, results) {
            //         if (err) res.status(401).send('user not found! contact an administrator')
            //         currentuser = results;
            //     }
            // )
            var moviequery = {};
            if (req.query.title != undefined)
                moviequery['title'] = req.query.title;
            if (req.query.imdb != undefined)
                moviequery['imdb'] = req.query.imdb;
            if (req.query.date != undefined)
                moviequery['date'] = req.query.date;
            if (req.query.length != undefined)
                moviequery['length'] = req.query.length;
            if (req.query.director != undefined)
                moviequery['director'] = req.query.director;
            if (req.query.description != undefined)
                moviequery['description'] = req.query.description;
            movieModel.findOne(
                moviequery
                , {title: 1, description: 1, averagerating: 1},
                function (err, results1) {
                    if (err) res.status(400).send({message: err});
                    else res.status(200).send({results: results1});
                }
            );


        }
    })
});

app.get('/api/users', function (req, res) {
    user.find(
        function (err, result1) {
            if (err) res.status(401).send({error: err})
            else res.status(200).send({result: result1})
        }
    )
})

app.post('/api/register', function (req, res) {

    var user1 = new user({
        'achternaam' : req.body.achternaam,
        'voornaam': req.body.voornaam,
        'username': req.body.username,
        'password': req.body.password
    });

    if (req.body.tussenvoegsel != 'undefined')
        user1['tussenvoegsel'] = req.body.tussenvoegsel;

    user.ensureIndex
    user1.save(function (err, result) {
        if (err)
            res.status(401).send({error: err});
        else {

            var token = jwt.sign(user1,
                app.get('private-key'),
                {expiresIn: '1440m'});
            res.status(201).send({
                message: 'registration valid, login with:', result: result,
                key: token})
            }
        })
    });

app.post('/api/login', function (req, res) {
    var loginQuery = {}
    loginQuery['password'] = req.body.password;
    loginQuery['username'] = req.body.username;
    user.findOne(loginQuery, {}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            if (result != null) {
                if (result.username == loginQuery.username && result.password == loginQuery.password) {
                    res.status(200).send({
                        key: jwt.sign(result,
                            app.get('private-key'),
                            {expiresIn: '1440m'})
                    });
                    headersSent = true;
                }
            } else
                res.sendFile(path.join(__dirname + '/web-module/web/login.html')).setRequestHeader("")
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
                gebruiker: this,
                movie: req.body.movie,
                datum: Date.now()
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

app.get('/api/oneMovietest', function (req, res) {
    testQuery = {};
    testQuery['title'] = req.body.title;
    testQuery['imdb'] = req.body.imdb;
    movieModel.findOne(
        testQuery,
        {title: 1},
        function (err, result) {
            if (err) res.send('Error! : ' + err);
            res.send(result.title + typeof result)
        }
    )
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/web-module/web/index.html'))
})

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

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/web-module/web/login.html'))
})

app.listen(3000, function () {
    console.log('example app listening');
});