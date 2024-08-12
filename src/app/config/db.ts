import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

export const dbConnectTest = async () => {
  try {
    const db = await pool.getConnection();
    console.log("연결완료");
    db.release();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export default pool;
