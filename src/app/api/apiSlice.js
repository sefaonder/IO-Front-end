import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from 'src/store/services/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    // send refresh token to get new acces token
    const refreshResult = await baseQuery('/token', api, extraOptions);
    console.log('refreshResult', refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token

      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // re-try the original query with new acces token

      result = await baseQuery(args, api, extraOptions);
    } else {
      // TODO: refresh token expires
      api.dispatch(logOut());
    }
  }
  // TODO: 401 error for permissions
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
