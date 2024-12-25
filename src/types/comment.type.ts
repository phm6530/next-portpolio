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
