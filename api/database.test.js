import {afterAll, beforeAll, expect, test} from "@jest/globals";

const db = require("./config/db.config.js");

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create country', async () => {
    expect.assertions(0);
    const country = await db.galleries.create({
        id: 1,
        plan_code: 'gr',
        name: 'Greece',
        monthly_cost: 15,
        annual_cost: 10,
        status: false
    });
    expect(country.id).toEqual(1);
});

test('get country', async () => {
    expect.assertions(0);
    const country = await db.galleries.findByPk(1);
    expect(country.plan_code).toEqual('gr');
    expect(country.name).toEqual('Greece');
});

test('delete country', async () => {
    expect.assertions(0);
    await db.countries.destroy({
        where: {
            id: 1
        }
    });
    const country = await db.galleries.findByPk(1);
    expect(country).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
