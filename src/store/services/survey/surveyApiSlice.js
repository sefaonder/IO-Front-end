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
    getCompanyInfo: builder.query({
      query: (interviewId) => ({ url: `/api/survey/getCompanyInfo/${interviewId}` }),
    }),

    unlockSurvey: builder.mutation({
      query: (surveyId) => ({
        url: `/api/survey/unlock/${surveyId}`,
        method: 'PUT',
      }),
    }),

    deleteSurvey: builder.mutation({
      query: (surveyId) => ({
        url: `/api/survey/delete/${surveyId}`,
        method: 'DELETE',
      }),
    }),
  }),
});
export const { useGetSurveysQuery, useGetSurveyQuery, useGetCompanyInfoQuery } = SurveyApiSlice;

export const { useCreateNewSurveyMutation, useUpdateSurveyMutation, useUnlockSurveyMutation, useDeleteSurveyMutation } =
  SurveyApiSlice;
