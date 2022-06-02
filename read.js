const db = require('./src/configs/database_config');


const sql = "SELECT * FROM pembeli";

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});