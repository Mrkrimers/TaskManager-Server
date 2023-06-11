const ExceptionType = require(`../exceptions/exceptions`)
const { getAllTasksDB, getTaskByIdDB, postTasksCreateDB, putTasksUpdateDB, deleteTaskByIdDB, patchTasksByIdDB } = require(`../repository/task.repository`);

async function getAllTasks() {
    const data = await getAllTasksDB();
    if (!data.length) throw new Error(ExceptionType.DB_GET_TASKS_NOT_FOUND);

    return data;
}

async function getTaskById(id) {
    const data = await getTaskByIdDB(id);
    if (!data.length) throw new Error(ExceptionType.DB_GET_TASK_NOT_FOUND);
    return data;
}

async function postTasksCreate(task, user_id) {
    const data = await postTasksCreateDB(task, user_id);
    if (!data.length) throw new Error(ExceptionType.DB_POST_TASK_NOT_CREATED);

    return data;
}

async function putTasksUpdate(id, task, user_id) {
    const data = await putTasksUpdateDB(id, task, user_id);
    if (!data.length) throw new Error(ExceptionType.DB_PUT_TASK_NOT_UPDATED);

    return data;
}

async function deleteTaskById(id) {
    const data = await deleteTaskByIdDB(id);
    if (!data.length) throw new Error(ExceptionType.DB_DELETE_TASK_NOT_DELETED)

    return data;
}

async function patchTasksById(id, userData) {
    const data = await patchTasksByIdDB(id, userData);
    if (!data.length) throw new Error(ExceptionType.DB_PATCH_TASK_NOT_PATCHED);

    return data;
}


module.exports = { getAllTasks, getTaskById, postTasksCreate, putTasksUpdate, deleteTaskById, patchTasksById }