'use strict';

var router = require('express').Router();

var mongoose = require('mongoose'),
  dailyReadings = mongoose.model('dailyReadings'),
  utils = require('../utils/utils.js')


router.get('/dailyReadings',(req, res) => {
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

router.get('/dailyReading/:year/:month/:day', (req, res) => {
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

module.exports = router;