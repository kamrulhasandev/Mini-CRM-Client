// src/components/ClientDetailsModal.tsx
import { FaTimes } from "react-icons/fa";
import { ClientType } from "../Client";

interface ClientDetailsModalProps {
  selectedClient: string | null;
  dashboardData: ClientType[];
  setSelectedClient: (id: string | null) => void;
}

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  selectedClient,
  dashboardData,
  setSelectedClient,
}) => {
  const client = dashboardData.find((c) => c.id === selectedClient);

  if (!selectedClient || !client) return null;

  return (
    <div
      onClick={() => setSelectedClient(null)}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/60 z-50 p-4"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-md mx-4 sm:mx-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:p-6">
          <h2
            id="modal-title"
            className="text-xl font-bold text-gray-900 md:text-2xl"
          >
            Client Details
          </h2>
          <button
            onClick={() => setSelectedClient(null)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 md:p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Name:</h3>
              <p className="text-gray-600">{client.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email:</h3>
              <p className="text-gray-600">{client.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Phone:</h3>
              <p className="text-gray-600">{client.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Company:</h3>
              <p className="text-gray-600">{client.company || "N/A"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Notes:</h3>
              <p className="text-gray-600 leading-relaxed">
                {client.notes || "No notes available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
