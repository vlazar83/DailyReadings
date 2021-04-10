'use strict';

var mongoose = require('mongoose'),
dailyReadings = mongoose.model('dailyReadings');
let readings = [];

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

function checkIfExists(readingYear, readingMonth, readingDay){

    return dailyReadings.exists({ readingYear: readingYear, readingMonth: readingMonth, readingDay: readingDay });

}

function saveMultipleReadings(arrayOfReadings, res){
    readings = [];

    const promises = [];

    arrayOfReadings.forEach((reading) => {
        readings.push(new dailyReadings(reading));
        promises.push(checkIfExists(reading.readingYear, reading.readingMonth, reading.readingDay));
      });

    Promise.all(promises)
      .then((results) => {

        var finalDecisionToSave = true;
        var indexOfFirstDuplicateElement = 0;
        
        for (let i = 0; i < results.length; ++i) {
            if(results[i] == true) {
                finalDecisionToSave = false;
                indexOfFirstDuplicateElement = i;
                break;
            } 
        }

        if(finalDecisionToSave){
            dailyReadings.insertMany(readings,function(err, task) {
                if (err)
                  res.send(err);
                res.json(task);
              });
        } else {
            var responseString = "{ \"message\" : \"Saving is not possible because an element was found which is already saved for the given day.The index of the first duplicate element is : " + indexOfFirstDuplicateElement.toString() + "\"}";
            var obj = JSON.parse(JSON.stringify(responseString));
            res.setHeader("Content-Type", "application/json");
            res.status(400).send(obj);
        }

      })
      .catch((e) => {
        console.log("failure", e);
      });

}

function deleteReading(readingID, res){

  dailyReadings.findByIdAndDelete(readingID, (err) => {
    if (err) {
      res.json({ message: 'Reading deletion failed, error:', err });
    } else {
        res.json({ message: `Deleted dailyReading with ID: ${readingID} successfully` });
    }
  });

}

module.exports.deleteReading = deleteReading;
module.exports.saveMultipleReadings = saveMultipleReadings;
module.exports.checkIfExists = checkIfExists;
module.exports.checkIfExistsAndSave = checkIfExistsAndSave;