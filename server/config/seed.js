/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Revel = require('../api/revel/revel.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    currRevel: {
      revel_id: "the-captains-club-eastlake",
      revelers: []
    }
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});


Revel.find({}).remove(function () {
  Revel.create({
      revel_id: "the-captains-club-eastlake",
      revelers: []
    } , {
      revel_id: "the-wild-goose-willoughby",
      revelers: []
    }
    ), function() {
      console.log('finished populating revels');
    };
})




//User.find({}).remove(function() {
  //User.create({
    //provider: 'local',
    //name: 'Test User',
    //email: 'test@test.com',
    //password: 'test',
    //currRevel: ''
  //}, {
    //provider: 'local',
    //role: 'admin',
    //name: 'Admin',
    //email: 'admin@admin.com',
    //password: 'admin'
  //}, function() {
      //console.log('finished populating users');
    //}
  //);
//});

//Revel.find({}).remove(function () {
  //Revel.create({
      //revel_id: "the-captains-club-eastlake",
      //revelers: []
    //} , {
      //revel_id: "the-wild-goose-willoughby",
      //revelers: []
    //}
    //), function() {
      //console.log('finished populating revels');
    //};
//})


