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

type User = {
  // user의 구조를 정의, 현재는 null이므로 필요한 경우 나중에 채울 수 있음
};
