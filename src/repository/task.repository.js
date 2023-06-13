const pool = require(`../bd`);

async function getAllTasksDB() {
  const client = await pool.connect();
  const sql = `SELECT * from tasks`;
  const data = (await client.query(sql)).rows;

  return data;
}

async function getTaskByIdDB(id) {
  const client = await pool.connect();
  const sql = `SELECT * FROM tasks 
    WHERE id = $1`;
  const data = (await client.query(sql, [id])).rows;

  return data;
}

async function postTasksCreateDB(task, user_id) {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);

    const sql = `INSERT INTO tasks (task, user_id) 
        VALUES ($1, $2)
        RETURNING *`;
    const data = (await client.query(sql, [task, user_id])).rows;

    await client.query(`COMMIT`);

    return data;
  } catch (error) {
    await client.query(`ROLLBACK`);
    console.log(`postTasksCreateDB: ${error.message}`);
    return [];
  }
}

async function putTasksUpdateDB(id, task, user_id) {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);

    const sql = `UPDATE tasks
        SET task = $2, user_id = $3
        WHERE id = $1
        RETURNING *`;

    const data = (await client.query(sql, [id, task, user_id])).rows;
    // console.log(`+++++++++HELLOY*************`);

    await client.query(`COMMIT`);

    return data;
  } catch (error) {
    await client.query(`ROLLBACK`);
    console.log(`putTasksUpdateDB: ${error.message}`);
    return [];
  }
}

async function deleteTaskByIdDB(id) {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);

    const sql = `DELETE FROM tasks
        WHERE id = $1
        RETURNING *`;
    const data = (await client.query(sql, [id])).rows;

    await client.query(`COMMIT`);

    return data;
  } catch (error) {
    await client.query(`ROLLBACK`);
    console.log(`deleteTaskByIdDB: ${error.message}`);
    return [];
  }
}

async function patchTasksByIdDB(id, userData) {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const firstSQL = `SELECT * FROM tasks WHERE id = $1`;
    const dataDB = (await client.query(firstSQL, [id])).rows;

    const newData = { ...dataDB[0], ...userData };

    const secondSQL = `UPDATE tasks 
        SET task = $1, user_id = $2
        WHERE id = $3
        RETURNING *`;
    const responseDatas = (await client.query(secondSQL, [newData.task, newData.user_id, id])).rows;

    await client.query(`COMMIT`);

    return responseDatas;
  } catch (error) {
    await client.query(`ROLLBACK`);
    console.log(`patchTasksByIdDB: ${error.message}`);

    return [];
  }
}

module.exports = { getAllTasksDB, getTaskByIdDB, postTasksCreateDB, putTasksUpdateDB, deleteTaskByIdDB, patchTasksByIdDB };
