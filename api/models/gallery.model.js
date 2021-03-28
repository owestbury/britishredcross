module.exports = (sequelize, Sequelize) => {
    const Gallery = sequelize.define("galleries", {
        active: {
            type: Sequelize.BOOLEAN
        },
        image: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        monthly_cost: {
            type: Sequelize.INTEGER
        },
        annual_cost: {
            type: Sequelize.INTEGER
        },
        link: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            type: Sequelize.DATE
        }
    });

    return Gallery;
};
