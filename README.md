## Reveler
____
##### A [freeCodeCamp](http://www.freecodecamp.com/) Basejump Project

A MEAN-fullstack web application developed to allow users to find local bars & restaraunts and check in to them.  Results pulled from yelp api calls and merged with local db checkins for each individual user.  Users can check into one revel location at a time.

Initial scaffolding of the app accomplished with [angular-fullstack constructor](https://github.com/DaftMonk/generator-angular-fullstack).

##### Check out the [Live Demo](https://revler.herokuapp.com/)


#### Setup

Yelp api calls keys must be set in order for the app to work properly.

* Create access keys and secrets on [Yelp API console](https://www.yelp.com/developers/documentation/v2/overview)

* In the cloned repo directory copy the file found at `server/config/local.env.sample.js` and rename to `local.env.js`. Open in text editor, and paste your yelp api info into the designated areas within the `local.env.js` file.

If you wish to use any authorization type (twitter, facebook, google) other than the local authentication, they require their own api secrets and keys to be entered in the `local.env.js` file.






