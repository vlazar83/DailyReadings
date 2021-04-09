'use strict';

var mongoose = require('mongoose'),
dailyReadings = mongoose.model('dailyReadings');

function checkIfExistsAndSave(readingYear, readingMonth, readingDay, req, res) {

    const ready = dailyReadings.exists({ readingYear: readingYear, readingMonth: readingMonth, readingDay: readingDay });

    ready.then((result) => {
          
        if(!result){
          var new_reading = new dailyReadings(req.body);

          new_reading.save(function(err, task) {
            if (err)
              res.send(err);
            res.json(task);
          });

        } else {
          res.json('The reading for this day already exists! No DB operation is performed.');
        }

      }).catch((error) => {
          console.log("Error", error);
      })
}

function storeDailyReadingInDB(reading){

    console.log('Storing in DB..');

    var new_reading = new dailyReadings(reading);

    new_reading.save(function(err, task) {
          
    });

  }

function callbackForSave(readingExists, reading){

    console.log(readingExists);

    if(!readingExists) storeDailyReadingInDB(reading);   // if the reading does not we save it into DB

  }

function checkIfExists(readingYear, readingMonth, readingDay, reading, callbackFunction){

    const exists = dailyReadings.exists({ readingYear: readingYear, readingMonth: readingMonth, readingDay: readingDay }, function(err, res) {
        callbackFunction(res, reading);
      });
}

module.exports.callbackForSave = callbackForSave;
module.exports.checkIfExists = checkIfExists;
module.exports.checkIfExistsAndSave = checkIfExistsAndSave;