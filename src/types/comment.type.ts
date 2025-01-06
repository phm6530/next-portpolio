import { User, USER_ROLE } from "@/types/auth.type";

export type CommentReponse = {
  id: number;
  updateAt: string;
  createAt: string;
  content: string;
  replies: CommentReponse[];
  user: User | null;
  anonymous: string | null;
  creator: {
    role: USER_ROLE;
    nickname: string;
  } & { email?: string };
};

export enum COMMENT_EDITOR_TYPE {
  COMMENT = "comment",
  REPLY = "reply",
}

export enum COMMENT_NEED_PATH {
  TEMPLATE = "template",
  BOARD = "board",
}
