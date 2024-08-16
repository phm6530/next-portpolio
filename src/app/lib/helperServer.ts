import pool from "@/app/config/db";
import { PoolConnection } from "mysql2/promise";

//트랜잭션 생성
export const withTransaction = async <T>(
  callback: (conn: PoolConnection) => Promise<T>
): Promise<T> => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const result = await callback(conn);
    await conn.commit();
    return result;
  } catch (error) {
    // console.error("Transaction failed: ", error);
    if (conn) await conn.rollback();
    throw error;
  } finally {
    if (conn) conn.release();
  }
};

//단일
export const withConnection = async <T>(
  callback: (conn: PoolConnection) => Promise<T>
): Promise<T> => {
  const conn = await pool.getConnection();
  try {
    return callback(conn);
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.release();
  }
};
