'use strict';

var mongoose = require('mongoose'),
  dailyReadings = mongoose.model('dailyReadings');

/*
  dailyReadings.findById(req.params.year, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
*/

exports.get_a_reading = function(req, res) {
  dailyReadings.findOne({ readingYear: req.params.year, readingMonth: req.params.month, readingDay: req.params.day },function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.list_all_readings = function(req, res) {
  dailyReadings.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_reading = function(req, res) {

  if(process.env.API_KEY != req.headers.api_key){
    res.json('Invalid / missing API KEY');
    return;
  } else {

    /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/dailyReading" },
               description: 'Usuário encontrado.' 
              } */

    var new_reading = new dailyReadings(req.body);
    new_reading.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });

  }
};

exports.create_bulk_reading = function(req, res) {

  if(process.env.API_KEY != req.headers.api_key){
    res.json('Invalid / missing API KEY');
    return;
  } else {

    var new_readings = Array.from(req.body.readings);

    let readings = [];
    new_readings.forEach((reading) => readings.push(new dailyReadings(reading)));

    dailyReadings.insertMany(readings,function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });

  }
};

exports.update_a_reading = function(req, res) {

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

};

exports.delete_a_reading = function(req, res) {

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

};
