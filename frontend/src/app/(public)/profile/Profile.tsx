import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Post from "@/app/(public)/Post/Post";
import type { PostType } from "@/app/types/Post";

const mockPosts: PostType[] = [
  {
    _id: "1",
    user: {
      name: "tcues.billiard",
      username: "tcues.billiard",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    content: "Cách để khiến thằng Bờ của bạn từ bỏ Game 🤣",
    image:
      "https://cdn.dribbble.com/users/1162077/screenshots/15573235/media/d1b4b3cfbcf04a20e88c7cb6b4c4a4a8.png",
    createdAt: "19h",
    stats: { likes: 779, comments: 52, reposts: 4, shares: 31 },
  },
  {
    _id: "2",
    user: {
      name: "vicky_review",
      username: "vicky_review",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    content: "Khi bạn đi làm mà cạn phước kiểu 😭",
    image:
      "https://cdn.dribbble.com/users/5276/screenshots/17279600/media/a32e0b52a843a2c9d6c2d68f705f87b0.png",
    createdAt: "1d",
    stats: { likes: 1254, comments: 87, reposts: 12, shares: 40 },
  },
  {
    _id: "3",
    user: {
      name: "linh.dev",
      username: "linh_dev",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    content:
      "Vừa deploy xong project social app ✨ Dùng React + Node + MongoDB. Cảm giác phê vl 🤓",
    image:
      "https://cdn.dribbble.com/users/248641/screenshots/17333212/media/13244f89a09df54ee5a57e98696a0b4b.png",
    createdAt: "2d",
    stats: { likes: 980, comments: 112, reposts: 33, shares: 12 },
  },
  {
    _id: "4",
    user: {
      name: "frontend_daily",
      username: "frontend_daily",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    content:
      "✨ UI tip: Giữ consistent spacing và color tone giúp feed nhìn mượt và chuyên nghiệp hơn!",
    image:
      "https://cdn.dribbble.com/userupload/12006326/file/original-e7b2e55a7b7f4cb947bf1f4e8b5a7409.png",
    createdAt: "3d",
    stats: { likes: 654, comments: 29, reposts: 11, shares: 18 },
  },
  {
    _id: "5",
    user: {
      name: "frontend_daily",
      username: "frontend_daily",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    content:
      "✨ UI tip: Giữ consistent spacing và color tone giúp feed nhìn mượt và chuyên nghiệp hơn!",
    image:
      "https://cdn.dribbble.com/userupload/12006326/file/original-e7b2e55a7b7f4cb947bf1f4e8b5a7409.png",
    createdAt: "3d",
    stats: { likes: 654, comments: 29, reposts: 11, shares: 18 },
  },
  {
    _id: "6",
    user: {
      name: "frontend_daily",
      username: "frontend_daily",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    content:
      "✨ UI tip: Giữ consistent spacing và color tone giúp feed nhìn mượt và chuyên nghiệp hơn!",
    image:
      "https://cdn.dribbble.com/userupload/12006326/file/original-e7b2e55a7b7f4cb947bf1f4e8b5a7409.png",
    createdAt: "3d",
    stats: { likes: 654, comments: 29, reposts: 11, shares: 18 },
  },
];

const Feed = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="my-3 text-lg font-semibold text-gray-800">For you</div>
      <div className="flex flex-col w-full h-screen border-x border-t border-gray-300 bg-white rounded-t-2xl shadow-sm overflow-y-auto no-scrollbar mb-4">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 ">
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
        <div className="max-w-full">
          {mockPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
