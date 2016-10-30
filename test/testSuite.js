var supertest = require("supertest");
var server = supertest.agent("http://localhost:3000");

var authToken;
var firstMovie;

describe("API Login", function() {

    describe("Testing invalid credentials", function() {
        it("should not give us a token, but 401 instead", function(done) {
            server.post("/api/login")
                .send({
                    username: "nonexistant-user",
                    password: "nonexistant-password"
                })
                .expect(401)
                .end(function(err, res) {
                    done();
                });
        });
    });

    describe("Testing valid credentials (admin:admin)", function() {
        it("should give us a valid token", function(done) {
            server.post("/api/login")
                .send({
                    username: "admin",
                    password: "admin"
                })
                .expect(200)
                .expect(function(res) { res.body.should.have.property("token"); })
                .end(function(err, res) {
                    authToken = res.body.token;
                    done();
                });
        });
    });
});

describe("API Movies", function() {

    describe("Reading movie list", function() {
        it("should give us a list with at least 1 movie", function(done) {
            server.get("/api/movies")
                .set("Authorization", authToken)
                .send({ limit: 5 })
                .expect(200)
                .expect(function(res) { res.body.should.have.property("result"); })
                .expect(function(res) { res.body.result[0].should.have.property("imdb"); })
                .end(function(err, res) {
                    firstMovie = res.body.result[0].imdb;
                    done();
                });
        });
    });
});

describe("API Rating", function() {

    describe("Reading movie rating", function() {
        it("should give the average rating of previously found movie", function(done) {
            server.get("/api/rating")
                .set("Authorization", authToken)
                .send({ imdb: firstMovie })
                .expect(200)
                .expect(function(res) { res.body.should.have.property("result"); })
                .expect(function(res) { res.body.result[0].should.have.property("avg"); })
                .end(function(err, res) {
                    done();
                });
        });
    });

    describe("Submitting movie rating", function() {

        it("should not be able to rate without token", function(done) {
            server.post("/api/rating")
                .send({ imdb: firstMovie, rating: 2.5 })
                .expect(401)
                .end(function(err, res) {
                    done();
                });
        });

        it("should be able to rate the previously found movie", function(done) {
            server.post("/api/rating")
                .set("Authorization", authToken)
                .send({ imdb: firstMovie, rating: 2.5 })
                .expect(200)
                .end(function(err, res) {
                    done();
                });
        });
    });

    describe("Deleting movie rating", function() {

        it("should not be able to delete a non-submitted rating", function(done) {
            server.delete("/api/rating")
                .set("Authorization", authToken)
                .send({ imdb: "nonexistant" })
                .expect(200)
                .expect(function(res) { res.body.should.have.property("error"); })
                .end(function(err, res) {
                    done();
                });
        });

        it("should not be able to delete rating without token", function(done) {
            server.delete("/api/rating")
                .send({ imdb: firstMovie })
                .expect(401)
                .end(function(err, res) {
                    done();
                });
        });

        it("should be able to delete the previously submitted rating", function(done) {
            server.delete("/api/rating")
                .set("Authorization", authToken)
                .send({ imdb: firstMovie })
                .expect(200)
                .end(function(err, res) {
                    done();
                });
        });
    });
});

describe("API Users", function() {

    describe("Reading user list", function() {

        it("should not show us user data without token", function(done) {
            server.get("/api/users")
                .expect(401)
                .end(function(err, res) {
                    done();
                });
        });

        it("should give us a list with at least 1 user", function(done) {
            server.get("/api/users")
                .set("Authorization", authToken)
                .expect(200)
                .expect(function(res) { res.body.should.have.property("result"); })
                .expect(function(res) { res.body.result[0].should.have.property("firstname"); })
                .end(function(err, res) {
                    done();
                });
        });
    });
});