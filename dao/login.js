"use strict";

var db = require("../utils/db_connection");

let login = (username, password) => {
  const sql = `
        SELECT 
            fn_security_login AS "userData" 
        FROM security.fn_security_login(
            $1, 
            $2
        );
    `;

  const params = [username, password];

  const conn = new db();
  return conn.query(sql, params);
};

let logout = (id) => {
  const sql = `
        SELECT 
            fn_security_logout AS "userData" 
        FROM security.fn_security_logout(
            $1
        );
    `;

  const params = [id];

  const conn = new db();
  return conn.query(sql, params);
};

let checkSession = (id) => {
  const sql = `
        SELECT 
            CASE WHEN COUNT(id) > 0 THEN true ELSE false END "isActive"
        FROM security.user
        WHERE
            id=$1
            AND token_active;
    `;

  const params = [id];

  const conn = new db();
  return conn.query(sql, params);
};

module.exports = {
  login,
	logout,
  checkSession
};
