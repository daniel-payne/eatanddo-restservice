﻿﻿var express          = require('express');
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
 
routes.get('/foodNames', urlencodedParser, function (req, res) {
 
  sqlCommands.processQuery('search.GetFoodNames', [
 
    { name: 'Match', value: req.query.match },
    { name: 'Sources', value: req.query.sources || 'cofid phe' }, // cofid phe ead
    { name: 'MaxResults', value: req.query.count || 10 }
 
  ]).then(returnData.bind(res), returnError.bind(res));
 
});
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
routes.get('/foods', urlencodedParser, function (req, res) {
 
  sqlCommands.processQuery('search.GetFoods', [
 
    { name: 'IDs', value: req.query.ids }
 
  ]).then(returnData.bind(res), returnError.bind(res));
 
});
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
routes.get('/units', urlencodedParser, function (req, res) {
 
  sqlCommands.processQuery('search.GetUnits', [
 
    { name: 'ShowFullDetails', value: req.query.showFullDetails || '1' }
 
  ]).then(returnData.bind(res), returnError.bind(res));
 
});
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
routes.get('/searchUsed', urlencodedParser, function (req, res) {
 
  sqlCommands.processQuery('search.PostSearchUsed', [
 
    { name: 'SearchID',       value: req.query.searchId   },
    { name: 'FoodID',         value: req.query.foodId     },
 
  ]).then(returnData.bind(res), returnError.bind(res));
 
});
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
exports.routes = routes;
 