import { apiSlice } from './apiSlice';

export const autocompleteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentAC: builder.query({
      query: (params) => ({ url: '/api/user/autocomplete/student', params: params }),
    }),

    getComissionAC: builder.query({
      query: (params) => ({ url: '/api/user/autocomplete/comission', params: params }),
    }),

    getInternFormAC: builder.query({
      query: (params) => ({ url: '/api/intern-form/autocomplete', params: params }),
    }),

    getInternStatusAC: builder.query({
      query: (params) => ({ url: '/api/intern-status/autocomplete', params: params }),
    }),

    getInterviewAC: builder.query({
      query: (params) => ({ url: '/api/interview/autocomplete', params: params }),
    }),

    getEduYearAC: builder.query({
      query: (params) => ({ url: '/api/internship-panel/eduyear/autocomplete', params: params }),
    }),
  }),
});

export const {
  useGetStudentACQuery,
  useGetInternFormACQuery,
  useGetInterviewACQuery,
  useGetEduYearACQuery,
  useGetComissionACQuery,
  useGetInternStatusACQuery,
} = autocompleteSlice;
