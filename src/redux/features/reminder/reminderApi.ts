import { baseApi } from "../../api/baseApi";

const reminderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReminder: builder.mutation({
      query: (data) => ({
        url: "/reminders/create-reminder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reminder", "Dashboard"],
    }),
  }),
});

export const { useCreateReminderMutation } = reminderApi;
