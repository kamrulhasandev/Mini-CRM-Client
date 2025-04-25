/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaUsers, FaBriefcase, FaBell } from "react-icons/fa";
import { useGetDashboardDataQuery } from "../../redux/features/dashboard/dashboardApi";
import StatCard from "./StatCard/StatCard";
import StatusCard from "./StatusCard/StatusCard";
import ReminderList from "./ReminderList/ReminderList";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const DashboardHome = () => {
  const { data, isLoading } = useGetDashboardDataQuery(undefined);

  const dashboardData = data?.data;
  console.log(dashboardData);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 md:p-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Clients"
          value={dashboardData?.totalClients}
          icon={<FaUsers className="text-blue-600 text-2xl" />}
        />
        <StatCard
          title="Total Projects"
          value={dashboardData?.totalProjects}
          icon={<FaBriefcase className="text-green-600 text-2xl" />}
        />
        <StatCard
          title="Reminders Due Soon"
          value={dashboardData?.remindersDueSoon?.length}
          icon={<FaBell className="text-yellow-500 text-2xl" />}
        />
      </div>

      {/* Project Status Cards */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Projects by Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dashboardData?.projectsByStatus?.map((item: any) => (
            <StatusCard
              key={item.status}
              status={item.status}
              count={item.count}
            />
          ))}
        </div>
      </div>

      {/* Reminders List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upcoming Reminders</h2>
        <ReminderList reminders={dashboardData?.remindersDueSoon || []} />
      </div>
    </div>
  );
};

export default DashboardHome;
