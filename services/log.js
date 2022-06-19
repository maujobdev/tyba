"use strict";

const logDao = require('../dao/log');

let registerLog = (data) => {

  return logDao.registerLog(data);

}

let findLogs = () => {

  return logDao.findLogs();

}

module.exports = {
    registerLog,
    findLogs
};
