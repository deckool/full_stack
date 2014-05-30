var express = require('express');
var app = express();

// Declare variables
var fs = require('fs'),
    obj

// Read the file and send to the callback
fs.readFile(__dirname + '/restaurant.json', handleFile)

// Write the callback function
function handleFile(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
    // You can now play with your datas
}

app.use("/SAP", express.static(__dirname + '/SAP'));
app.use(express.bodyParser());

app.get('/', function(req,res) {
  res.sendfile('SAP/index.html');
 //res.json(obj);
});

app.get('/rest', function(req, res) {
  res.json(obj);
});

app.get('/rest/random', function(req, res) {
  var id = Math.floor(Math.random() * obj.length);
  var q = obj[id];
  res.json(q);
});

app.get('/rest/:id', function(req, res) {
  if(obj.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  var q = obj[req.params.id];
  res.json(q);
});
/*
app.post('/rest', function(req, res) {
  if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  var newQuote = {
    author : req.body.author,
    text : req.body.text
  };

  quotes.push(newQuote);
  res.json(true);
});

app.delete('/quote/:id', function(req, res) {
  if(quotes.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  quotes.splice(req.params.id, 1);
  res.json(true);
});*/

app.listen(process.env.PORT || 3412);