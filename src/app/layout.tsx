import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/sidebar";
import Topbar from "../components/layout/topbar";

export default function Layout() {
  return (
    // <div className="flex h-screen bg-background text-foreground">
    <div className="flex h-screen flex-col md:flex-row bg-background">
      <Sidebar />
      {/* <div className="flex-1 flex flex-col"> */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        {/* <main className="flex-1 overflow-auto"> */}
        <main className="flex-1 overflow-y-auto p-3 md:p-6">

          <Outlet />
        </main>
      </div>
    </div>
  );
}
