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
    var sql = "INSERT INTO galleries (active, image, name, description, monthly_cost, annual_cost, link) VALUES ?";
    var values = [
        [1, 'snack.png', 'Snack box', 'Snack in the Box are pleased to donate to the best causes', 10, 120, 'link'],
        [1, 'biscults.png', 'Biscults box', 'Individually Wrapped Biscuit Portion Twin Packs', 10, 60, 'link'],
        [1, 'meal.png', 'Meal box', 'Ways to donate food to food bank', 15, 75, 'link'],
        [1, 'succulent.png', 'Succulent box', 'Collection with a new plant pal and pot in every box to the best causes', 25, 150, 'link'],
        [1, 'piquant.png', 'Piquant box', 'Variety of freshly ground, small batch spice blends with their very own chef developed recipes', 15, 65, 'link']
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});
