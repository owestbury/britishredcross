const db = require("../models");
const Countries = db.countries;
const Op = db.Sequelize.Op;

// Create and Save a new country
exports.create = (req, res) => {
    // Validate request
    if (!req.body.plan_code) {
        res.status(400).send({
            message: "Content can not be empty."
        });
        return;
    }

    // Create a country
    const country = {
        plan_code: req.body.plan_code,
        name: req.body.name,
        monthly_cost: req.body.monthly_cost,
        annual_cost: req.body.annual_cost,
        button_status: req.body.button_status
    };

    // Save country in the database
    Countries.create(country)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the country."
            });
        });
};

// Retrieve all countries from the database.
exports.findAll = (req, res) => {
    console.log('find all');
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Countries.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving country."
            });
        });
};

// Find a single country with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Countries.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving country with id=" + id
            });
        });
};

// Update a country by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Countries.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "country was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update country with id=${id}. Maybe country was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating country with id=" + id
            });
        });
};

// Delete a country with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Countries.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "country was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete country with id=${id}. Maybe country was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete country with id=" + id
            });
        });
};

// Delete all country from the database.
exports.deleteAll = (req, res) => {
    Countries.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} country were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all country."
            });
        });
};

// find all published country
exports.findAllPublished = (req, res) => {
    Countries.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving country."
            });
        });
};
