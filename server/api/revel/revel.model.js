'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RevelSchema = new Schema({
  revel_id: String,
  checkins: Number
});

module.exports = mongoose.model('Revel', RevelSchema);
