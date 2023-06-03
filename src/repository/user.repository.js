const pool = require(`../bd`);

async function getAllUsersDB() {
    const client = await pool.connect();

    const sql = `SELECT * FROM users`

    const data = (await client.query(sql)).rows;

    return data;
}

async function postUsersCreateDB(name, surname, email, pwd) {
    const client = await pool.connect();

    const sql = `INSERT INTO users (name, surname, email, pwd)
    VALUES ($1, $2, $3, $4)
    RETURNING *`

    const data = (await client.query(sql, [name, surname, email, pwd])).rows;

    return data;
}

async function getUserByIdDB(id) {
    const client = await pool.connect();

    const sql = `SELECT * FROM users WHERE id = $1`

    const data = (await client.query(sql, [id])).rows;

    return data;
}

async function putUserUpdateDB(id, name, surname, email, pwd) {
    const client = await pool.connect();

    const sql = `UPDATE users 
    SET name = $2, surname = $3, email = $4, pwd = $5 
    WHERE id = $1
    RETURNING *`

    const data = (await client.query(sql, [id, name, surname, email, pwd])).rows;

    return data;
}

async function deleteUserDB(id) {
    const client = await pool.connect();

    const sql = `DELETE FROM users 
    WHERE id = $1 
    RETURNING *`

    const data = (await client.query(sql, [id])).rows;

    return data;
}



module.exports = { getAllUsersDB, postUsersCreateDB, getUserByIdDB, putUserUpdateDB, deleteUserDB };