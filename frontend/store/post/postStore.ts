import { create } from "zustand";
import { createPostActions } from "../post/postAction";

export interface PostStoreState {
  posts: any[];
  totalPages: number;
  currentPage: number;
  loading: boolean;

  fetchPosts: (page?: number) => Promise<void>;
  getPostById: (postId: string) => Promise<any>;
  createPost: (formData: FormData) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

export const usePostStore = create<PostStoreState>((set, get) => ({
  posts: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,

  // gắn action
  ...createPostActions(set, get),
}));
