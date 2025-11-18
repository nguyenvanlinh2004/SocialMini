import { postService } from "../post/postService";
import type { PostStoreState } from "../post/postStore";

export const createPostActions = (
  set: (partial: Partial<PostStoreState>) => void,
  get: () => PostStoreState
) => ({
  fetchPosts: async (page = 1) => {
    set({ loading: true });

    const data = await postService.fetchPosts(page);

    set({
      posts: data.posts,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      loading: false,
    });
  },

  getPostById: async (postId: string) => {
    const data = await postService.getPostById(postId);
    return data;
  },

  createPost: async (formData: FormData) => {
    const newPost = await postService.createPost(formData);

    set({
      posts: [newPost, ...get().posts],
    });
  },

  toggleLike: async (postId: string) => {
    const data = await postService.toggleLike(postId);

    // cập nhật lại ví trí post trong store
    set({
      posts: get().posts.map((p) =>
        p._id === postId
          ? {
              ...p,
              likes: data.liked
                ? [...p.likes, "placeholder"]
                : p.likes.slice(0, p.likes.length - 1),
            }
          : p
      ),
    });
  },

  deletePost: async (postId: string) => {
    await postService.deletePost(postId);

    set({
      posts: get().posts.filter((p) => p._id !== postId),
    });
  },
});
