var supertest = require('supertest');

// Define the url of your HTTP-server
var server = supertest.agent("http://localhost:3000");

describe("API Testsuite", function() {

    var auth = {};
    before(loginUser(auth));

    it("should register a user", function(done) {
        server.post("/api/register")
            .set('Authorization', auth.token)
            .send({"username": "test", "password": "test", "voornaam": "myname", "achername": "othername"})
            .expect(200)
            .end(function(err, res){
                done(err);
            });
    });

    it("should login a user", function(done) {
        server.post("/api/login")
            .set('Authorization', auth.token)
            .send({"username": "admin", "password": "admin"})
            .expect(200)
            .end(function(err, res){
                done(err);
            });
    });
});


function loginUser(auth) {
    return function(done) {
        request
            .post('/token')
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}