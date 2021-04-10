'use strict';

var router = require('express').Router();

var mongoose = require('mongoose'),
  dailyReadings = mongoose.model('dailyReadings'),
  utils = require('../utils/utils.js')

// 2 configs are used. allUsers can execute POST, but only Admin can execute PUT and DELETE
const adminAuthConfig = require("./config.js").adminUsers;
const keyUsersAuthConfig = require("./config.js").keyUsers;
const jsonAdminAuthonfig = JSON.parse(JSON.stringify(adminAuthConfig))
const jsonKeyUsersAuthonfig = JSON.parse(JSON.stringify(keyUsersAuthConfig))

const basicAuth = require('express-basic-auth');

router.post('/dailyReading',basicAuth(jsonKeyUsersAuthonfig),(req, res) => {

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

router.put('/dailyReading',basicAuth(jsonAdminAuthonfig),(req, res) => {

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

router.delete('/dailyReading',basicAuth(jsonAdminAuthonfig),(req, res) => {

    /*  #swagger.tags = ['dailyReadings']
        #swagger.description = 'Endpoint to delete one dailyReading.' */      
    
    /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/dailyReadingWasDeleted" },
          description: 'Response after successful delete.'  } */  

    if(process.env.API_KEY != req.headers.api_key){
      res.json('Invalid / missing API KEY');
      return;
    } else {

      utils.deleteReading(req.query.readingID, res);

    }

});

router.post('/dailyReadings',basicAuth(jsonKeyUsersAuthonfig),(req, res) => {

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

      utils.saveMultipleReadings(Array.from(req.body.readings), res);

    }
});

router.patch('/dailyReadings',basicAuth(jsonAdminAuthonfig),(req, res) => {

  /*  #swagger.tags = ['dailyReadings']
      #swagger.description = 'Endpoint to update a couple of dailyReadings.' */

  /*  #swagger.parameters['requestBody'] = {
            in: 'body',
            description: "Input data.",
            schema: { $ref: "#/definitions/dailyReadingsMassUpdateInput" } } */
  
    /* #swagger.responses[200] = { 
              schema: { "$ref": "#/definitions/dailyReadingsMassUpdateOutput" },
              description: "Returning data." } */

  if(process.env.API_KEY != req.headers.api_key){
    res.json('Invalid / missing API KEY');
    return;
  } else {

    utils.saveMultipleReadings(Array.from(req.body.readings), res);

  }
});

module.exports = router;