import { apiSlice } from 'src/app/api/apiSlice';

export const SurveyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSurveys: builder.query({
      query: () => ({
        url: '/api/survey/get',
      }),
    }),
    getSurvey: builder.query({
      query: (surveyId) => ({ url: `/api/survey/get/${surveyId}` }),
    }),
    createNewSurvey: builder.mutation({
      query: (newSurvey) => ({
        url: '/api/survey/add',
        method: 'POST',
        body: newSurvey,
      }),
    }),
    updateSurvey: builder.mutation({
      query: ({ payload, surveyId }) => ({
        url: `/api/survey/update/${surveyId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});
export const { useGetSurveysQuery, useGetSurveyQuery } = SurveyApiSlice;

export const { useCreateNewSurveyMutation, useUpdateSurveyMutation } = SurveyApiSlice;