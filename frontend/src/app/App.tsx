import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routers/routesConfig";

function App() {
  return (
    <div className="min-h-screen w-full relative bg-[radial-gradient(125%_125%_at_50%_90%,_#fff_40%,_#475569_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_90%,_#1e293b_40%,_#000_100%)]">
      <Toaster richColors />
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
