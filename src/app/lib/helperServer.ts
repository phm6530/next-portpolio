import pool from "@/app/config/db";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { PoolConnection } from "mysql2/promise";
import { NextResponse } from "next/server";

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

//server Controller 보일러 플레이트
export const withRequest = async (cb: () => Promise<any>) => {
  try {
    const result = await cb();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
};
