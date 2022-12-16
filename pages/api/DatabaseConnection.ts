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
db.query("USE scientificevent")

const TokenGenerator = async (IdUsers?: number) => {
  const newToken = randomUUID();
  if (IdUsers){
    await db.query(
      "UPDATE users \
      SET Token = ?  \
      WHERE IdUsers = ?",
      [newToken, IdUsers]
    );
    await db.end();
  }

  return newToken;
};

interface UserProps {
  email: string;
  password: string;
  username?: string;
  isAdmin?: boolean;
}

interface UserResults {
  IdUsers: number;
  Username: string;
  UserPassword: string;
  Email: string;
  IsAdmin: boolean;
  Token: string;
}

const getUsers = async () => {
  const results = await db.query("SELECT * FROM users");
  await db.end();
};

const getUserByToken = async (token: string) => {
  const results: UserResults = JSON.parse(
    JSON.stringify(
      await db.query(
        "SELECT * FROM users \
        WHERE Token = ?", [token])
    )
  )[0];
  await db.end()

  return results
}

const getUserByEmail = async (email: string) => {
  const results: UserResults = JSON.parse(
    JSON.stringify(
      await db.query(
        "SELECT * FROM users \
   WHERE Email = ?;",
        [email]
      )
    )
  )[0];
  await db.end();

  return results
}

const loginToUser = async (props: UserProps) => {
  const results = await getUserByEmail(props.email)

  if (!(results?.UserPassword == props.password)) { return null; }

  const generatedToken = await TokenGenerator(results.IdUsers);

  return { Token: generatedToken, };
};


const registerUser = async (props: UserProps) => {
  if(await getUserByEmail(props.email)) { return false; }
  const UserToken = await TokenGenerator()

  await db.query(
    "INSERT INTO users(Username, Email, UserPassword, Token, IsAdmin)\
    VALUES (?, ?, ?, ?, ?)", [props.username, props.email, props.password, UserToken, props.isAdmin]
    )
  await db.end();
  return UserToken;
};

interface ArticleProps {
  articleTitle: string;
  articleContent: string;
  defAllowed: boolean;
  IdUsers: string;
}

const addNewArticle = async (props: ArticleProps) => {
  await db.query(
    "INSERT INTO articles(Title, Content, Allowed, User_ID) VALUES (?, ?, ?, ?)",
    [props.articleTitle, props.articleContent, props.defAllowed, props.IdUsers]
    )
  await db.end()
}

interface ArticleFilter {
  IdUsers?: number;
  allowed?: boolean;
  title?: string;
}

const getArticles = async (props: ArticleFilter) => {
  
}

export { getUsers, loginToUser, registerUser, getUserByToken, addNewArticle };
