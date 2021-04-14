'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dailyReadingsSchema = new Schema({
  readingYear: {
    type: String
  },
  readingMonth: {
    type: String
  },
  readingDay: {
    type: String
  },
  firstReading: {
    type: String,
    required: 'Kindly enter the content of the first reading'
  },
  firstReadingShort: {
    type: String,
    required: 'Kindly enter the short reference of the first reading'
  },
  firstReadingLink: {
    type: String,
    required: 'Kindly enter the link of the first reading'
  },
  secondReading: {
    type: String,
    required: 'Kindly enter the content of the second reading'
  },
  secondReadingShort: {
    type: String,
    required: 'Kindly enter the short reference of the second reading'
  },
  secondReadingLink: {
    type: String,
    required: 'Kindly enter the link of the second reading'
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