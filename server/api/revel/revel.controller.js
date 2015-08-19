'use strict';


var _ = require('lodash');
var oauthSignature = require('oauth-signature')
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var Revel = require('./revel.model');

var baseUrl = "http://api.yelp.com/v2/search";





exports.show = function(req, res) {

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
            break;
          } else {
            business.checkins = 0;
          }      
        }
        return business;
      });
    res.status(200).json(yelpData);
    });
  });

};


function handleError(res, err) {
  return res.status(500).send(err);
}
