'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dailyReadingsSchema = new Schema({
  dailyReading: {
    type: String,
    required: 'Kindly enter the content of the reading'
  },
  readingYear: {
    type: String
  },
  readingMonth: {
    type: String
  },
  readingDay: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  Created_by: {
    type: String
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('dailyReadings', dailyReadingsSchema);