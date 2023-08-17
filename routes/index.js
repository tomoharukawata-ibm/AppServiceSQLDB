var express = require('express');
var router = express.Router();
const sql = require('mssql');

const config = {
    user: 'tomoharukawata',
    password: process.env.DB_PASS,
    server: 'tkawatasqldbsv.database.windows.net',
    database: 'tkawatasqldb',
    options: {
        encrypt: true // 必要ならば
    }
};

router.get('/', function(req, res, next) {
    (async () => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * from Users');
            res.json(result.recordset);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    })();
});

module.exports = router;
