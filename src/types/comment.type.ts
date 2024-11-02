import { User } from "@/types/auth.type";

type Reply = {
  id: number;
  updateAt: string;
  createAt: string;
  reply: string;
  user: User | null;
  anonymous: string | null;
};

type CommentReponse = {
  id: number;
  updateAt: string;
  createAt: string;
  comment: string;
  replies: Reply[];
  user: User | null;
  anonymous: string | null;
};
