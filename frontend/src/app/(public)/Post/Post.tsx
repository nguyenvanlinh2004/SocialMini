import type { PostType } from "@/app/types/Post";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  return (
    <div className="border-b w-full border-gray-300 px-6 py-3 cursor-pointer">
      <div className="flex gap-3">
        {/* avatar */}
        <Avatar className="flex-none my-1">
          <AvatarImage src={post.user.avatar} />
        </Avatar>
        <div className="w-full">
          {/* ten, noi dung */}
          <div className="mb-3 overflow-hidden">
            <div className="flex justify-between gap-3">
              <div>
                <span className="font-semibold hover:underline">
                  {post.user.name}{" "}
                </span>
                <span className="text-[#999999]">
                  {post.createdAt.toString()}
                </span>
              </div>
              <div className="w-10 flex justify-end">
                <button className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
            <span>{post.content}</span>
            <img src={post.user.avatar} alt="asdadsa" />
          </div>
          {/* button */}
          <div className="">
            <div className="flex gap-6">
              <div className="flex p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 ">
                <Heart />
                <span className="mx-1">{post.stats.likes}</span>
              </div>
              <div className="flex p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                <MessageCircle />
                <span className="mx-1">2131</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
