'use strict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();

api.post('', userController.registerUser);

module.exports = api;