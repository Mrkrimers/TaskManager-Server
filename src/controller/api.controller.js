const route = require(`express`).Router();
const { buildResponse } = require(`../helper/buildResponse`);
const { } = require(`../helper/validation`);
const { createUser } = require(`../service/api.service`);

route.post(`/registration`, async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd);

        buildResponse(req, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})





module.exports = route;