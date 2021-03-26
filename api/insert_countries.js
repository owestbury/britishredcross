var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "stockopedia"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO countries (plan_code, name, monthly_cost, annual_cost) VALUES ?";
    var values = [
        ['gb', 'UK', 10, 10],
        ['fr', 'France', 10, 60],
        ['de', 'Germany', 15, 75],
        ['us', 'USA', 25, 150],
        ['jp', 'Japan', 15, 65]
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});
