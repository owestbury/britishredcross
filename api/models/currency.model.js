module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define("currency", {
        code: {
            type: Sequelize.STRING
        },
        symbol: {
            type: Sequelize.STRING
        },
        rate: {
            type: Sequelize.INTEGER
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

    return Currency;
};
