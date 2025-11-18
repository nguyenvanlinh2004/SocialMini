import axiosClient from "../../api/axiosClient";

// Lấy token từ localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postService = {
  async fetchPosts(page: number = 1) {
    const res = await axiosClient.get(`/posts?page=${page}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  },

  async getPostById(postId: string) {
    const res = await axiosClient.get(`/posts/${postId}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  },

  async createPost(formData: FormData) {
    const res = await axiosClient.post(`/posts`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  async toggleLike(postId: string) {
    const res = await axiosClient.post(`/posts/${postId}/like`, null, {
      headers: getAuthHeader(),
    });
    return res.data;
  },

  async deletePost(postId: string) {
    const res = await axiosClient.delete(`/posts/${postId}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  },
};
