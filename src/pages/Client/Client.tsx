import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  useCreateClientMutation,
  useDeleteClientMutation,
  useGetAllClientsQuery,
  useUpdateClientMutation,
} from "../../redux/features/client/clientAPI";
import ClientDetailsModal from "./ClientDetailsModal/ClientDetailsModal";
import CreateClientModal from "./CreateClientModal/CreateClientModal";
import EditClientModal from "./EditClientModal/EditClientModal";
import { toast } from "sonner";

export type ClientType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
};

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

const Client = () => {
  const { data, isLoading } = useGetAllClientsQuery(undefined);
  const [createClient] = useCreateClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editClientData, setEditClientData] = useState<ClientType | null>(null);

  const dashboardData: ClientType[] = data?.data || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleViewDetails = (id: string) => {
    setSelectedClient(id);
  };

  const handleEditClick = (client: ClientType) => {
    setEditClientData(client);
    setIsEditModalOpen(true);
  };

  const handleEditClient = async (data: ClientFormData) => {
    if (editClientData) {
      try {
        await updateClient({ clientId: editClientData.id, data });
        toast.success("Client updated successfully!");
        setIsEditModalOpen(false);
      } catch (error) {
        console.error("Failed to update client:", error);
        toast.error("Failed to update client. Please try again.");
      }
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      toast.success("Client deleted successfully!");
    } catch (error) {
      console.error("Failed to delete client:", error);
      toast.error("Failed to delete client. Please try again.");
    }
  };

  const handleCreateClient = async (data: ClientFormData) => {
    try {
      await createClient(data);
      toast.success("Client created successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create client:", error);
      toast.error("Failed to create client. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          My Clients
        </h1>
        <div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3b82f6] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#2563eb] transition-colors duration-150 cursor-pointer"
            aria-label="Add new client"
          >
            Add Client
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-[1000px] w-full bg-white">
            <thead className="bg-gray-500 text-white text-sm uppercase">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-medium tracking-wide md:px-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-medium tracking-wide md:px-6"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-medium tracking-wide md:px-6"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-medium tracking-wide md:px-6"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-medium tracking-wide md:px-6"
                >
                  Notes
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center font-medium tracking-wide md:px-6"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {dashboardData.length > 0 ? (
                dashboardData.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-sm md:px-6">{client.name}</td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {client.email}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {client.phone}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {client.company || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {client.notes
                        ? `${client.notes.slice(0, 50)}...`
                        : "No notes"}
                    </td>
                    <td className="px-4 py-3 text-center md:px-6">
                      <div className="flex justify-center gap-1 md:gap-2">
                        <button
                          onClick={() => handleViewDetails(client.id)}
                          className="p-2 text-green-500 hover:bg-indigo-100 rounded-full transition-colors duration-150"
                          aria-label="View client details"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditClick(client)} // Open Edit Modal
                          className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition-colors duration-150"
                          aria-label="Edit client"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-150"
                          aria-label="Delete client"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-3 text-center text-sm md:px-6"
                  >
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ClientDetailsModal
        selectedClient={selectedClient}
        dashboardData={dashboardData}
        setSelectedClient={setSelectedClient}
      />

      <CreateClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateClient}
      />

      {editClientData && (
        <EditClientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditClient}
          defaultValues={editClientData}
        />
      )}
    </div>
  );
};

export default Client;
