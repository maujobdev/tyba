'use strict'

var db = require("../utils/db_connection");

let registerUser = (data) => {

    const sql = `
        INSERT INTO security.user
        (
            name,
            username,
            password
        )
        VALUES
        (
            $1,
            $2,
            $3
        ) RETURNING *;
    `;

    const params = [
        data.name,
        data.username,
        data.password
    ];

    const conn = new db();
    return conn.query(sql, params);

}

let checkExistence = (username) => {

    const sql = `
        SELECT 
            CASE WHEN COUNT(id) = 0 THEN false ELSE true END AS exists
        FROM security.user
        WHERE
            username=$1; 
    `;

    const params = [
        username
    ];

    const conn = new db();
    return conn.query(sql, params);

}

module.exports = {
    registerUser,
    checkExistence
};