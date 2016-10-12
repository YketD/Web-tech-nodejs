/**
 * Created by yketd on 12-10-2016.
 */
var supertest = require('supertest');
var server = supertest.agent("http://localhost:3000");
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2h0ZXJuYWFtIjoiMSIsInR1c3NlblZvZWdzZWxzIjoiMiIsInZvb3JuYWFtIjoiMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNDc2MzA1Nzc3LCJleHAiOjE0NzYzOTIxNzd9.5u0x2CazQ6KhDjd5fi6vvWffwH2GiqhGn9EudebRDEA';
var falsetoken = 123;

describe("rating get w/ invalid token", function () {
    it('should not get a valid rating for user: user1', function(done) {
        server.get('/api/rating')
            .set('authorization', falsetoken)
            .expect(401, done);
    });
});

describe("rating get w/ valid token", function () {
    it('should get a valid rating for user: user1', function(done) {
        server.get('/api/rating')
            .set('Authorization', token)
            .expect(200, done);
    });
});

describe("post rating w/ valid key", function () {


    it('should create a valid rating', function (done) {
        server.post('/api/rating')
            .set('authorization', token)
            .set('rating', 5)
            .set('movie', 123456)
            .expect(201, done);
    })
});



