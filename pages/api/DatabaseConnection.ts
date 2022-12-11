import serverlessMysql from "serverless-mysql";

const db = serverlessMysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER
  }
})

const getUsers = async () => {
  const results = await db.query("select * from users")
  await db.end()
  console.log(results)
}

export {getUsers}