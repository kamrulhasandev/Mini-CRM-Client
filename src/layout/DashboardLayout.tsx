import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
