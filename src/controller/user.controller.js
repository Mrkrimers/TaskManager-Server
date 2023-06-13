const route = require(`express`).Router();
const { buildResponse } = require(`../helper/buildResponse`);
const { getAllUsers, postUsersCreate, getUserById, putUserUpdate, deleteUser, patchUsers } = require(`../service/user.service`);
const { isValidID, isValidUserBody } = require(`../helper/validation`);

route.get(`/`, async (req, res) => {
  try {
    const data = await getAllUsers();

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get(`/:id`, isValidID, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post(`/`, isValidUserBody, async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await postUsersCreate(name, surname, email, pwd);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.put(`/:id`, isValidUserBody, isValidID, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, pwd } = req.body;
    const data = await putUserUpdate(id, name, surname, email, pwd);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.delete(`/:id`, isValidID, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.patch(`/:id`, isValidID, async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = req.body;
    const data = await patchUsers(id, clientData);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
