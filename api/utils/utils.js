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

module.exports.checkIfExistsAndSave = checkIfExistsAndSave;