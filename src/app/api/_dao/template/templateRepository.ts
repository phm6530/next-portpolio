import { bcryptHash } from "@/app/lib/brycptHash";
import { CONST_PAGING, LIST_SORT } from "@/types/constans";
import { SelectTEmplateDetailProps } from "@/types/template";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export const insertAnonymous = async (
  conn: PoolConnection,
  accessEmail: string,
  accessEmailAgreed: boolean,
  pin: number,
  template_id: number
) => {
  const sql = `
    INSERT INTO 
      user_anonymous(access_email , access_email_agreed, access_pin , template_id) 
    VALUE(? , ? , ? , ?);
  `;
  const hashPin = await bcryptHash(pin + "");

  //이메일 + 이메일 동의 유무 , PIN 값
  const [result] = await conn.query<ResultSetHeader>(sql, [
    accessEmail,
    accessEmailAgreed,
    hashPin,
    template_id,
  ]);

  return result;
};

//Meta Data Post
export const insertTemplateMeta = async (
  conn: PoolConnection,
  data: Omit<AddSurveyFormProps, "items" | "dateRange"> & {
    template_type_id: number;
    template_key: string;
    dateRange: string[] | null;
  }
): Promise<ResultSetHeader> => {
  //data
  const {
    description,
    title,
    template_type_id,
    template_key,
    genderChk,
    ageChk,
    dateRange,
    thumbnail,
  } = data;

  const parmas = [
    description,
    title,
    template_type_id,
    template_key,
    genderChk,
    ageChk,
  ];

  let values = "";
  let column = "";

  if (dateRange !== null) {
    column = `title , description , template_type_id , created_at , template_key , gender_chk , age_chk ,start_date , end_date`;
    values = `(?,?,?,now(), ?, ? , ? , ? , ?) `;
    parmas.push(dateRange[0], dateRange[1]);
  } else {
    column = `title , description , template_type_id , created_at , template_key , gender_chk , age_chk `;
    values = `(?,?,?,now(), ?, ? , ?)`;
  }

  if (!!thumbnail) {
    column += `, thumbnail`; //썸네일 있으면 추가
    values = values.replace("?)", "?, ?)"); // 파라미터 리스트에 thumbnail 추가
    parmas.push(thumbnail);
  }

  const insert_sql = `
    INSERT INTO
        template_meta(${column}) 
    VALUE 
        ${values};`;

  const [result] = await conn.execute<ResultSetHeader>(insert_sql, parmas);

  return result;
};

//true
type TruePageNation = {
  offset?: number;
};

//false
type FalsePageNation = {
  template_id?: number;
};

//Meta
type GetTemplateMeta = {
  conn: PoolConnection;
  usePagination: boolean;
};

export const selectTemplateMetaData = async (
  props: GetTemplateMeta & (TruePageNation | FalsePageNation),
  search?: string | null,
  sort?: string | null
): Promise<SelectTEmplateDetailProps[] | SelectTEmplateDetailProps> => {
  const { conn, usePagination } = props;

  let sql = `
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

  let queryParams: (number | string | undefined)[] = [`%${search || ""}%`];

  //list Get인지  Detail GEt인지 유무
  if (usePagination) {
    const { offset = 0 } = props as TruePageNation;
    const limit = CONST_PAGING.LIMIT;

    // 성별 정렬 조건
    if (sort === LIST_SORT.FEMALE || sort === LIST_SORT.MALE) {
      const genderOrder =
        sort === LIST_SORT.FEMALE
          ? [LIST_SORT.FEMALE, LIST_SORT.MALE]
          : [LIST_SORT.MALE, LIST_SORT.FEMALE];

      sql += `
        ORDER BY 
          CASE 
            WHEN pr_stats.gender = '${genderOrder[0]}' THEN 1
            WHEN pr_stats.gender = '${genderOrder[1]}' THEN 2
            ELSE 3
          END,
          pr_stats.total_cnt DESC
        LIMIT ? OFFSET ?;
      `;
    } else if (sort === LIST_SORT.USER) {
      // 사용자 순
      sql += "ORDER BY pr_stats.total_cnt DESC LIMIT ? OFFSET ?;";
    } else {
      sql += ` ORDER BY tm.id DESC LIMIT ? OFFSET ?`;
    }
    //push
    queryParams.push(limit, offset);
  } else {
    const { template_id } = props as FalsePageNation;

    if (template_id) {
      sql += ` AND tm.id = ?`;
      queryParams.push(template_id);
    }
  }

  const [rows] = await conn.query<RowDataPacket[]>(sql, queryParams);

  return usePagination
    ? (rows as SelectTEmplateDetailProps[])
    : (rows[0] as SelectTEmplateDetailProps);
};

//Detail Return;
export const selectTemlateDetail = async (
  conn: PoolConnection,
  page: string
): Promise<RowDataPacket[]> => {
  const sql = `
    SELECT 
      tm.id,
      tm.title,
      tm.description,
      t.template,
      tm.gender_chk,
      tm.age_chk,
      COALESCE(user.nick_name , 'anonymous') as user_nickname,
      COALESCE(user.user_id , 'anonymous') as user_id,
	    COALESCE(user.role, 'anonymous') as user_role,
      tm.thumbnail,
      tm.created_at,
      sq.id AS question_id,
      sq.question_type_id,
      sq.label AS question_label,
      sq.text_picture,
      so.id AS option_id,
      so.idx AS option_idx,
      so.label AS option_label,
      so.value AS option_value,
      so.option_pictrue,
      tm.start_date,
      tm.end_date
    FROM 
        template_meta tm
    JOIN 
        template t ON tm.template_type_id = t.id
    LEFT JOIN 
        survey_question sq ON sq.template_meta_id = tm.id
    LEFT JOIN 
        survey_options so ON so.question_id = sq.id
	LEFT JOIN 
		user_anonymous ua ON ua.template_id = tm.id
	LEFT JOIN user_made_template umt ON umt.template_id = tm.id
    LEFT JOIN user ON umt.user_id = user.user_id
    WHERE 
        tm.id = ?
    ORDER BY 
        sq.id, so.idx;
    `;

  const [rows] = await conn.query<RowDataPacket[]>(sql, [page]);
  return rows;
};

//getDetail 사용자 수
export async function selectTotalCnt(
  conn: PoolConnection,
  id: string
): Promise<RowDataPacket> {
  const sql = `SELECT COUNT(*) as user_cnt FROM participants_recodes WHERE template_id = ?`;
  const [rows] = await conn.query<RowDataPacket[]>(sql, [id]);
  return rows[0];
}

//Detail Template 결과
export async function selectTemplateResult(
  conn: PoolConnection,
  templateId: string
) {
  const sql = `
SELECT 
    sq.id as question_id,
    sq.question_type_id as type,
    sq.label as question,
    sa.answer_value as text_answer,
    so.label as option_label,
    so.idx as option_idx,
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
    LEFT JOIN
        survey_options as so
    ON
        sq.id = so.question_id AND sq.question_type_id != 'text' -- 객관식일 때만 옵션 조인
    LEFT JOIN
        survey_answers as sa
    ON
        sq.id = sa.question_id AND (sa.answer_value = so.label OR sq.question_type_id = 'text') -- text 타입은 그대로 매칭
    LEFT JOIN
        participants_recodes as pr
    ON
        sa.participants_id = pr.id
    WHERE 
        sq.template_meta_id = ?
    GROUP BY 
        sq.id, sq.question_type_id, sq.label, sq.template_meta_id, so.idx, so.option_pictrue , sa.answer_value  , so.label
    ORDER BY 
        sq.id, so.idx;
  `;
  const [rows] = await conn.query<RowDataPacket[]>(sql, [templateId]);
  return rows;
}
