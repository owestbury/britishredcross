var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "britishredcross"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO currency (code, symbol, rate) VALUES ?";
    var values = [
        ['gb','£', 1],
        ['eu', '€', 1.17],
        ['us', '$', 1.37],
        ['jp', '¥', 150.11]
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});
