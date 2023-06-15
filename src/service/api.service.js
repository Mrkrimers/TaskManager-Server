const { createUserDB } = require(`../repository/api.repository`);


async function createUser(name, surname, email, pwd) {
    const data = await createUserDB(name, surname, email, pwd);
    if (!data.length) throw new Error(`user not created`);

    return data;
}


module.exports = { createUser };