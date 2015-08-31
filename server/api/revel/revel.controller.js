'use strict';


var _ = require('lodash');
var oauthSignature = require('oauth-signature')
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var Revel = require('./revel.model');
var User = require('../user/user.model');
var async = require('async');

var baseUrl = "http://api.yelp.com/v2/search";




// get list of locations and checkins
exports.search = function(req, res) {

  var parameters = {
    category_filter: "nightlife",
    location: req.params.location,
    limit: 20,
    oauth_consumer_key: process.env.YELP_CONSUMER,
    oauth_token: process.env.YELP_OAUTH_TOKEN,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp : n().toString().substr(0,10),
    oauth_nonce: n(),
    oauth_version : '1.0'
  };


  var consumerSecret = process.env.YELP_CONSUMER_SECRET;
  var tokenSecret = process.env.YELP_TOKEN_SECRET;

  var signature = oauthSignature.generate('GET', baseUrl, parameters, consumerSecret, tokenSecret, {encodeSignature: true});

  parameters.oauth_signature = signature;

  var urlParams = qs.stringify(parameters);
  var apiUrl = baseUrl + '?' + urlParams;


  // retrieve Yelp data and merge with local db revel checkins
  request({
    method: 'GET',
    url: apiUrl,
    json: true
  }, function(error, response, yelpData) {
    if (error) { return handleError(response, error); }

    // yelp data combined with local db checkin data (revels)
    async.map(yelpData.businesses, function (business, callback) {
      Revel.findOne({revelId: business.id}, '-__v').lean().exec(function (err, targetRevel) {
        var newRevel = {
          revelId: business.id,
          revelers: []
        }
        console.log(targetRevel);

        if (req.user && targetRevel) {
          var isReveling = targetRevel.revelers.indexOf(req.user._id) >= 0;
        }

        if (targetRevel && isReveling) {     //  if exists in db & user checked in, 
          business.revelData = _.extend({}, targetRevel);
          business.revelData.userCheckedIn = true;
        } else if (targetRevel) {           // if exists in db but user not checked in
          business.revelData = _.extend({}, targetRevel);
          business.revelData.userCheckedIn = false;
        } else {                            
          business.revelData = newRevel;
          business.revelData.userCheckedIn = false;
        }
        callback(err, business);  // async.map required callback
      });
    }, function (err, data) {    // map completed, final data returned
      res.status(200).json(data);
    });
  });
};

// Get a single revel
exports.show = function(req, res) {
  Revel.findById(req.params.id, function (err, revel) {
    if(err) { return handleError(res, err); }
    if(!revel) { return res.status(404).send('Not Found'); }
    return res.json(revel);
  });
};


// Creates a new revel checkin in the DB.
exports.create = function(req, res) {
  User.findById(req.user.id, function (err, user) {
    if (err) { return handleError(res, err); }
    user.currRevel = req.body;
    user.save(function (err) {
      if (err) { return handleError(res, err); }
    });
  });
  Revel.create(req.body, function(err, revel) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(revel);
  });
};


// Get list of checkins
exports.index = function(req, res) {
  Revel.find(function (err, revels) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(revels);
  });
};


// Updates an existing checkin in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.user.id, function (err, user) {
    if (err) { return handleError(res, err); }
    user.currRevel = req.body;
    user.save(function (err) {
      if (err) { return handleError(res, err); }
    });
  });

  Revel.findById(req.params.id, function (err, revel) {
    if (err) { return handleError(res, err); }
    if(!revel) { return res.status(404).send('Not Found'); }
    var updated = _.extend(revel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(revel);
    });
  });
};

// Deletes a checkin from the DB.
exports.destroy = function(req, res) {
  Revel.findById(req.params.id, function (err, revel) {
    if(err) { return handleError(res, err); }
    if(!revel) { return res.status(404).send('Not Found'); }
    revel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};




function handleError(res, err) {
  return res.status(500).send(err);
}
