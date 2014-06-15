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
}

app.use("/SPA", express.static(__dirname + '/SPA'));
app.use(express.bodyParser());

app.get('/', function(req,res) {
  res.sendfile('SPA/index.html');
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
    return res.send('Error 404: No book found');
  }

  var q = obj[req.params.id];
  res.json(q);
});

app.listen(process.env.PORT || 3412);