
var dotenv = require('dotenv').config({path: __dirname + '/EnvironmentVariables.env'});

var express = require('express'),
  app = express(),
  port = 50000,
  mongoose = require('mongoose'),
  dailyReadings = require('./api/models/dailyReadingsModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dailyReadingsDB'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/dailyReadingsRoutes'); //importing routes
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);