'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RevelSchema = new Schema({
  revelId: String,
  revelers: Array,
  versionKey: false
});

module.exports = mongoose.model('Revel', RevelSchema);
