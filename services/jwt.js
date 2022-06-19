'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

exports.createToken = function(user) {
	
	var payload = {
		sub: user.id,
		name: user.name,
		username: user.username,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	}

	return jwt.encode(payload, process.env.JWT_KEY);

}