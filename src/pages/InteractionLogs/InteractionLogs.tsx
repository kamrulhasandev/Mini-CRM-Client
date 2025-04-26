/* eslint-disable @typescript-eslint/no-explicit-any */

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  useCreateInteractionLogMutation,
  useGetAllInteractionLogsQuery,
} from "../../redux/features/interactionLogs/interactionLogsApi";
import formatDate from "../../utils/formateDate";
import { useGetAllClientsQuery } from "../../redux/features/client/clientAPI";
import CreateLogModal from "./CreateLogModal/CreateLogModal";
import { useState } from "react";
import { toast } from "sonner";

const InteractionLogs = () => {
  const { data, isLoading } = useGetAllInteractionLogsQuery(undefined);
  const { data: clientData, isLoading: isClientLoading } =
    useGetAllClientsQuery(undefined);
  const [createInteractionLog] = useCreateInteractionLogMutation();
  const logs = data?.data || [];
  const clients = clientData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || isClientLoading) {
    return <LoadingSpinner />;
  }

  const handleCreateLog = async (formData: any) => {
    try {
      const res = await createInteractionLog(formData);
      if (res?.data?.success) {
        toast.success("Log created successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Logs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#3b82f6] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#2563eb] transition-colors duration-150"
        >
          Add Logs
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden">
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-[1000px] w-full bg-white">
            <thead className="bg-gray-500 text-white text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  No
                </th>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Date
                </th>

                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Client Name
                </th>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Client Email
                </th>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Client Phone
                </th>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {logs.length > 0 ? (
                logs.map((log: any, index: number) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-sm md:px-6">{index + 1}</td>
                    <td className="px-4 py-3 text-sm md:px-6">{log.type}</td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {formatDate(log.date)}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {log.Client?.name}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {log.Client?.email}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {log.Client?.phone}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {log.notes.slice(0, 20) + "..."}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500 text-sm md:px-6"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateLog}
        clients={clients}
      />
    </div>
  );
};

export default InteractionLogs;
