import { PoolConnection, RowDataPacket } from "mysql2/promise";

export async function selectResultDetail(
  conn: PoolConnection,
  templateId: string
) {
  const sql = `
    SELECT 
      sq.id as question_id,
      sq.question_type_id as type,
      sq.label as question,
      sq.template_meta_id as template_id,
      so.idx as option_idx,
      so.label as option_label,
      so.option_pictrue,
      COUNT(sa.participants_id) as total_participants,
      SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 10 THEN 1 ELSE 0 END) as male_10s,
      SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 20 THEN 1 ELSE 0 END) as male_20s,
      SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 30 THEN 1 ELSE 0 END) as male_30s,
      SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 40 THEN 1 ELSE 0 END) as male_40s,
      SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 50 THEN 1 ELSE 0 END) as male_50s,
      SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 60 THEN 1 ELSE 0 END) as male_60s,
      SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 10 THEN 1 ELSE 0 END) as female_10s,
      SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 20 THEN 1 ELSE 0 END) as female_20s,
      SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 30 THEN 1 ELSE 0 END) as female_30s,
      SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 40 THEN 1 ELSE 0 END) as female_40s,
      SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 50 THEN 1 ELSE 0 END) as female_50s,
      SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 60 THEN 1 ELSE 0 END) as female_60s
    FROM 
        survey_question as sq
    JOIN
        survey_options as so
    ON
        sq.id = so.question_id
    LEFT JOIN
        survey_answers as sa
    ON
        sq.id = sa.question_id AND sa.answer_value = so.label -- answer_value와 option_label을 매칭
    LEFT JOIN
        participants_recodes as pr
    ON
        sa.participants_id = pr.id
    WHERE 
        sq.template_meta_id = ?
    GROUP BY 
        sq.id, sq.question_type_id, sq.label, sq.template_meta_id, so.idx, so.label, so.option_pictrue
    ORDER BY 
        sq.id, so.idx;
  `;
  const [rows] = await conn.query<RowDataPacket[]>(sql, [templateId]);
  return rows;
}
