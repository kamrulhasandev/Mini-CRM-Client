import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
      `}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-gray-800">Mini CRM</h1>
        <button className="md:hidden" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <IoIosArrowBack className="w-6 h-6 text-gray-600" />
          ) : (
            <IoIosArrowBack className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
              onClick={() => toggleSidebar()}
            >
              <MdSpaceDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
