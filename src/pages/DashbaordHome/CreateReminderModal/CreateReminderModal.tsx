/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

interface CreateReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  clients: any[];
}

interface FormData {
  title: string;
  dueDate: string;
  message: string;
  clientId: string;
}

const CreateReminderModal = ({
  isOpen,
  onClose,
  onSubmit,
  clients,
}: CreateReminderModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const submitHandler = (data: FormData) => {
    const formattedData = {
      ...data,
      dueDate: new Date(data.dueDate).toISOString(),
    };
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

        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Reminder
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="border p-2 rounded-md"
              placeholder="Reminder title"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              {...register("dueDate", { required: "Date is required" })}
              className="border p-2 rounded-md"
            />
            {errors.dueDate && (
              <span className="text-red-500 text-sm">
                {errors.dueDate.message}
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

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="border p-2 rounded-md"
              rows={4}
              placeholder="Write your reminder message..."
            />
            {errors.message && (
              <span className="text-red-500 text-sm">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
            >
              Save Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReminderModal;
