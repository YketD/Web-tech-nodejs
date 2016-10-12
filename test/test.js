/**
 * Created by yketd on 12-10-2016.
 */
var supertest = require('supertest');
var server = supertest.agent("http://localhost:3000");

describe("sample unit test", function () {
    it("should return right status",function(done){

        // calling home page api
        server
            .get("/")
            .expect("Content-type",/json/)
            .expect(201) // THis is HTTP response
            .end(function(err,res){
                done(err)
            });
    });
});