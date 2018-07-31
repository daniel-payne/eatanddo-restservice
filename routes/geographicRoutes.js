﻿var express          = require('express');
// var router           = express.Router();

var bodyParser       = require('body-parser');

var sqlCommands      = require('../sqlCommands.js');

// var jsonParser       = bodyParser.json();
// var rawParser        = bodyParser.raw();
// var textParser       = bodyParser.text();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

function returnData(data) {
  this.header('Content-Type', 'application/json');
  this.send(data);
}

function returnError(error) {
  this.statusCode = 500;
  this.send(error);
}

var routes = express.Router();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.get('/', function (req, res) {
  res.send('{ data: "search", serverTime: "' + (new Date()).toISOString().slice(0, 19) + '"}');
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.get('/continents', urlencodedParser, function (req, res) {

  sqlCommands.processQuery('geographic.GetContinents', [

  ]).then(returnData.bind(res), returnError.bind(res));

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.get('/countries', urlencodedParser, function (req, res) {

  sqlCommands.processQuery('geographic.GetCountries', [

  ]).then(returnData.bind(res), returnError.bind(res));

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.get('/country', urlencodedParser, function (req, res) {

  sqlCommands.processQuery('geographic.GetCountry', [

    { name: 'ContextReference', value: req.query.contextReference },

  ]).then(returnData.bind(res), returnError.bind(res));

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.get('/states', urlencodedParser, function (req, res) {

  sqlCommands.processQuery('geographic.GetStates', [

    { name: 'ContextReference', value: req.query.contextReference },

  ]).then(returnData.bind(res), returnError.bind(res));

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.get('/counties', urlencodedParser, function (req, res) {

  sqlCommands.processQuery('geographic.GetCounties', [

    { name: 'ContextReference', value: req.query.contextReference },

  ]).then(returnData.bind(res), returnError.bind(res));

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.get('/conurbations', urlencodedParser, function (req, res) {

  sqlCommands.processQuery('geographic.GetConurbations', [

    { name: 'ContextReference', value: req.query.contextReference },

  ]).then(returnData.bind(res), returnError.bind(res));

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.get('/places', urlencodedParser, function (req, res) {

  sqlCommands.processQuery('geographic.GetPlaces', [

    { name: 'ContextReference', value: req.query.contextReference },

  ]).then(returnData.bind(res), returnError.bind(res));

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.get('/features', urlencodedParser, function (req, res) {

  sqlCommands.processQuery('geographic.GetFeatures', [

    { name: 'ContextReference', value: req.query.contextReference },

  ]).then(returnData.bind(res), returnError.bind(res));

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.routes = routes;

