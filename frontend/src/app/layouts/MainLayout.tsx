import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
