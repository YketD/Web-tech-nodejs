/* Libraries */
var mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

/* Data model */
var movieModel = require("./api/movieModel");
var userModel = require("./api/userModel");
var ratingModel = require("./api/ratingModel");

/* First time runs (puts initial data into database) */
//var Movie = require("./api/Movie");
//var User = require("./api/User");
//var Rating = require("./api/Rating");

/* Web server */
var app = express();
var jwt = require("jsonwebtoken");

/* Private key */
app.set('private-key', "wachtwoord");

/* Body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Static files directory */
app.use(express.static("public"));

/* MongoDB connection */
mongoose.connect("mongodb://localhost/notflix");

/* API calls */
app.post("/api/register", function(req, res) {

    // Validation
    if (req.body.username === undefined)
        return res.status(400).send();
    else if (req.body.password === undefined || req.body.password2 === undefined)
        return res.status(400).send();
    else if (req.body.password != req.body.password2)
        return res.status(200).send({error: "Password validation did not match"});
    else if (req.body.firstname === undefined || req.body.lastname === undefined)
        return res.status(400).send();

    // Validation passed
    else
    {
        // Create a new user
        var newUser = new userModel({
            username: req.body.username,
            password: req.body.password,
            lastname: req.body.lastname,
            middlename: req.body.middlename,
            firstname: req.body.firstname
        });

        // No duplicate users
        userModel.findOne({username: newUser.username, password: newUser.password}, {}, function(err, result) {

            // 400 on failure
            if (err) return res.status(400).send({ error: err });
            else
            {
                if (result == null)
                {
                    // Save user in database
                    newUser.save(function(err, result) {

                        // 400 on failure
                        if (err) return res.status(400).send({ error: err });
                        else
                        {
                            // Create a token
                            return res.status(200).send({
                                token: jwt.sign(newUser, app.get("private-key"), {expiresIn: "1440m"})
                            });
                        }
                    });
                }

                else
                {
                    // user found
                    return res.status(200).send({error: "Gebruikersnaam al in gebruik"});
                }
            }
        });
    }
});

app.post("/api/login", function(req, res) {

    var loginQuery = {}
    loginQuery["password"] = req.body.password;
    loginQuery["username"] = req.body.username;
    userModel.findOne(loginQuery, {}, function(err, result) {

        // 400 on failure
        if (err) return res.status(400).send({ error: err });
        else
        {
            if (result != null)
            {
                if (result.username == loginQuery.username && result.password == loginQuery.password)
                {
                    // Login OK, create a token
                    return res.status(200).send({
                        token: jwt.sign(result, app.get("private-key"), {expiresIn: "1440m"})
                    });
                }
            }

            // Invalid login, 401
            else return res.status(401).send();
        }
    });
});

app.get("/api/rating", function(req, res) {

    var token = req.headers["authorization"];
    jwt.verify(token, app.get("private-key"), function(err, decoded) {

        if (err) return res.status(401).send({ error: err });
        else
        {
            // Validation
            if (req.query.imdb === undefined)
                return res.status(400).send();
            else if (req.query.user !== undefined && req.query.user != 0)
            {
                ratingModel.find({ user: decoded._doc._id, imdb: req.query.imdb }, function (err, result) {
                        if (err) return res.status(400).send({ error: err });
                        else return res.status(200).send({ result: result });
                    }
                );
            }
            else
            {
                // Get average rating of movie
                ratingModel.aggregate([
                    { $group: { _id: "$imdb", avg: { $avg: "$rating" } } },
                    { $match: { _id: req.query.imdb } }
                ], function(err, result) {
                    if (err)
                        return res.status(400).send({error: err});
                    else if (result == null || result.length < 1)
                        return res.status(200).send({result: [{_id: req.query.imdb, avg: 0.0}]});
                    else
                        return res.status(200).send({result: result});
                });
            }
        }
    });
});

app.post("/api/rating", function(req, res) {

    var token = req.headers["authorization"];
    jwt.verify(token, app.get("private-key"), function(err, decoded) {

        if (err) return res.status(401).send({ error: err });
        else
        {
            // Validation
            if (req.body.imdb === undefined)
                return res.status(400).send();
            else if (req.body.rating === undefined)
                return res.status(400).send();

            // Do not allow voting on the same movie multiple times
            ratingModel.findOne({ user: decoded._doc._id, imdb: req.body.imdb }, {}, function(err, result) {
                if (err) return res.status(400).send({ error: err });
                else if (result != null)
                {
                    // Update existing vote
                    //return res.status(200).send({ error: "Je hebt deze film al gewaardeerd" });
                    ratingModel.update(
                        { user: decoded._doc._id, imdb: req.body.imdb },
                        { $set: { rating: parseFloat(req.body.rating) } },
                        function (err, result) {
                            if (err) return res.status(400).send({ error: err });
                            else return res.status(200).send();
                        }
                    );
                }
                else
                {
                    // Save rating
                    var newRating = new ratingModel({
                        rating: parseFloat(req.body.rating),
                        user: decoded._doc._id,
                        imdb: req.body.imdb,
                        date: Date.now()
                    });

                    newRating.save(function (err, result) {
                        if (err) return res.status(400).send({ error: err });
                        else return res.status(200).send();
                    });
                }
            });
        }
    });
});

app.delete("/api/rating", function(req, res) {

    var token = req.headers["authorization"];
    jwt.verify(token, app.get("private-key"), function(err, decoded) {

        if (err) return res.status(401).send({ error: err });
        else
        {
            // Validation
            if (req.body.imdb === undefined)
                return res.status(400).send();

            // Do not allow voting on the same movie multiple times
            ratingModel.findOne({ user: decoded._doc._id, imdb: req.body.imdb }, {}, function(err, result) {
                if (err) return res.status(400).send({ error: err });
                else if (result == null) return res.status(200).send({ error: "Je hebt deze film nog niet gewaardeerd" });
                else
                {
                    // Delete rating
                    ratingModel.remove({user: decoded._doc._id, imdb: req.body.imdb}, function (err, result) {
                        if (err) return res.status(400).send({ error: err });
                        else return res.status(200).send();
                    });
                }
            });
        }
    });
});

app.get("/api/movies", function(req, res) {

    var token = req.headers["authorization"];
    jwt.verify(token, app.get("private-key"), function(err, decoded) {

        if (err) return res.status(401).send({ error: err });
        else
        {
            // Set up filter
            var filter = {};
            if (req.query.imdb !== undefined)
                filter.imdb = req.query.imdb;

            // Get results from database
            movieModel.find(filter, function (err, result) {
                    if (err) return res.status(400).send({ error: err });
                    else return res.status(200).send({ result: result });
                }
            ).limit(req.query.limit !== undefined ? parseInt(req.query.limit) : 0);
        }
    });
});

/* Start app */
app.listen(3000, function() {
    console.log("NotFlix app listening");
});