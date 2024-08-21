import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 300, // 동시 연결을 처리하기 위해 connectionLimit을 50으로 증가
  waitForConnections: true, // 연결이 가득 찬 경우 대기하도록 설정
  idleTimeout: 0, // 1분(60초) 이상 유휴 상태일 때 연결 해제
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
