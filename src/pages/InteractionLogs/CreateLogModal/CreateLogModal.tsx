/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Add New Log</h2>

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
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
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
