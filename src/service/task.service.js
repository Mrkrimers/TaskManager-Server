const { getAllTasksDB, getTaskByIdDB, postTasksCreateDB, putTasksUpdateDB, deleteTaskByIdDB, patchTasksByIdDB } = require(`../repository/task.repository`);

async function getAllTasks() {
    const data = await getAllTasksDB();
    if (!data.length) throw new Error(`DB is EMPTY`);

    return data;
}

async function getTaskById(id) {
    const data = await getTaskByIdDB(id);
    if (!data.length) throw new Error(`Id not found`);
    return data;
}

async function postTasksCreate(task, user_id) {
    const data = await postTasksCreateDB(task, user_id);
    if (!data.length) throw new Error(`Not created`);

    return data;
}

async function putTasksUpdate(id, task, user_id) {
    const data = await putTasksUpdateDB(id, task, user_id);
    if (!data.length) throw new Error(`update did not happen`);

    return data;
}

async function deleteTaskById(id) {
    const data = await deleteTaskByIdDB(id);
    if (!data.length) throw new Error(`delete not possible`)

    return data;
}

async function patchTasksById(id, userData) {
    const data = await patchTasksByIdDB(id, userData);
    if (!data.length) throw new Error(`id is not found`);

    return data;
}


module.exports = { getAllTasks, getTaskById, postTasksCreate, putTasksUpdate, deleteTaskById, patchTasksById }