import { Button } from "@/app/(shared)/components/ui/button";

const AuthBox = () => {
  return (
    <div className=" w-full h-auto mt-13">
      <div className="flex flex-col items-center px-6 pt-8 pb-7 bg-gray-300 border border-gray-400 rounded-2xl">
        <span className="text-xl font-semibold mb-2 text-center">
          Login or signup for Mute
        </span>
        <span className="text-center">
          See what people are taking about and join the conversation
        </span>
        <div className=" flex gap-3 my-3">
          <Button className="">Sign in</Button>
          <Button>Sign Up</Button>
        </div>
        <span>Login with your username</span>
      </div>
    </div>
  );
};

export default AuthBox;
