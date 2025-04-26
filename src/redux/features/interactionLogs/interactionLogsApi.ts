import { baseApi } from "../../api/baseApi";

const interactionLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInteractionLogs: builder.query({
      query: () => ({
        url: "/logs/all-logs",
        method: "GET",
      }),
      providesTags: ["Log", "Dashboard"],
    }),
    createInteractionLog: builder.mutation({
      query: (data) => ({
        url: "/logs/create-log",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Log", "Dashboard"],
    }),
  }),
});

export const {
  useGetAllInteractionLogsQuery,
  useCreateInteractionLogMutation,
} = interactionLogsApi;
