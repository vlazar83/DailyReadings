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
  created_date: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String
  },
  status: {
    type: [{
      type: String,
      enum: ['saved', 'ongoing', 'checked']
    }],
    default: ['saved']
  }
});

module.exports = mongoose.model('dailyReadings', dailyReadingsSchema);