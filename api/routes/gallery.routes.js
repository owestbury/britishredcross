module.exports = app => {
    const countries = require("../controllers/gallery.controller.js");

    var router = require("express").Router();

    // Create a new Country
    router.post("/create", countries.create);

    // Retrieve gallery
    router.get("/", countries.findAll);

    // Retrieve published gallery
    router.get("/published", countries.findAllPublished);

    // Retrieve a single gallery with id
    router.get("/:id", countries.findOne);

    // Update a gallery with id
    router.put("/:id", countries.update);

    // Delete a gallery with id
    router.delete("/:id", countries.delete);

    // Create a new gallery
    router.delete("/", countries.deleteAll);

    app.use('/api/gallery', router);
};
