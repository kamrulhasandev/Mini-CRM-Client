/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

interface CreateLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  clients: any[];
}

interface FormData {
  date: string;
  type: string;
  notes: string;
  clientId: string;
}

const CreateLogModal = ({
  isOpen,
  onClose,
  onSubmit,
  clients,
}: CreateLogModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const submitHandler = (data: FormData) => {
    const formattedData = { ...data, date: new Date(data.date).toISOString() };
    onSubmit(formattedData);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
  

      <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Log</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

       

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="border p-2 rounded-md"
            />
            {errors.date && (
              <span className="text-red-500 text-sm">
                {errors.date.message}
              </span>
            )}
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Type</label>
            <select
              {...register("type", { required: "Type is required" })}
              className="border p-2 rounded-md"
            >
              <option value="">Select type</option>
              <option value="MEETING">Meeting</option>
              <option value="CALL">Call</option>
              <option value="EMAIL">Email</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.type && (
              <span className="text-red-500 text-sm">
                {errors.type.message}
              </span>
            )}
          </div>

          {/* Client */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Client</label>
            <select
              {...register("clientId", { required: "Client is required" })}
              className="border p-2 rounded-md"
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <span className="text-red-500 text-sm">
                {errors.clientId.message}
              </span>
            )}
          </div>

          {/* Notes */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Notes</label>
            <textarea
              {...register("notes", { required: "Notes are required" })}
              className="border p-2 rounded-md"
              rows={4}
            />
            {errors.notes && (
              <span className="text-red-500 text-sm">
                {errors.notes.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
             className="bg-[#3b82f6] text-white px-6 py-2 rounded-md hover:[#2563eb] transition-colors duration-150 w-full cursor-pointer"
            >
              Save Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLogModal;
