'use strict'

var db = require("../utils/db_connection");

let registerLog = (data) => {

    const sql = `
        INSERT INTO audit.log(
            table_name,
            operation,
            data
        )
        VALUES
        (
            $1,
            $2,
            $3
        );
    `;

    const params = [
        data.table,
        data.operation,
        data.data
    ];

    const conn = new db();
    return conn.query(sql, params);

}

let findLogs = () => {

    const sql = `
        SELECT
            *
        FROM audit.log;
    `;

    const conn = new db();
    return conn.query(sql);

}

module.exports = {
    registerLog,
    findLogs
};