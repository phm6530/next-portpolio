export enum CONST_PAGING {
  LIMIT = 12,
}

export enum QUERY_STRING {
  SORT = "sort",
  PAGE = "page",
  SEARCH = "search",
}

export enum QUERY_KEY {
  USER_DATA = "userdata",
  TEMPLATE_LIST = "template_list",
  TEMPLATE_RESULT_USER_ADMIN = "anonymous",
  SURVEY_RESULTS = "surveyResult",
  QUESTION_TEXT = "questionText",
  COMMENTS = "comments",
  UNSPLASH = "unspalsh",

  //
  MY_CONTENTS = "my_contents",
}

export enum NEXTAUTH_ID {
  CREDENTIALS = "credentials",
  ANONYMOUS = "anonymous",
}

export enum AUTH {
  ACCESS_TOKEN = "ACCESS_TOKEN",
}

export enum REQUEST_METHOD {
  DELETE = "DELETE",
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
}
