var express = require('express');
var app = express();
// Introducing Redis
var _redis = require("redis"),
redis = _redis.createClient();

var restaurants = '[{"id":0,"name":"Pizza Pronto Restaurant","address":"71A Aripita Avenue Woodbrook","city":"Port of spain","phone":"1","best":[{"name":"Pizza Margherita","ingredients":"tomato sauce, mozzarella","price":"9.00 USD"},{"name":"Penne Alla Siciliana","ingredients":"pasta with aubergines, mozzarella and tomato sauce","price":"8.00 USD"}],"pizza":[{"name":"Pizza Prosciuto","ingredients":"one one one","price":"10.00 USD"},{"name":"Pizza Margherita","ingredients":"sos, mozzarella, rosii, busuioc","price":"less"}],"pasta":[{"name":"Spaghetti All Arabiatello","ingredients":"pasta faina","price":"8.00 USD"}]}]';

redis.select(1, function(err,res){
  // you'll want to check that the select was successful here
  if(err) return err;
  else {
  redis.setnx('nodejs', restaurants, function(error, result) {
      if (error) res.send('Error: ' + error);
      else if (result === 0) console.log('the key already exist');
      else console.log('saved');
  });}
});

app.use("/SPA", express.static(__dirname + '/SPA'));
app.use(express.bodyParser());

app.get('/', function(req,res) {
  res.sendfile('SPA/index.html');
});

app.get('/rest', function(req, res) {
  redis.get('nodejs', function(error, result) {
      if (error) res.send('Error: '+ error);
      else {
        json = JSON.parse(result);
        res.json(json);
      }
  });
});

app.get('/rest/:no', function(req, res) {
  redis.get('nodejs', function(error, result) {
      if (error) res.send('Error: '+ error);
      else {
        json = JSON.parse(result);
        var q = json[req.params.no];
        res.json(q);
      }
  });
});

app.listen(process.env.PORT || 3412);