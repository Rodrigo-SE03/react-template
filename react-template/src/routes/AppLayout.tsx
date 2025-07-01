import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import clsx from "clsx";

const AppLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <main
          className={clsx(
            "flex-1 transition-all duration-300 p-4 pt-16 mt-4 overflow-y-auto w-full",
            isSidebarOpen && "md:pl-[250px]"
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;