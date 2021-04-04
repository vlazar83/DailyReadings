'use strict';
module.exports = function(app) {
  var dailyReadings = require('../controllers/dailyReadingsController');

  // dailyReadings Routes
  app.route('/dailyReading')
    .post(dailyReadings.create_a_reading)
    .put(dailyReadings.update_a_reading)
    .delete(dailyReadings.delete_a_reading);

  app.route('/dailyReadings')
    .get(dailyReadings.list_all_readings)
    .post(dailyReadings.create_bulk_reading);


  app.route('/dailyReading/:year/:month/:day')
    .get(dailyReadings.get_a_reading);
};