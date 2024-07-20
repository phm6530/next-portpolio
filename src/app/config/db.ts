import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "zlahdzl12!",
  database: "",
});

export default pool;
