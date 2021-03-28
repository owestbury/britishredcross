const db = require("../models");
const galleries = db.galleries;
const Op = db.Sequelize.Op;

// Create and Save a new gallery
exports.create = (req, res) => {
    // Validate request
    if (!req.body.plan_code) {
        res.status(400).send({
            message: "Content can not be empty."
        });
        return;
    }

    // Create a gallery
    const gallery = {
        active: req.body.active,
        image: req.body.plan_code,
        name: req.body.name,
        description: req.body.name,
        monthly_cost: req.body.monthly_cost,
        annual_cost: req.body.annual_cost,
        link: req.body.link
    };

    // Save gallery in the database
    galleries.create(gallery)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the gallery."
            });
        });
};

// Retrieve all galleries from the database.
exports.findAll = (req, res) => {
    console.log('find all');
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    galleries.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving gallery."
            });
        });
};

// Find a single gallery with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    galleries.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving gallery with id=" + id
            });
        });
};

// Update a gallery by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    galleries.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "gallery was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update gallery with id=${id}. Maybe gallery was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating gallery with id=" + id
            });
        });
};

// Delete a gallery with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    galleries.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "gallery was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete gallery with id=${id}. Maybe gallery was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete gallery with id=" + id
            });
        });
};

// Delete all gallery from the database.
exports.deleteAll = (req, res) => {
    galleries.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} gallery were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all gallery."
            });
        });
};

// find all published gallery
exports.findAllPublished = (req, res) => {
    galleries.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving gallery."
            });
        });
};
