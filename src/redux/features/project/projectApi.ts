import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        url: "/project/all-projects",
        method: "GET",
      }),
      providesTags: ["Project", "Dashboard"],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/project/create-project",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project", "Dashboard"],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project", "Dashboard"],
    }),
    updateProject: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `/project/${projectId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Project", "Dashboard"],
    }),
    getProjectById: builder.query({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: "GET",
      }),
      providesTags: ["Project", "Dashboard"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useGetProjectByIdQuery,
} = projectApi;
