import AuthBox from "@/app/(auth)/components/AuthBox";
import Feed from "./components/Feed";

const HomePage = () => {
  return (
    <div className="flex justify-center px-40">
      <div className="w-24"></div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <Feed />
        </div>
        <div className="col-span-1">
          <AuthBox />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
