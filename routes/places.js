'use strict'

var express = require('express');
var placesController = require('../controllers/places');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.get('', mdAuth.ensureAuth, placesController.findRestaurants);

module.exports = api;