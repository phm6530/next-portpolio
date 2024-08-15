import { PoolConnection, RowDataPacket } from "mysql2/promise";

export default async function selectCommentList({
  conn,
  templateId,
}: {
  conn: PoolConnection;
  templateId: number;
}) {
  const sql = `
    SELECT 
      rc.id as  comment_id,
        rc.created_at as comment_created_at,
        rc.message as comment, 
        rc.user_id as comment_user, 
        rr.id as reply_id,
        rr.message as reply_message,
        rr.user_id as reply_user,
        rr.created_at as reply_created_at
        
    FROM 
      result_comment as rc 
    LEFT JOIN 
      result_reply as rr 
    ON 
      rc.id = rr.comment_id
    where 
      rc.template_id = ?
  `;

  const [rows] = await conn.query<RowDataPacket[]>(sql, [templateId]);
  return rows;
}
