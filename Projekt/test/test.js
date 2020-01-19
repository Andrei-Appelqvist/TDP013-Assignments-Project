var should = require('should');
var request = require('superagent');
var assert = require('assert');
var expect = require('expect');
var MongoClient = require('mongodb').MongoClient;

var Server = require('../server.js');

var port = 5000;
var link = 'http://localhost:'+port;
var asf = 2;
var token = null;
var friend_token = null;
var user_id = null;
var fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWRiODNiMzAzYjRiNDg2MGMxZjg1OGIzIn0sImlhdCI6MTU3MjM1NDg2NCwiZXhwIjoxNTczMzU0ODYzfQ.7vAGBF3_zpnHnbxl79iAgIZUsnnNfe71EeDGk9PosWY";
var profile_id = null;
var del_post = null;
var friend_id = '5db8351eccbcec584c952b2d';
var print_msg = x => console.log(x.msg);


//Register user
describe('Register user', function(){
  ///Try empty or wrong parameters
  ////Name, password(min6), mail return 400
  ///Try already existing user
  ///Get token back(and save it)
  it('Wrong parameters should return 400 w/ message',function(done){

    payload ={"name":"",
              "email":"test",
              "password":"11111"};
    request
        .post(link+"/api/users/")
        .set('Content-Type','application/json')
        .send(payload)
        .end(function(err,res){
          res.status.should.equal(400);
          console.log("#Error messages wrong or empty params:")
          res.body.errors.map(print_msg);
          done();
        });
  });
  it('Existing mail should return 400 w/ message',function(done){
    payload ={"name":"test2",
              "email":"test1@test.now",
              "password":"111111"};
    request
        .post(link+"/api/users/")
        .set('Content-Type','application/json')
        .send(payload)
        .end(function(err,res){
          res.status.should.equal(400);
          console.log("#Error message mail exists:")
          res.body.errors.map(print_msg);
          done();
        });
  });
  it('Succesful register should return token',function(done){
    payload ={"name":"Backendtest2",
              "email":"test2@test.now",
              "password":"111111"};
    request
        .post(link+"/api/users/")
        .set('Content-Type','application/json')
        .send(payload)
        .end(function(err,res){
          res.status.should.equal(200);
          console.log("Token?:");
          token = res.body.token;
          console.log(token);
          done();
        });
  });
});


//Log in
describe('Log in', function(){

  it('Wrong parameters should return 400 w/ message',function(done){
    payload ={"email":"test2",
              "password":"11111"};
    request
        .post(link+"/api/auth")
        .set('Content-Type','application/json')
        .send(payload)
        .end(function(err,res){
          res.status.should.equal(400);
          console.log("#Not valid email:")
          res.body.errors.map(print_msg);
          done();
        });


  });
  it('Empty parameters should return 400 w/ message',function(done){
    payload ={"email":"",
              "password":""};
    request
        .post(link+"/api/auth")
        .set('Content-Type','application/json')
        .send(payload)
        .end(function(err,res){
          res.status.should.equal(400);
          console.log("#Empty params:")
          res.body.errors.map(print_msg);
          done();
        });
  });
  it('Non existing user should return 400 w/ message',function(done){
  payload ={"email":"notexisting@gmail.com",
            "password":"111111"};
  request
      .post(link+"/api/auth")
      .set('Content-Type','application/json')
      .send(payload)
      .end(function(err,res){
        res.status.should.equal(400);
        console.log("#No user:")
        res.body.errors.map(print_msg);
        done();
      });
  });
  it('Wrong credentials or no password should return 400 w/ message',function(done){
    payload ={"email":"notexisting@gmail.com",
              "password":"111111"};
    request
        .post(link+"/api/auth")
        .set('Content-Type','application/json')
        .send(payload)
        .end(function(err,res){
          res.status.should.equal(400);
          console.log("#No pass or wrong pass:")
          res.body.errors.map(print_msg);
          done();
        });
  });
  it('Succesful login should return token(save token)',function(done){
    payload ={"email":"test2@test.now",
              "password":"111111"};
    request
        .post(link+"/api/auth")
        .set('Content-Type','application/json')
        .send(payload)
        .end(function(err,res){
          res.status.should.equal(200);
          console.log("#Succesful login, token?:")
          token = res.body.token;
          console.log(token);
          done();
        });
  });

  ///Empty or wrong parameters
  ////mail, password
  ///Try non existing user
  ///Get and set token

});


//Create profile for user
describe('Create profile for user', function(){
  it('Should create a profile for the user',function(done){
    payload={};
    request
        .post(link+'/api/profile')
        .set('Content-Type','application/json')
        .set('x-auth-token',token)
        .send(payload)
        .end(function(err,res){
          res.status.should.equal(200);
          profile_id = res.body._id;
          user_id = res.body.user;
          done();
        });

  });

});

//Get logged in user profile
describe('Get logged in user profile',function(){
  it('Should return the profile of the logged in user', function(done){
    request
        .get(link+'/api/auth')
        .set('x-auth-token',token)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body._id.should.equal(user_id);
          //console.log(res.body._id);
          done();
        });
  });
});

//Get all profiles
describe('Get all profiles', function(){
  it('Should return all profiles in database', function(done){
    request
        .get(link+'/api/profile')
        .set('x-auth-token',token)
        .end(function(err,res){
          res.status.should.equal(200);
          expect(res.body.length).toBeGreaterThan(0);
          done();
        });
  });
});

//Get profile by user id
describe('Get profile by user id', function(){
  it('Should return the profile of the user', function(done){
    request
        .get(link+"/api/profile/user/"+user_id)
        .end(function(err, res){
          res.status.should.equal(200);
          res.body._id.should.equal(profile_id);
          done();
        });
  });
});

//Create a post in a profile
describe('Create a post in a profile',function(){
  it('Should return all the posts with the newest aswell', function(done){
    payload = {"text":"This is a message"};
    request
        .post(link+'/api/profile/post/'+profile_id)
        .set('Content-Type','application/json')
        .set('x-auth-token',token)
        .send(payload)
        .end(function(err, res){
          res.status.should.equal(200)
          res.body[0].text.should.equal("This is a message")
          done();
        });

  });
});

//Get all posts from a profile
describe('Get all posts for profile', function(){
  it('Should return all the posts for the profile', function(done){
    request
        .get(link+'/api/profile/post/'+profile_id)
        .end(function(err, res){
          res.status.should.equal(200)
          res.body[0].text.should.equal("This is a message")
          res.body.length.should.equal(1);
          done();
        });
  });
});

//Delete a post in a profile
describe('Delete a post from profile',function(){
  it('Adding a second post', function(done){
    payload = {"text":"This is a message that will be deleted"};
    request
        .post(link+'/api/profile/post/'+profile_id)
        .set('Content-Type','application/json')
        .set('x-auth-token',token)
        .send(payload)
        .end(function(err, res){
          res.status.should.equal(200)
          res.body[0].text.should.equal("This is a message that will be deleted")
          del_post = res.body[0]._id
          done();
        });

  });
  it('Should return 404 if post is not found', function(done){
    request
        .del(link+'/api/profile/post/'+profile_id+'/'+'5db829b9e8f73314a033b8d8')
        .set('x-auth-token',token)
        .end(function(err,res){
          res.status.should.equal(404);
          console.log(res.body);
          done();
        });

  });
  it('Should return 401 if unauthorized tries to delete post', function(done){
    request
        .del(link+'/api/profile/post/'+profile_id+'/'+del_post)
        .set('x-auth-token',fake_token)
        .end(function(err,res){
          res.status.should.equal(401);
          console.log(res.body);
          done();
        });
  });
  it('Should return the posts if succesfully deleted a post', function(done){
    request
        .del(link+'/api/profile/post/'+profile_id+'/'+del_post)
        .set('x-auth-token',token)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body[0].text.should.equal("This is a message");
          res.body.length.should.equal(1);
          done();
        });
  });
});

//Add friend
describe('Add friend',function(){
  it('Should return an array with the friend in it', function(done){
    request
    .put(link+'/api/profile/friend/'+friend_id)
    .set('x-auth-token',token)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body[0].name.should.equal("Backendtest1");
      done();
    });
  });

})

  /*
  */
//Delete profile and user
describe('Delete profile and user',function(){
  it('Should return msg User succesfully removed', function(done){
    request
    .del(link+'/api/profile/')
    .set('x-auth-token',token)
    .end(function(err, res){
      res.status.should.equal(200);
      console.log("#Res message:")
      console.log(res.text);
      done();
    });
  });
});
