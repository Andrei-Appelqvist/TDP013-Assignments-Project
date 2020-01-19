var should = require('should');
var request = require('superagent');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

var Server = require('../lib/ex.js');

var port = 3000;
var link = 'http://localhost:' + port;
var idd = null;

describe('Save message', function(){
  it('Should return 200 ok', function(done){
    request(link+"/save?msg=unmistakeablyuniquestring").end(function(err, res){
      idd = res.text;
      res.status.should.equal(200);
      done();
    });
  });
});
/*
*/
describe('Flag message as read', function() {
  it("Should change the flag of that message to true", function(done){
    request(link+"/flag?id="+ idd).end(function(err, res){
      res.status.should.equal(200);
      res.text.should.equal("You updated id: " + idd + " flag to true.");
      done();
    });
  });
});

describe('Get all messages', function(){
  it("Should return all messages as a JSON object.", function(done){
    request(link+"/getall").end(function(err, res){
      console.log(res.text);
      res.text.should.equal("[{\"_id\":\""+ idd +"\",\"msg\":\"unmistakeablyuniquestring\",\"flag\":\"true\"}]");
      done();
    });
  });
});

describe('Calling function that does not exist', function(){
  it("Should return a 404 error",function(done){
    request(link + "/hackwebsite").end(function(err, res){
      res.status.should.equal(404);
      done();
    });
  });
});

describe('Using wrong method', function(){
  it("Should return a 405 error",function(done){
    request.post(link + "/getall").send({object: "object"}).end(function(err, res){
      res.status.should.equal(405);
      done();
    });
  });
});

describe('Bad parameter in save function', function() {
  it("Wrong parameter should return 400 error", function(done){
    request(link+"/save?msssg=asdasdas").end(function(err, res){
      res.status.should.equal(400);
      done();
    });
  });
  it("No message should return 400 error", function(done){
    request(link+"/save?msg=").end(function(err, res){
      res.status.should.equal(400);
      done();
    });
  });
  it("Too long message should return 400 error", function(done){
    request(link+"/save?id=2&msg=asdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfaasdfa&flag=false").end(function(err, res){
      res.status.should.equal(400);
      done();
    });
  });
});


describe('Bad parameter in flag function', function() {
  it("Wrong parameter should return 400 error", function(done){
    request(link+"/flag?idzzz=2").end(function(err, res){
      res.status.should.equal(400);
      done();
    });
  });
  it("Empty parameter should return 400 error", function(done){
    request(link+"/flag?id=").end(function(err, res){
      res.status.should.equal(400);
      done();
    });
  });
  it("Wrong length of id should return error 400", function(done){
    request(link+"/flag?id='2'").end(function(err, res){
      res.status.should.equal(400);
      done();
    });
  });
  it("Wrong id should return error 400", function(done){
    request(link+"/flag?id=5d8c9777c1b39b176d34d519").end(function(err, res){
      res.status.should.equal(400);
      done();
    });
  });
});

describe('Clear database',function(){
  it('Should clear database',function(done){
    request(link+"/clear").end(function(err, res){
      if(res.status == 200){
        return done();
      }
    });
  });
});
