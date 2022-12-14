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

const TokenGenerator = async (IdUsers?: number) => {
  const newToken = randomUUID();
  if (IdUsers){
    await db.query(
      "UPDATE scienticevent.users \
      SET Token = ?  \
      WHERE IdUsers = ?",
      [newToken, IdUsers]
    );
    await db.end();
  }

  return newToken;
};

interface getUserProps {
  email: string;
  password: string;
  username?: string;
  isAdmin?: boolean;
}

interface getUserResults {
  IdUsers: number;
  Username: string;
  UserPassword: string;
  Email: string;
  IsAdmin: boolean;
  Token: string;
}

const getUsers = async () => {
  const results = await db.query("SELECT * FROM scienticevent.users");
  await db.end();
};

const getUserByEmail = async (email: string) => {
  const results: getUserResults = JSON.parse(
    JSON.stringify(
      await db.query(
        "SELECT * FROM scienticevent.users \
   WHERE Email = ?;",
        [email]
      )
    )
  )[0];
  await db.end();

  return results
}

const loginToUser = async (props: getUserProps) => {
  const results = await getUserByEmail(props.email)

  if (!(results?.UserPassword == props.password)) { return null; }

  const generatedToken = await TokenGenerator(results.IdUsers);

  return { Token: generatedToken, };
};


const registerUser = async (props: getUserProps) => {
  if(await getUserByEmail(props.email)) { return false; }
  const UserToken = await TokenGenerator()

  if(await db.query(
    "INSERT INTO scienticevent.users(Username, Email, UserPassword, Token, IsAdmin)\
    VALUES (?, ?, ?, ?, ?)", [props.username, props.email, props.password, UserToken, props.isAdmin]
    )) {
      await db.end()
      return UserToken
    }
}

export { getUsers, loginToUser, registerUser };
