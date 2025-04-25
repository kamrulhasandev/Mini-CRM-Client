import { baseApi } from "../../api/baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => ({
        url: "/client/all-clients",
        method: "GET",
      }),
      providesTags: ["Client", "Dashboard"],
    }),
    createClient: builder.mutation({
      query: (data) => ({
        url: "/client/create-client",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client", "Dashboard"],
    }),
    deleteClient: builder.mutation({
      query: (clientId) => ({
        url: `/client/${clientId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client", "Dashboard"],
    }),
    updateClient: builder.mutation({
      query: ({ clientId, data }) => ({
        url: `/client/${clientId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Client", "Dashboard"],
    }),
    getClientById: builder.query({
      query: (clientId) => ({
        url: `/client/${clientId}`,
        method: "GET",
      }),
      providesTags: ["Client", "Dashboard"],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
  useGetClientByIdQuery,
} = clientApi;
