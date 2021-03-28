const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

// set port, listen for db api requests
const PORT = process.env.PORT || 8080;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// gallery routes

app.use(cors(corsOptions));

const allowedOrigins = ["http://localhost:3000","http://localhost:8080"];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

app.use(bodyParser.json()); //application json
require("./api/routes/gallery.routes.js")(app);

// call sysc()
const db = require("./api/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
// db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to British Red Cross node application." });
});

app.get('api/gallery', (req, res) =>{
    res.send('go to /gallery to see gallery')
});

app.get('/hey', (req, res) => res.send('ho!'))

app.listen()

app.listen(PORT, () => {
   console.log('gallery server listening on port 8080');
});
