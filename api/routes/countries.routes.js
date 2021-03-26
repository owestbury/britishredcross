module.exports = app => {
    const countries = require("../controllers/countries.controller.js");

    var router = require("express").Router();

    // Create a new Country
    router.post("/create", countries.create);

    // Retrieve Countries
    router.get("/", countries.findAll);

    // Retrieve published Countries
    router.get("/published", countries.findAllPublished);

    // Retrieve a single Country with id
    router.get("/:id", countries.findOne);

    // Update a Country with id
    router.put("/:id", countries.update);

    // Delete a Country with id
    router.delete("/:id", countries.delete);

    // Create a new Country
    router.delete("/", countries.deleteAll);

    app.use('/api/countries', router);
};
