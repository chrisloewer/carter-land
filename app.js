
var express = require('express');
var hbs = require('express-hbs');
var app = express();

app.engine('hbs', hbs.express4( {
  defaultLayout: __dirname + '/views/layouts/default.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


