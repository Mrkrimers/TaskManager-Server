const pool = require(`../bd`);

async function createUserDB(name, surname, email, pwd) {
    const client = await pool.connect();
    try {
        await client.query(`BEGIN`);

        const sql = `INSERT INTO users (name, surname, email, pwd) 
        VALUES ($1, $2, $3, $4)
        RETURNING *`

        const data = (await client.query(sql, [name, surname, email, pwd])).rows;

        await client.query(`COMMIT`);
        return data;
    } catch (error) {
        await client.query(`ROLLBACK`);
        console.log(`createUserDB: ${error.message}`);
        return [];
    }
}

async function getUserByEmailDB(email) {
    const client = await pool.connect();
    const sql = `SELECT * FROM users WHERE email = $1`

    const data = (await client.query(sql, [email])).rows;

    return data;
}




module.exports = { createUserDB, getUserByEmailDB }