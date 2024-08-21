import { ApiError } from "@/app/lib/apiErrorHandler";
import { withConnection, withRequest } from "@/app/lib/helperServer";
import { compare } from "bcrypt";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { pin, template_key } = await req.json();

  return withRequest(async () => {
    const { access_pin, access_email } = await withConnection(async (conn) => {
      const sql = `          
          SELECT access_pin , access_email FROM template_meta tm 
              JOIN 
                user_anonymous ua 
              ON 
              ua.template_id = tm.id
              where tm.template_key = ?;
            `;

      const [rows] = await conn.query<RowDataPacket[]>(sql, [template_key]);

      return rows[0];
    });

    const match = await compare(pin, access_pin);
    if (!match) throw new ApiError("인증번호가 일치하지 않습니다", 401);

    return { template_key, access_email };
  });
}
