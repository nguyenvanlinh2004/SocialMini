import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(125%_125%_at_50%_90%,_#fff_40%,_#475569_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_90%,_#1e293b_40%,_#000_100%)]">
      <Outlet />
    </div>
  );
}
