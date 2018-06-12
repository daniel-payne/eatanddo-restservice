
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
// var router     = express.Router();
var fs         = require('fs');
var https      = require('https');

var searchRoutes = require('./searchRoutes').routes;

var allowCrossDomain = function (req, res, next) {

  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma',        'no-cache');
  res.header('Expires',       '0');

  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/search', searchRoutes);

app.get('/', function (req, res) {
  res.send('{serverTime: "' + (new Date()).toISOString().slice(0, 19) + '"}');
});

var portHTTP = process.env.port || 1337;
var portHTTPS = process.env.port || 1338;

app.listen(portHTTP, function () {

  console.log('http://localhost:' + portHTTP); //eslint-disable-line no-console

});

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(portHTTPS, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:' + portHTTPS); //eslint-disable-line no-console
});


