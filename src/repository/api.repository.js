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

module.exports = { createUserDB }