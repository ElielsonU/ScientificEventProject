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
db.query("USE scientificevent");
db.end();

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

interface UserFilters {
  token?: string;
  email?: string;
}

const getUsers = async (props: UserFilters) => {
  const query = "SELECT * FROM users"
  if (!props.token && !props.email){
    const results = JSON.parse(
      JSON.stringify(
        await db.query(query)
      )
    );
    await db.end();
    return results
  }

  const results = JSON.parse(JSON.stringify(
    props.email 
    ?await db.query(
      "SELECT * FROM users \
      WHERE Email = ?;",
      [props.email]
      )
    :await db.query(
      "SELECT * FROM users \
      WHERE Token = ?", [props.token]
      )
    )
  )[0];
  await db.end();
  return results;
};

const loginToUser = async (props: UserProps) => {
  const results = await getUsers({email: props.email})

  if (!(results?.UserPassword == props.password)) { return null; }

  const generatedToken = await TokenGenerator(results.IdUsers);

  return { Token: generatedToken, };
};


const registerUser = async (props: UserProps) => {
  if(await getUsers({email: props.email})) { return false; }
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
  let query = "SELECT * FROM articles WHERE "
  if (!props.IdUsers) {
    query += `Allowed = ${!!props.allowed}`
    query += props.title ? ` AND Title LIKE '%${props.title}%' ` : ""
    const res = JSON.parse(JSON.stringify(await db.query(query)));
    db.end();
    return res;
  }

  if (props.IdUsers) { query += `User_ID = ${props.IdUsers} ` }
  if (props.title) { 
    query += props.IdUsers
    ?`AND Title LIKE '%${props.title}%' `
    :`Title LIKE '%${props.title}%' `
  }
  query += props.IdUsers || props.title
  ?`AND Allowed = ${!!props.allowed}`
  :`Allowed = ${!!props.allowed}`
  const res = JSON.parse(JSON.stringify(await db.query(query)));
  db.end();

  return res;
}

export { getUsers, loginToUser, registerUser, addNewArticle, getArticles };
