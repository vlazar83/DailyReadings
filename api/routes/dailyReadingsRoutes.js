'use strict';

var mongoose = require('mongoose'),
  dailyReadings = mongoose.model('dailyReadings'),
  utils = require('../utils/utils.js')

module.exports = function(app) {

    app.post('/dailyReading',(req, res) => {

      /*  #swagger.tags = ['dailyReadings']
          #swagger.description = 'Endpoint to store a new dailyReading.' */


      /*  #swagger.parameters['requestBody'] = {
                in: 'body',
                description: "Input data.",
                schema: { $ref: "#/definitions/dailyReadingInput" } } */

      if(process.env.API_KEY != req.headers.api_key){
        res.json('Invalid / missing API KEY');
        return;
      } else {
    
        utils.checkIfExistsAndSave(req.body.readingYear, req.body.readingMonth, req.body.readingDay, req, res);

        /* #swagger.responses[200] = { 
                   schema: { $ref: "#/definitions/dailyReading" },
                   description: 'Response after successful post.'  }  */
            
      }
    });

    app.put('/dailyReading',(req, res) => {

      /*  #swagger.tags = ['dailyReadings']
          #swagger.description = 'Endpoint to update the dailyReading.' */
      
      /*  #swagger.parameters['requestBody'] = {
                in: 'body',
                description: "Input data.",
                schema: { $ref: "#/definitions/dailyReadingInput" } } */     

      /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/dailyReading" },
            description: 'Response after successful update.'  } */   

      if(process.env.API_KEY != req.headers.api_key){
        res.json('Invalid / missing API KEY');
        return;
      } else {

        dailyReadings.findOneAndUpdate({_id: req.query.readingID}, req.body, {new: true}, function(err, task) {
          if (err)
            res.send(err);
          res.json(task);
        });
      }
    });

    app.delete('/dailyReading',(req, res) => {

      /*  #swagger.tags = ['dailyReadings']
          #swagger.description = 'Endpoint to delete one dailyReading.' */      
      
      /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/dailyReadingWasDeleted" },
            description: 'Response after successful delete.'  } */  

      if(process.env.API_KEY != req.headers.api_key){
        res.json('Invalid / missing API KEY');
        return;
      } else {
    
        dailyReadings.remove({
          _id: req.query.readingID
        }, function(err, task) {
          if (err)
            res.send(err);
          res.json({ message: 'Reading successfully deleted' });
        });
    
      }
    
    });

    app.get('/dailyReadings',(req, res) => {
      /*  #swagger.tags = ['dailyReadings']
          #swagger.description = 'Endpoint to get the dailyReadings.' */
    
          /* #swagger.responses[200] = { 
              schema: { "$ref": "#/definitions/dailyReadingsOutput" },
              description: "Returning data." } */

      dailyReadings.find({}, function(err, task) {
        if (err)
          res.send(err);
        res.json(task);
      });
    });
    
    app.post('/dailyReadings',(req, res) => {

      /*  #swagger.tags = ['dailyReadings']
          #swagger.description = 'Endpoint to store a couple of new dailyReadings.' */

      /*  #swagger.parameters['requestBody'] = {
                in: 'body',
                description: "Input data.",
                schema: { $ref: "#/definitions/dailyReadingsInput" } } */
      
        /* #swagger.responses[200] = { 
                  schema: { "$ref": "#/definitions/dailyReadingsOutput" },
                  description: "Returning data." } */

      if(process.env.API_KEY != req.headers.api_key){
        res.json('Invalid / missing API KEY');
        return;
      } else {
    
        var new_readings = Array.from(req.body.readings);
    
        new_readings.forEach((reading) => {
          utils.checkIfExists(reading.readingYear, reading.readingMonth, reading.readingDay, reading, utils.callbackForSave);
        });
    
      }
    });

  app.get('/dailyReading/:year/:month/:day', (req, res) => {
    /*  #swagger.tags = ['dailyReadings']
          #swagger.description = 'Endpoint to get the dailyReading.' */
    
      /* #swagger.responses[200] = { 
              schema: { "$ref": "#/definitions/dailyReading" },
              description: "Returning data." } */

    dailyReadings.findOne({ readingYear: req.params.year, readingMonth: req.params.month, readingDay: req.params.day },function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    })
  });

};