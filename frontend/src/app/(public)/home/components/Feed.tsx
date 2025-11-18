import React, { useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Post from "@/app/(public)/Post/Post";
import { usePostStore } from "../../../../../store/post/postStore";

const Feed = () => {
  const { posts, fetchPosts, loading } = usePostStore();

  useEffect(() => {
    fetchPosts(1); // load trang đầu tiên
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="my-3 text-lg font-semibold text-gray-800">For you</div>

      <div className="flex flex-col w-full h-screen border-x border-t border-gray-300 bg-white rounded-t-2xl shadow-sm overflow-y-auto no-scrollbar mb-4">
        {/* ô post status */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200">
          <Avatar className="flex items-center justify-center w-10 h-10 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>

          <div className="flex-1 cursor-text">
            <span className="text-lg font-normal text-gray-500">
              Bạn đang nghĩ gì?
            </span>
          </div>

          <div className="flex items-center justify-center font-semibold border border-gray-400 rounded-[9px] px-5 py-1 cursor-pointer hover:bg-gray-100 transition">
            Post
          </div>
        </div>

        {/* danh sách bài viết */}
        <div className="max-w-full">
          {loading ? (
            <div className="text-center py-4 text-gray-500">Đang tải...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-4 text-gray-400">Không có bài viết nào.</div>
          ) : (
            posts.map((post) => <Post key={post._id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
