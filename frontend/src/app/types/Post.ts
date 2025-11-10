export type UserType = {
  _id?: string;
  name: string;
  username?: string;
  avatar?: string;
};

export type PostStats = {
  likes: number;
  comments: number;
  reposts: number;
  shares: number;
};

export type PostType = {
  _id?: string;
  user: UserType;
  content: string;
  image?: string;
  createdAt: string | Date;
  stats: PostStats;
};
