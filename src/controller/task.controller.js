const route = require(`express`).Router();
const { buildResponse } = require(`../helper/buildResponse`);
const { getAllTasks, getTaskById, postTasksCreate, putTasksUpdate, deleteTaskById, patchTasksById } = require(`../service/task.service`)

route.get(`/`, async (req, res) => {
    try {
        const data = await getAllTasks();
        buildResponse(res, 200, data)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.get(`/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getTaskById(id);

        buildResponse(res, 200, data)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.post(`/`, async (req, res) => {
    try {
        const { task, user_id } = req.body;
        const data = await postTasksCreate(task, user_id);

        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.put(`/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const { task, user_id } = req.body;
        const data = await putTasksUpdate(id, task, user_id);

        buildResponse(res, 200, data)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.delete(`/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteTaskById(id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})

route.patch(`/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const data = await patchTasksById(id, userData);

        buildResponse(res, 200, data)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})


module.exports = route