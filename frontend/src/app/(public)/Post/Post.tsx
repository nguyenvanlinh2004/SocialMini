import type { Post } from "../../../../store/post/post.types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

type PostProps = {
  post: Post;
};

export default function Post({ post }: PostProps) {
  return (
    <div className="border-b w-full border-gray-300 px-6 py-3 cursor-pointer">
      <div className="flex gap-3">
        {/* avatar */}
        <Avatar className="flex-none my-1">
          <AvatarImage src={post.userId.avatarUrl} />
        </Avatar>

        <div className="w-full">
          {/* tên + thời gian */}
          <div className="mb-3 overflow-hidden">
            <div className="flex justify-between gap-3">
              <div>
                <span className="font-semibold hover:underline">
                  {post.userId.displayName}
                </span>

                <span className="text-[#999999] ml-2">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="w-10 flex justify-end">
                <button className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* nội dung */}
            <span>{post.content}</span>

            {/* ảnh */}
            {post.imageUrl?.length > 0 && (
              <img
                src={post.imageUrl[0]}
                alt="post image"
                className="mt-2 rounded-lg max-h-96 object-cover"
              />
            )}
          </div>

          {/* Like + Comment */}
          <div className="flex gap-6">
            <div className="flex p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
              <Heart className="w-5 h-5" />
              <span className="mx-1">{post.likes.length}</span>
            </div>

            <div className="flex p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
              <MessageCircle className="w-5 h-5" />
              <span className="mx-1">2131</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
