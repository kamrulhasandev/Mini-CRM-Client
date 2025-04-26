/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

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
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/60 z-50 p-4"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-md mx-4 sm:mx-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Reminder</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Body same wrapping as Client Details */}
        <div className="p-4 md:p-6">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <h3 className="font-semibold text-gray-800">Title:</h3>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="border border-gray-300 p-2 rounded-md w-full mt-1"
                placeholder="Reminder title"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Date */}
            <div>
              <h3 className="font-semibold text-gray-800">Date:</h3>
              <input
                type="date"
                {...register("dueDate", { required: "Date is required" })}
                className="border border-gray-300 p-2 rounded-md w-full mt-1"
              />
              {errors.dueDate && (
                <span className="text-red-500 text-sm">
                  {errors.dueDate.message}
                </span>
              )}
            </div>

            {/* Client */}
            <div>
              <h3 className="font-semibold text-gray-800">Client:</h3>
              <select
                {...register("clientId", { required: "Client is required" })}
                className="border border-gray-300 p-2 rounded-md w-full mt-1"
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
            <div>
              <h3 className="font-semibold text-gray-800">Message:</h3>
              <textarea
                {...register("message", { required: "Message is required" })}
                className="border border-gray-300 p-2 rounded-md w-full mt-1"
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
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                onClick={handleSubmit(submitHandler)}
                className="bg-[#3b82f6] text-white px-6 py-2 rounded-md hover:[#2563eb] transition-colors duration-150 w-full cursor-pointer"
              >
                Save Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReminderModal;
