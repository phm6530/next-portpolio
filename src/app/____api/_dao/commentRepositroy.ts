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
          rc.id as comment_id,
          rc.created_at as comment_created_at,
          rc.message as comment_message, 
          COALESCE(u.role, uv.role) as comment_user_role,  -- user 또는 anonymousr의 역할
          u.user_id as comment_user_id, 
          COALESCE(u.nick_name, uv.nick_name) as comment_user_nick,  -- user 또는 anonymous의 닉네임
          
          
          rr.id as reply_id,
		  rr.created_at as reply_created_at,
          rr.message as reply_message,
          COALESCE(ur.role, rv.role) as reply_user_role,  -- reply 작성자의 역할
          ur.user_id as reply_user_id, 
          COALESCE(ur.nick_name, rv.nick_name) as reply_user_nick -- reply 작성자의 닉네임
      
          
      FROM 
          result_comment as rc 
      LEFT JOIN 
          result_reply as rr ON rc.id = rr.comment_id
      LEFT JOIN 
          user u ON rc.user_id = u.id  -- user 테이블과 JOIN
      LEFT JOIN 
          anonymous_reply uv ON rc.anonymous_id = uv.id  -- anonymous_reply 테이블과 JOIN
      LEFT JOIN 
          user ur ON rr.user_id = ur.id  -- reply의 user JOIN
      LEFT JOIN 
          anonymous_reply rv ON rr.anonymous_id = rv.id  -- reply의 익명 사용자 JOIN
          
      WHERE 
          rc.template_id = ?;
  `;

  const [rows] = await conn.query<RowDataPacket[]>(sql, [templateId]);
  return rows;
}
