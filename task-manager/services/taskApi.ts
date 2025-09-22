import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper to get token (only client-side)
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`;

const prepareHeaders = (headers: Headers) => {
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

export interface Task {
  _id: string;
  userId: string;
  name: string;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
}

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders }),
  tagTypes: ["Tasks", "Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => `/`,
      providesTags: ["Tasks"],
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    addTask: builder.mutation<Task, { name: string; status: "pending" | "completed" }>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Tasks", { type: "Task", id }],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => ["Tasks", { type: "Task", id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
