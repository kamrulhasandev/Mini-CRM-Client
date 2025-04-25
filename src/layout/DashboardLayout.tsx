import { Outlet } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <button
        className="md:hidden fixed top-4 left-4 z-40"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <IoIosArrowForward className="w-6 h-6 text-gray-600" />
      </button>

      <main className="flex-1 p-4 mt-7 md:mt-0 md:p-6 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;