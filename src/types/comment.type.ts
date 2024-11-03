import { User } from "@/types/auth.type";

export type Reply = {
  id: number;
  updateAt: string;
  createAt: string;
  content: string;
  user: User | null;
  anonymous: string | null;
};

export type CommentReponse = {
  id: number;
  updateAt: string;
  createAt: string;
  content: string;
  replies: Reply[];
  user: User | null;
  anonymous: string | null;
};
