import { NavLink, useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { FaUsers } from "react-icons/fa6";
import { GoProject } from "react-icons/go";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col
      `}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-gray-800">Mini CRM</h1>
        <button className="md:hidden" onClick={toggleSidebar}>
          <IoIosArrowBack className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              end
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
          <li>
            <NavLink
              to="/dashboard/clients"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
              onClick={() => toggleSidebar()}
            >
              <FaUsers className="w-5 h-5 mr-2" />
              Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/projects"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
              onClick={() => toggleSidebar()}
            >
              <GoProject  className="w-5 h-5 mr-2" />
              Projects
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout button at the bottom */}
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-red-100 rounded-md transition cursor-pointer"
        >
          <FiLogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
