/* Libraries */
var mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

/* Data model */
var movieModel = require("./api/movieModel");
var ratingModel = require("./api/RatingModel");
var userModel = require("./api/UserModel");

/* First time runs (puts initial data into database) */
//var Movie = require("./api/Movie");
//var User = require("./api/User");

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
            if (err) res.status(400).send({ error: err });
            else
            {
                if (result == null)
                {
                    // Save user in database
                    newUser.save(function(err, result) {

                        // 400 on failure
                        if (err) res.status(400).send({ error: err });
                        else
                        {
                            // Create a token
                            res.status(200).send({
                                token: jwt.sign(newUser, app.get("private-key"), {expiresIn: "1440m"})
                            });
                        }
                    });
                }

                else
                {
                    // user found
                    res.status(200).send({error: "Gebruikersnaam al in gebruik"});
                }
            }
        });
    }
});

app.post("/api/login", function(req, res) {

    var loginQuery = {}
    loginQuery["password"] = req.body.password;
    loginQuery["username"] = req.body.username;
    userModel.findOne(loginQuery, {}, function (err, result) {

        // 400 on failure
        if (err) res.status(400).send({ error: err });
        else
        {
            if (result != null)
            {
                if (result.username == loginQuery.username && result.password == loginQuery.password)
                {
                    // Login OK, create a token
                    res.status(200).send({
                        token: jwt.sign(result, app.get("private-key"), {expiresIn: "1440m"})
                    });
                }
            }

            // Invalid login, 401
            else res.status(401).send();
        }
    });
});

app.get("/api/rating", function(req, res) {

    var token = req.headers["authorization"];
    jwt.verify(token, app.get("private-key"), function(err, decoded) {
        if (err) res.status(400).send({ error: err });
        else
        {
            ratingModel.find(
                {user: this.user},
                {rating: 1, movie: 1},
                function (err, results) {
                    if (err) res.status(400).send({ error: err });
                    else res.status(200).send(results);
                });
        }
    })
});

app.post("/api/rating", function(req, res) {

    var token = req.headers["authorization"];
    jwt.verify(token, app.get("private-key"), function (err, decoded) {
        if (err) res.status(400).send({ error: err });
        else
        {
            var rating = new ratingModel({
                rating: req.body.rating,
                user: this,
                movie: req.body.movie,
                date: Date.now()
            });
            rating.save(function (err, result) {
                if (err) res.status(400).send({ error: err });
                else
                {
                    console.log("ratingmodel", "rating has been saved succesfully, result + " + result);
                    res.status(201).send();
                }
            });
        }
    })
});

app.get("/api/movies", function(req, res) {

    var token = req.headers["authorization"];
    jwt.verify(token, app.get("private-key"), function(err, decoded) {

        if (err) res.status(401).send({ error: err });
        else
        {
            movieModel.find(function (err, result) {
                    if (err) res.status(400).send({ error: err });
                    else res.status(200).send({ result: result });
                }
            );
        }
    });
});

/* Start app */
app.listen(3000, function() {
    console.log("NotFLix app listening");
});