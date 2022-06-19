"use strict";

const loginDao = require('../dao/login');

let login = (data) => {

  return loginDao.login(data.username, data.password);

}

let logout = (id) => {

  return loginDao.logout(id);

}

let checkSession = (id) => {

  return loginDao.checkSession(id);

}

module.exports = {
  login,
  logout,
  checkSession
};
