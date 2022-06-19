"use strict";

const userDao = require('../dao/user');

let registerUser = async (data) => {

  return userDao.registerUser(data);

}

let checkExistence = async (username) => {

  return userDao.checkExistence(username);

}

module.exports = {
  registerUser,
  checkExistence,
};
