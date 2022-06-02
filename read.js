const config = require('./src/configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
}); 

const sql = "SELECT * FROM pembeli";

pool.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});