'use strict';

var mongoose = require('mongoose'),
  dailyReadings = mongoose.model('dailyReadings');

exports.list_all_readings = function(req, res) {
  dailyReadings.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.get_a_reading = function(req, res) {
  dailyReadings.findOne({ readingYear: req.params.year, readingMonth: req.params.month, readingDay: req.params.day },function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

  exports.create_bulk_reading = function(req, res) {
    var new_readings = Array.from(req.body.readings);

    let readings = [];
    new_readings.forEach((reading) => readings.push(new dailyReadings(reading)));

    dailyReadings.insertMany(readings,function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
    //res.json("Success");

    /*
    readings.forEach(reading => reading.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    }));
    */
  };

/*
  dailyReadings.findById(req.params.year, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
*/

exports.create_a_reading = function(req, res) {
  var new_reading = new dailyReadings(req.body);
  new_reading.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_reading = function(req, res) {
  dailyReadings.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_reading = function(req, res) {

  dailyReadings.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Reading successfully deleted' });
  });


};
