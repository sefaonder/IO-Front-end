import { createSlice } from '@reduxjs/toolkit';

const internFormSlice = createSlice({
  name: 'internForm',
  initialState: {
    id: null,
    start_date: null,
    end_date: null,
    edu_year: null,
    student_info: {},
    company_info: {},
    student: {},
    follow_up: {},
  },
  reducers: {
    setInternFormData: (state, action) => {
      const { start_date, end_date, edu_year, student_info, company_info, student, follow_up, id } = action.payload;
      state.id = id;
      state.start_date = start_date;
      state.end_date = end_date;
      state.edu_year = edu_year;
      state.student_info = { ...state.student_info, student_info };
      state.company_info = { ...state.company_info, company_info };
      state.student = { ...state.student, student };
      state.follow_up = { ...state.follow_up, follow_up };
    },
    clearInternFormData: (state, action) => {
      state.id = null;
      state.start_date = null;
      state.end_date = null;
      state.edu_year = null;
      state.student_info = {};
      state.company_info = {};
      state.student = {};
      state.follow_up = {};
    },
    setStudentInfoData: (state, action) => {
      const { student_info } = action.payload;
      state.student_info = { ...state.student_info, student_info };
    },
    setCompanyInfoData: (state, action) => {
      const { company_info } = action.payload;
      state.company_info = { ...state.company_info, company_info };
    },
  },
});

export const { setInternFormData, clearInternFormData, setStudentInfoData, setCompanyInfoData } =
  internFormSlice.actions;

export default internFormSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.email;
// export const selectCurrentToken = (state) => state.auth.token;
