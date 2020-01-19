var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var http = require('http');
var assert = require('assert');
var app = express();
var cors = require('cors');
var url = 'mongodb://localhost:27017/';

app.engine('.html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.use(cors());

app.get('/save',cors() ,function(req, res){
  var msg = req.query.msg;
  var flag = "false";
  if( msg == undefined || msg.length > 140 || msg.length < 1){
    res.sendStatus(400);
  }
  else{
  var mess = {'msg':msg,'flag':flag}
    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true } ,function(err, client){
      var db = client.db('testdb');
      db.collection('messages').insertOne(mess, function(err, result){
        client.close();
        id = result.insertedId;
        //console.log(err);
        if(err){
        }
        if(result.insertedCount == 1){
          res.writeHead(200,{"Content-Type": "text/html"});
          res.write(id.toString());
          res.end();
        }
        else{
          res.sendStatus(500);
        }
      });
    });

  }
});

app.get('/flag',cors(), function(req, res){
  var idd = req.query.id;
  if(idd == undefined || idd.length != 24){
    res.sendStatus(400);
  }
  else{
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } ,function(err,client){
      idd = new objectId(idd);
      //console.log(idd);
      var db = client.db('testdb');
      //console.log(db.collection('messages').find({"_id":idd}));
      db.collection('messages').updateOne({"_id":idd},
      {$set:{"flag":"true"}},function(err, doc){
        //console.log(doc.result.nModified);
        if(doc.result.nModified == 0){
          //console.log("Shit, shit, shit!");
          res.sendStatus(400);
        }
        else if(doc.result.nModified == 1){
          res.writeHead(200,{"Content-Type": "text/html"});
          res.write("You updated id: " + idd + " flag to true.")
          res.end();
        }
        else{
          res.sendStatus(500);
        }
      });
    });
  }
});

app.get('/getall', function(req, res){
  var resultArray = [];
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }  ,function(err,client){
    assert.equal(null, err);
    var db = client.db('testdb');
    var cursor = db.collection('messages').find();
    if(err){
      res.sendStatus(500);
    }
    else{
      cursor.forEach(function(doc, err){
      resultArray.push(doc);
    }, function(){
      res.send(resultArray);

    });}
  });
});

app.get('/clear', function(req, res){
  MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true } , function(err, client){
    var db = client.db('testdb');
    db.collection('messages').drop(function(err, delOK){
      if(delOK){
        res.sendStatus(200);
      }
      else{
        res.sendStatus(500);
      }
    });
  });
});

app.post('*', function(req,res){
  res.sendStatus(405);
});

app.get('*', function(req, res){
  res.sendStatus(404);
});


var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http:// %s : %s', host, port);
});
