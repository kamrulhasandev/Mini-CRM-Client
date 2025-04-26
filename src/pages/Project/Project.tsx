/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa6";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} from "../../redux/features/project/projectApi";
import { useGetAllClientsQuery } from "../../redux/features/client/clientAPI";

import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import CreateProjectModal from "./CreateProjectModal/CreateProjectModa";
import EditProjectModal from "./EditClientModal/EditClientModal";
import formatDate from "../../utils/formateDate";

const Project = () => {
  const { data, isLoading } = useGetAllProjectsQuery(undefined);
  const { data: clientData, isLoading: isClientLoading } =
    useGetAllClientsQuery(undefined);
  const [updateProject] = useUpdateProjectMutation();
  const [createProject] = useCreateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  const projectData = data?.data || [];
  const clients = clientData?.data || [];

  if (isLoading || isClientLoading) {
    return <LoadingSpinner />;
  }

  const handleCreateProject = async (formData: any) => {
    try {
      const res = await createProject(formData);
      if (res?.data?.success) {
        toast.success("Project created successfully!");
        setIsModalOpen(false);
      }
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProject = (project: any) => {
    setCurrentProject(project);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = async (updatedData: any) => {
    if (!currentProject) return;
    try {
      await updateProject({
        projectId: currentProject.id,
        data: updatedData,
      }).unwrap();
      toast.success("Project updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update project:", error);
      toast.error("Failed to update project");
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project. Please try again.");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          My Projects
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#3b82f6] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#2563eb] transition-colors duration-150"
        >
          Add Project
        </button>
      </div>

      {/* Modals */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clients={clients}
        onSubmit={handleCreateProject}
      />
      {isEditModalOpen && currentProject && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          clients={clients}
          project={currentProject}
          onSubmit={handleSaveChanges}
        />
      )}

      {/* Table */}
      <div className="w-full overflow-hidden">
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-[1000px] w-full bg-white">
            <thead className="bg-gray-500 text-white text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Budget
                </th>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Deadline
                </th>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Client Name
                </th>
                <th className="px-4 py-3 text-left font-medium tracking-wide md:px-6">
                  Status
                </th>
                <th className="px-4 py-3 text-center font-medium tracking-wide md:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {projectData.length > 0 ? (
                projectData.map((project: any) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-sm md:px-6">
                      {project.title}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      ${project.budget}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {formatDate(project.deadline)}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {project.Client?.name}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          project.status
                        )}`}
                      >
                        {project.status
                          .toLowerCase()
                          .replace(/\b\w/g, (char: string) =>
                            char.toUpperCase()
                          )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center md:px-6">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-2 text-green-500 hover:bg-green-100 rounded-full"
                          title="View"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full"
                          title="Edit"
                          onClick={() => handleEditProject(project)}
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
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
    </div>
  );
};

export default Project;
