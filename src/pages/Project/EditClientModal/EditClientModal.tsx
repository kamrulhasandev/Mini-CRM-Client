/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

interface ClientType {
  id: string;
  name: string;
}

interface ProjectType {
  id: string;
  title: string;
  budget: number;
  deadline: string; // ISO string
  clientId: string;
  status: string;
}

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: ClientType[];
  project: ProjectType | null;
  onSubmit: (data: any) => void;
}

const statusOptions = [
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const EditProjectModal = ({
  isOpen,
  onClose,
  clients,
  project,
  onSubmit,
}: EditProjectModalProps) => {
  const { register, handleSubmit, control, reset } = useForm<any>();

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        budget: project.budget.toString(),
        deadline: project.deadline.split("T")[0],
        status: project.status,
        clientId: project.clientId,
      });
    }
  }, [project, reset]);

  if (!isOpen || !project) return null;

  const handleFormSubmit = (data: any) => {
    const formatted = {
      title: data.title,
      budget: parseFloat(data.budget),
      deadline: data.deadline ? new Date(data.deadline).toISOString() : null,
      status: data.status,
    };
    onSubmit(formatted);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Budget ($)</label>
            <input
              type="number"
              {...register("budget", { required: true })}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Deadline</label>
            <input
              type="date"
              {...register("deadline")}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Client</label>
            <input
              value={clients.find((c) => c.id === project.clientId)?.name || ""}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-200 cursor-not-allowed"
            />
          </div>

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
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

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
              Save Changes
            </button>
          </div>
        </form>

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

export default EditProjectModal;
