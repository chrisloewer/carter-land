
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
        images: getFilePaths('/resources/images/properties/bowie3606'),
        name: 'Bowie County Timber Investment',
        section: 'East Texas',
        type: 'Timber',
        county: 'Bowie County',
        acreage: '3,606',
        price: '$2,500 per acre',
        description: 'Incredible Timber Investment property with majority pine timber. All of which are planted pine and natural regeneration. The property adjoins the Red River with plentiful deer, hogs and ducks for fantastic hunting! Great access from 2 county roads and only 15 minutes from I-30 and 15 minutes from New Boston. Timber cruise available upon request!',
        wildlife: 'Deer, hog, and ducks',
        water: 'Red River',
        directions: 'Access for Applewhite and Uncut Block is via the West from FM 2103. Access for Rifle Range tracts East and West is via the South from FM 2100. All boundaries are approximate and acres are rounded to the nearest whole acre!',
        mapsQuery: 'Bowie+County,+TX',
        mapsKey: MAPS_API_KEY
      },
      {
        id: 2,
        images: getFilePaths('/resources/images/properties/panola535'),
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
        id: 3,
        images: getFilePaths('/resources/images/properties/redriver1083'),
        name: 'Red River Timber',
        section: 'East Texas',
        type: 'Timber',
        county: 'Red River County',
        acreage: '1,083',
        price: '$2,550 per acre',
        description: 'This is a beautiful place with an incredible 28 year old pine plantation with great volume, 303 acres 28 yrs old, 22 acres is 26 yrs old, 7 acres is 6 yrs old, 113 acres is 13 yrs old, 38 acres is 21 yrs old, 127 acres is 23 yrs old, 150 acres in hardwood and 320 acres in rows, roads, ponds, fields and plots, the CRP pays $22,816.00 per year!',
        improvements: 'Pine',
        wildlife: 'Deer, hogs',
        water: '10 Ponds',
        mapsQuery: 'Red+River+County,+TX',
        mapsKey: MAPS_API_KEY
      },
      {
        id: 4,
        images: getFilePaths('/resources/images/properties/bowie2500'),
        name: 'Rolling Ranch',
        section: 'East Texas',
        type: 'Rolling Ranch',
        county: 'Bowie County',
        acreage: '2,500',
        price: '$4,500 per acre',
        description: 'This gorgeous rolling cattle ranch has an amazing 30 acre lake that is 18 ft deep and fully stocked with bass, catfish brim and many other types of fish, it has 2 brick homes, 3 rental homes, 2 mobile homes, a 22 stall horse barn, covered arena and several shops on the property, plus much more. Would be a fantastic horse operation and hunting place. It is absolutely breathtaking!',
        improvements: '2 main homes, 3 rental house, 2 mobile homes, 22 stall horse barn, covered arena, several shops, office with walk in cooler, 2 tank rooms, feed room, tool room, wash rack, hay barn, cow pens, squeeze chute, 12 covered dogs pens, generator.',
        wildlife: 'Doves, duck, geese, turkey, deer and hogs.',
        water: '30 acre 18 feet deep lake, 20 ponds and community water.',
        directions: 'West of DeKalb on 82.',
        mapsQuery: 'Bowie+County,+TX',
        mapsKey: MAPS_API_KEY
      },
      {
        id: 5,
        images: getFilePaths('/resources/images/properties/gregg79'),
        name: 'Commercial Investment',
        section: 'East Texas',
        type: 'Investment',
        county: 'Gregg  County',
        acreage: '79',
        price: '$1,367,899.26',
        description: 'This is an incredible investment opportunity with great road frontage on HWY 149 and the Sabine River just 2 miles away from Super Walmart in the Lakeport community, about 4 miles from the Gregg County airport!',
        wildlife: 'Deer and hog are prevalent on the property.',
        water: 'Sabine River',
        directions: 'Fronts on HWY 149 and the Sabine River.',
        mapsQuery: 'Lakeport,+TX',
        mapsKey: MAPS_API_KEY
      },
      {
        id: 6,
        images: getFilePaths('/resources/images/properties/marion95'),
        name: 'Marion Homesite',
        section: 'East Texas',
        type: 'Homesite / Recreational',
        county: 'Marion  County',
        acreage: '95',
        price: '$3,500 per acre',
        description: 'This 95 acre piece of land is mostly wooded and a perfect place to build a home, ride ATVs and hunt for deer, hog and turkey. It is split by a paved road, 17 acres on one side and 78 acres on the other. There is a wet weather creek on the 17 acres and a spring fed creek on the 78 acres. Just between Caddo Lake and the historic town of Jefferson Texas. Very close to Big Cypress Creek and Black Cypress Creek.',
        wildlife: 'Deer, hogs and turkey!',
        directions: 'Hwy 59 N to 49 E from Marshall, continue on 49 E for 7.4 miles until you reach a green and white sign that says Sand Country Road on the right hand side of the road, turn left on Sand Country Road/ FM 1195, go about 2 miles and the property will start on the left and right hand sides of the road.',
        mapsQuery: 'Marion,+TX',
        mapsKey: MAPS_API_KEY
      },
      {
        id: 7,
        images: getFilePaths('/resources/images/properties/titus11'),
        name: 'Red Roof Home',
        section: 'East Texas',
        type: 'Acreage with Home',
        county: 'Titus  County',
        acreage: '11',
        price: '$250,000 total',
        description: 'Seven year old home in Titus County. Red Metal Roof on dark brown wood siding. Open Living room, kitchen, and dining area with ceiling fans on pine wood high ceilings. Pine wood kitchen cabinets with beige granite counter tops and tile back splash. Electric cook top range with oven and microwave and hood, and new refrigerator! Wood floors in living and dinning area and kitchen. Beautiful large windows in living area next to magnificent brick fireplace. Three bedrooms and two bathrooms. Considerable master bedroom with high ceiling with ceiling fan, stupendous windows and carpet floor. Great master bathroom with tile floors, jacuzzi bath tub and shower. Hall bathroom with shower and tile floor. The other two bedrooms are fair sized with carpet floors, one has access to outside deck patio. Three deck patios, two partially covered in front and one covered in the back.',
        directions: 'Titus County',
        mapsQuery: 'Titus+county,+TX',
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
