'use strict';


var _ = require('lodash');
var oauthSignature = require('oauth-signature')
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var Revel = require('./revel.model');

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


  // retrieve Yelp data
  request({
    method: 'GET',
    url: apiUrl,
    json: true
  }, function(error, response, yelpData) {
    if (error) { return handleError(response, error); }

    // db call for all checkins
    Revel.find(function (err, revels) {
      if(err) { return (err, revels); }
      // cross reference checkins with yelp api location data
      yelpData.businesses = yelpData.businesses.map(function(business) {
        for (var i = 0; i < revels.length; i++) {
          if (revels[i].revel_id === business.id)  {
            business.checkins = revels[i].checkins;
            business.db_id = revels[i]._id
            break;
          } else {
            business.checkins = 0;
            business.db_id = '';
          }      
        }
        return business;
      });
    res.status(200).json(yelpData);
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
