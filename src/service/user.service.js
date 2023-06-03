const { getAllUsersDB, postUsersCreateDB, getUserByIdDB, putUserUpdateDB, deleteUserDB } = require(`../repository/user.repository`);

async function getAllUsers() {
    const data = await getAllUsersDB();
    if (!data.length) throw new Error(`DB is EMPTY`);

    return data;
};

async function getUserById(id) {
    const data = await getUserByIdDB(id);
    if (!data) throw new Error(`EMPRY`);

    return data;
}

async function postUsersCreate(name, surname, email, pwd) {
    const data = await postUsersCreateDB(name, surname, email, pwd);
    if (!data) throw new Error(`EMPRY`);

    return data;
}

async function putUserUpdate(id, name, surname, email, pwd) {
    const data = await putUserUpdateDB(id, name, surname, email, pwd);
    if (!data.length) throw new Error(`not Created`);

    return data;
}

async function deleteUser(id) {
    const data = await deleteUserDB(id);
    if (!data.length) throw new Error(`ID not found`);

    return data;
}



module.exports = { getAllUsers, postUsersCreate, getUserById, putUserUpdate, deleteUser };