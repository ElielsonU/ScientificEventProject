import serverlessMysql from "serverless-mysql";
import { randomUUID } from "crypto";

const db = serverlessMysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
  },
});

const getUsers = async () => {
  const results = await db.query("SELECT * FROM scienticevent.users");

  await db.end();
};

const TokenGenerator = async (IdUsers: number) => {
  const newToken = randomUUID();

  await db.query(
    "UPDATE scienticevent.users \
    SET Token = ?  \
    WHERE IdUsers = ?",
    [newToken, IdUsers]
  );
  await db.end();

  return newToken;
};

interface getUserProps {
  email: string;
  password: string;
}

interface getUserResults {
  IdUsers: number;
  Username: string;
  UserPassword: string;
  Email: string;
  IsAdmin: boolean;
  Token: string;
}

const loginToUser = async (props: getUserProps) => {
  const results: getUserResults = JSON.parse(
    JSON.stringify(
      await db.query(
        "SELECT * FROM scienticevent.users \
   WHERE Email = ?;",
        [props.email]
      )
    )
  )[0];
  await db.end();
  if (!(results?.UserPassword == props.password)) {
    return null;
  }
  const generatedToken = await TokenGenerator(results.IdUsers);

  return {
    Token: generatedToken,
  };
};



export { getUsers, loginToUser };
