/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

interface ClientType {
  id: string;
  name: string;
}

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: ClientType[];
  onSubmit: (data: any) => void;
}

// Define the form data type
interface FormData {
  title: string;
  budget: string;
  deadline: string;
  clientId: string;
  status: string;
}

const statusOptions = [
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const CreateProjectModal = ({
  isOpen,
  onClose,
  clients,
  onSubmit,
}: CreateProjectModalProps) => {
  const { register, handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      status: "IN_PROGRESS",
    },
  });

  const handleFormSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      budget: parseFloat(data.budget),
      deadline: new Date(data.deadline).toISOString(),
    };
    onSubmit(formattedData);
    reset();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/60 z-50 p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-md relative shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create Client</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Project Title"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block mb-1 text-sm font-medium">Budget ($)</label>
            <input
              type="number"
              {...register("budget", { required: true })}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Budget"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block mb-1 text-sm font-medium">Deadline</label>
            <input
              type="date"
              {...register("deadline", { required: true })}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Client Select */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Select Client
            </label>
            <Controller
              control={control}
              name="clientId"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          

          {/* Buttons */}
          <div className="pt-4">
           
            <button
              type="submit"
               className="bg-[#3b82f6] text-white px-6 py-2 rounded-md hover:[#2563eb] transition-colors duration-150 w-full cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
