var oracledb = require("oracledb");

var connAttrs = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

async function connect(consulta) {
  console.log(consulta);
  let conn;

  try {
    conn = await oracledb.getConnection(connAttrs);
    let result = await conn.execute(
      consulta,
      [], // no binds
      {
        outFormat: oracledb.OBJECT,
      }
    );

    console.log(result.rows);
    return {"status":200,"data":result.rows};
  } catch (error) {
      return {"status":400,"message":error.message}
  }
}

module.exports = {
  connect,
};
