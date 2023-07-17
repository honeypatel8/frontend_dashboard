import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["Employee"],
  endpoints: (build) => ({
    getEmployees: build.query({
      query: () => "/employee",
      providesTags: ["Employee"],
    }),
    getEmployeesStats: build.query({
      query: () => "/employee/stats",
      providesTags: ["Employee"],
    }),
    getBirthdays: build.query({
      query: () => "/employee/birthday",
      providesTags: ["Employee"],
    }),
    getFullLeaves: build.query({
      query: () => "/employee/fullleave",
      providesTags: ["Employee"],
    }),
    getWorkStateStats: build.query({
      query: () => "/workstatuses/stats",
      providesTags: ["Employee"],
    }),
    getDepartmentStats: build.query({
      query: () => "/departments/stats",
      providesTags: ["Employee"],
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: "/employee/login",
        method: "POST",
        body,
      }),
      // providesTags: ["Employee"],
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: "/employee/logout",
        method: "POST",
      }),
    }),
    updateEmployeeData: build.mutation({
      query: (body) => ({
        url: `/admin/update`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateProfileData: build.mutation({
      query: (body) => ({
        url: `/employee/update`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    registerEmployee: build.mutation({
      query: (body) => ({
        url: `/employee/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: build.mutation({
      query: (body) => ({
        url: `/employee/delete`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useUpdateEmployeeDataMutation,
  useRegisterEmployeeMutation,
  useDeleteEmployeeMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdateProfileDataMutation,
  useGetEmployeesStatsQuery,
  useGetWorkStateStatsQuery,
  useGetDepartmentStatsQuery,
  useGetBirthdaysQuery,
  useGetFullLeavesQuery,
} = userApi;
