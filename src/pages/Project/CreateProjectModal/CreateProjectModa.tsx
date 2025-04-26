/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

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

const CreateProjectModal = ({ isOpen, onClose, clients, onSubmit }: CreateProjectModalProps) => {
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
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

          {/* Client Select */}
          <div>
            <label className="block mb-1 text-sm font-medium">Select Client</label>
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

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              Create
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CreateProjectModal;
