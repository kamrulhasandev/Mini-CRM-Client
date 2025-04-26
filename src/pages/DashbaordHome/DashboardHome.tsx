/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaUsers, FaBriefcase, FaBell } from "react-icons/fa";
import { useGetDashboardDataQuery } from "../../redux/features/dashboard/dashboardApi";
import StatCard from "./StatCard/StatCard";
import StatusCard from "./StatusCard/StatusCard";
import ReminderList from "./ReminderList/ReminderList";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useGetAllClientsQuery } from "../../redux/features/client/clientAPI";
import { useCreateReminderMutation } from "../../redux/features/reminder/reminderApi";
import { useState } from "react";
import { toast } from "sonner";
import CreateReminderModal from "./CreateReminderModal/CreateReminderModal";

const DashboardHome = () => {
  const { data, isLoading } = useGetDashboardDataQuery(undefined);
  const { data: clients } = useGetAllClientsQuery(undefined);
  const [createReminder] = useCreateReminderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const statuses = ["IN_PROGRESS", "COMPLETED", "CANCELLED"];
  const dashboardData = data?.data;
  const clientData = clients?.data;
  console.log(dashboardData);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleCreateReminder = async (formData: any) => {
    try {
      const res = await createReminder(formData);
      if (res?.data?.success) {
        toast.success("Reminder created successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          {statuses.map((status) => {
            const matched = dashboardData?.projectsByStatus?.find(
              (item: any) => item.status === status
            );
            return (
              <StatusCard
                key={status}
                status={status}
                count={matched?.count ?? 0}
              />
            );
          })}
        </div>
      </div>

      <CreateReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateReminder}
        clients={clientData}
      />

      {/* Reminders List */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold ">Upcoming Reminders</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3b82f6] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#2563eb] transition-colors duration-150"
          >
            Add Reminder
          </button>
        </div>
        <ReminderList reminders={dashboardData?.remindersDueSoon || []} />
      </div>
    </div>
  );
};

export default DashboardHome;
