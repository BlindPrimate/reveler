'use strict';

var express = require('express');
var controller = require('./revel.controller');

var router = express.Router();

router.get('/:location', controller.show);

module.exports = router;
