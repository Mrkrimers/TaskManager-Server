const route = require(`express`).Router();
const { buildResponse } = require(`../helper/buildResponse`);
const { isValidUserBody, isValidApiBody } = require(`../helper/validation`);
const { createUser, authorizationUser } = require(`../service/api.service`);

route.post(`/registration`, isValidUserBody, async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd);

        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
});

route.post(`/auth`, isValidApiBody, async (req, res) => {
    try {
        const { email, pwd } = req.body;
        const data = await authorizationUser(email, pwd);

        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
});



module.exports = route;