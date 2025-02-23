import { User, USER_ROLE } from "@/types/auth.type";

export type CommentReponse = {
  id: number;
  updateAt: string;
  createdAt: string;
  content: string;
  replies: CommentReponse[];
  user: User | null;
  anonymous: string | null;
  creator: {
    role: USER_ROLE;
    nickname: string;
  } & { email?: string };
};

export enum MSG_TYPE {
  COMMENT = "comment",
  REPLY = "reply",
}

export enum MSG_PARAM_PATH {
  TEMPLATE = "template",
  BOARD = "board",
}
