'use strict';

var express = require('express');
var controller = require('./revel.controller');

var router = express.Router();

router.get('/search/:location', controller.search);  // get yelp data merged with checkins
router.get('/', controller.index);                   // get list of checkins
router.get('/:id', controller.show);                 // get list of checkins
router.post('/', controller.create);                 // post new checkin
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
