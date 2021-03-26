module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("countries", {
        plan_code: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        monthly_cost: {
            type: Sequelize.INTEGER
        },
        annual_cost: {
            type: Sequelize.INTEGER
        },
        button_status: {
            type: Sequelize.BOOLEAN
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

    return Country;
};
