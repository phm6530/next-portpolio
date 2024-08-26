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
        tm.id, 
        tm.title,
        tm.description,
        tm.created_at,
        tm.template_key,
        COALESCE(umt.user_id , "anonymous") as user_id,
        COALESCE(user.role , "anonymous") as user_role,
        COALESCE(user.nick_name , "anonymous") as user_nickname,
        t.template AS template,
        pr_stats.age_group,
        pr_stats.gender as gender_group,
        COALESCE(pr_stats.total_cnt, 0) as user_cnt,
        tm.start_date ,
        tm.end_date,
        tm.thumbnail
    FROM 
        template_meta tm
    JOIN 
        template t ON tm.template_type_id = t.id
	LEFT JOIN
		user_made_template umt ON umt.template_id = tm.id
	LEFT JOIN user ON user.user_id = umt.user_id
    LEFT JOIN (
        SELECT 
            pr.template_id,
            pr.age_group,
            pr.gender,
            (SELECT COUNT(*) FROM participants_recodes WHERE template_id = pr.template_id) AS total_cnt,
            ROW_NUMBER() OVER (PARTITION BY pr.template_id ORDER BY COUNT(*) DESC) AS rn
        FROM 
            participants_recodes pr
        GROUP BY 
            pr.template_id, pr.age_group, pr.gender
    ) pr_stats ON tm.id = pr_stats.template_id AND pr_stats.rn = 1 
    WHERE tm.title LIKE ?
  `;

  const [rows] = await conn.query<RowDataPacket[]>(sql, [templateId]);
  return rows;
}
