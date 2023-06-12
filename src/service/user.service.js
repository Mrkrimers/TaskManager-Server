const { getAllUsersDB, postUsersCreateDB, getUserByIdDB, putUserUpdateDB, deleteUserDB, patchUsersDB } = require(`../repository/user.repository`);
const ExceptionType = require(`../exceptions/exceptions`)

async function getAllUsers() {
  const data = await getAllUsersDB();
  if (!data.length) throw new Error(ExceptionType.DB_GET_USERS_NOT_FOUND);

  return data;
}

async function getUserById(id) {
  const data = await getUserByIdDB(id);
  if (!data) throw new Error(ExceptionType.DB_GET_USER_NOT_FOUND);

  return data;
}

async function postUsersCreate(name, surname, email, pwd) {
  const data = await postUsersCreateDB(name, surname, email, pwd);
  if (!data) throw new Error(ExceptionType.DB_POST_USER_NOT_CREATED);

  return data;
}

async function putUserUpdate(id, name, surname, email, pwd) {
  const data = await putUserUpdateDB(id, name, surname, email, pwd);
  if (!data.length) throw new Error(ExceptionType.DB_PUT_USER_NOT_UPDATED);

  return data;
}

async function deleteUser(id) {
  const data = await deleteUserDB(id);
  if (!data.length) throw new Error(ExceptionType.DB_DELETE_USER_NOT_DELETED);

  return data;
}

async function patchUsers(id, clientData) {
  const data = await patchUsersDB(id, clientData);
  if (!data.length) throw new Error(ExceptionType.DB_PATCH_USER_NOT_PATCHED);

  return data;
}

module.exports = { getAllUsers, postUsersCreate, getUserById, putUserUpdate, deleteUser, patchUsers };
