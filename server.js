
var dotenv = require('dotenv').config({path: __dirname + '/EnvironmentVariables.env'});

var express = require('express'),
  app = express(),
  port = 50000,
  mongoose = require('mongoose'),
  dailyReadings = require('./api/models/dailyReadingsModel'), //created model loading here
  bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dailyReadingsDB'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./api/routes/dailyReadingsRoutes'));
app.use('/', require('./api/routes/dailyReadingsRoutesNoAuth'));

//var routes = require('./api/routes/dailyReadingsRoutes'); //importing routes
//routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

//var routesNoAuth = require('./api/routes/dailyReadingsRoutesNoAuth'); //importing routes
//routesNoAuth(app); //register the route

app.listen(port);


console.log('dailyReadings RESTful API server started on: ' + port);