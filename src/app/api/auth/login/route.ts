import { ApiError, apiErrorHandler } from "@/util/apiErrorHandler";
import { comparePassword } from "@/lib/comparePassword";
import { withConnection } from "@/util/server/serverUtill";
import { userProps } from "@/types/user";
import { RowDataPacket } from "mysql2";

import { NextRequest, NextResponse } from "next/server";

export type getUserDataProps = {
  id: number;
  user_id: string;
  name: string;
  role: userProps["role"];
  password: string;
  nick_name: string;
};

type LoginFormProps = {
  user_id: string;
  user_password: string;
};

export async function POST(req: NextRequest) {
  try {
    const userData: LoginFormProps = await req.json();
    const selectUser = await withConnection<getUserDataProps | null>(
      async (conn) => {
        const [row] = await conn.query<RowDataPacket[]>(
          "SELECT * FROM user where user_id =  ?;",
          [userData.user_id]
        );
        return row.length > 0 ? (row[0] as getUserDataProps) : null;
      }
    );

    //사용자가 없을떄
    if (!selectUser) {
      throw new ApiError("없는 사용자", 401);
    }
    //비밀번호 매치 확인
    await comparePassword(selectUser.password, userData.user_password);

    //비밀번호 걸러냄
    const { password: _, ...rest } = selectUser;
    return NextResponse.json({ ...rest });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
