
var express = require('express');
var hbs = require('express-hbs');
var nodeMailer = require('nodemailer');
var env = require('node-env-file');
var echo = require('echo-js');
var fs = require('fs');

var app = express();

var MAPS_API_KEY = 'AIzaSyBIZqpNLWVMV6-8Twh64BLvvUAOyMITkR8';
env(__dirname + '/.env');

var smtpTransport = nodeMailer.createTransport({
  service: 'gmail',
  secure: false, // use SSL
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPW
  }
});

app.engine('hbs', hbs.express4( {
  defaultLayout: __dirname + '/views/layouts/default.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));


// MAILER
//------------------------------------------------------------
app.get('/send',function(req,res){
  var mailOptions={
    to : process.env.EMAILRECIPIENT,
    subject : 'Test BLAST',
    html : '<b>Dank</b> Test Message'
  };
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});


// ROUTING
//------------------------------------------------------------
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/land', function (req, res) {
  var data = {
    properties: [
      {
        id: 1,
        images: getFilePaths('/resources/images/properties'),
        name: 'Deadwood Ranch',
        section: 'East Texas',
        type: 'Acreage with home',
        county: 'Panola County',
        acreage: '535',
        price: '$2,500,000',
        description: 'This is beautiful rolling ranch land that offers improved grasses, 200 acres of marketable timber, three homes, working pens and corrals, large shop, three barns, Mill Creek runs on the East side of the ranch, four ponds, community water, and a well.',
        improvements: 'The main home is 16 years old and is 6,000+ sq ft under roof and 4,500 sq ft of air conditioned space, it has 4 bed rooms and 3 1/2 baths, large living area, beautiful dining room, great kitchen, 3 car garage, paved drive with a gorgeous waterfall in front, and a concrete fence! The second home is a 2 bed room, 2 bath brick home built in 1978 and the third home is a small camp house.',
        wildlife: 'Deer, hog, duck, and dove',
        water: 'Mill Creek, 4 ponds, community water, and a well.',
        directions: 'the Ranch is 17 miles from Carthage and exactly 1 hour from Shreveport. email-lindasland@gmail.com or call 903-236-0636',
        mapsQuery: 'Panola+County,+TX',
        mapsKey: MAPS_API_KEY
      },
      {
        id: 2,
        images: [
            'resources/images/properties/1231.jpg',
            'resources/images/properties/1232.jpg',
            'resources/images/properties/1234.jpg'
        ],
        name: 'Commercial Investment',
        section: 'East Texas',
        type: 'Investment',
        county: 'Gregg  County',
        acreage: '79',
        price: '$1,367,899.26',
        description: 'This is an incredible investment opportunity with great road frontage on HWY 149 and the Sabine River just 2 miles away from Super Walmart in the Lakeport community, about 4 miles from the Gregg County airport!',
        improvements: '',
        wildlife: 'Deer and hog are prevalent on the property.',
        water: '	Sabine River',
        directions: 'Fronts on HWY 149 and the Sabine River.',
        mapsQuery: 'Lakeport,+TX',
        mapsKey: MAPS_API_KEY
      }
    ]
  };

  res.render('land', data);
});


// START APP
//------------------------------------------------------------
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});


// HELPER METHODS
//------------------------------------------------------------
function getFilePaths(folderPath) {
  var files = fs.readdirSync('./public' + folderPath);
  for(var i=0; i<files.length; i++) {
    files[i] = folderPath + '/' + files[i];
  }
  return files;
}
