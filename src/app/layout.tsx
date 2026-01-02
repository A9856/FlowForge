import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/sidebar";
import Topbar from "../components/layout/topbar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
