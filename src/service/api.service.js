const bcrypt = require(`bcrypt`);
const { createUserDB, getUserByEmailDB } = require(`../repository/api.repository`);
const ExceptionType = require(`../exceptions/exceptions`)

const saltround = 10;

async function createUser(name, surname, email, pwd) {
    const foundUser = await getUserByEmailDB(email);
    if (foundUser.length) throw new Error(ExceptionType.DB_API_CREATE_ALREADY_EXIST);

    const hashedPwd = await bcrypt.hash(pwd, saltround);

    const data = await createUserDB(name, surname, email, hashedPwd);
    if (!data.length) throw new Error(ExceptionType.DB_API_CREATE_NOT_CREATED);

    return data;
}

async function authorizationUser(email, pwd) {
    const findUser = await getUserByEmailDB(email);
    if (!findUser.length) throw new Error(ExceptionType.DB_API_AUTH_USER_NOT_FOUND);

    const bool = await bcrypt.compare(pwd, findUser[0].pwd);
    if (!bool) throw new Error(ExceptionType.DB_API_AUTH_PWD_NOT_MATCH);

    return findUser
}



module.exports = { createUser, authorizationUser };