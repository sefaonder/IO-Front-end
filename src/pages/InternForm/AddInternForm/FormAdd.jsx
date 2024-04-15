import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import * as yup from 'yup';
import moment from 'moment';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import { useFormik } from 'formik';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import { useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import CustomDateInput from 'src/components/inputs/CustomDateInput';
import { getBusinessDays, shouldDisableDate } from 'src/app/handlers/dateHandlers';

function FormAdd({ prevStep, nextStep }) {
  const handleNext = () => {
    // Önceki adıma git
    nextStep();
  };
  // tatil günlerini çek ve inputlara tatil günlerini ve haftasonlarını ver
  // state ayarlamalarını yap ve gerekli bağlantıları hazırla
  // redux ve apı bağlantılarını yap

  const initialValues = {
    student: {},
    startDate: '',
    endDate: '',
    eduYear: '',
  };

  const validationSchema = yup.object({
    student: yup.object().required('Lütfen öğrenci girin'),
    startDate: yup.date().required('Lütfen Staj başlangıç tarihi girin'),
    endDate: yup
      .date()
      .required('Bitiş tarihi gereklidir')
      .test('is-valid-range', 'Tarih aralığı 60 iş gününden fazla olamaz', function (value) {
        const startDate = this.parent.startDate;
        const businessDays = getBusinessDays(startDate, value, []);
        return businessDays <= 60;
      }),
    eduYear: yup.string().required('Lütfen eduYear girin'),
  });

  function handleSubmit(values) {
    console.log('Step1', values);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log('step1', values);
    },
    validationSchema: validationSchema,
  });

  function StudentACLabelFunction(value) {
    value.name ? `${value.name} ${value.last_name}` : '';
  }

  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) => {
      // Arama metniyle eşleşen seçenekleri filtrele
      const searchText = inputValue.toLowerCase();
      const { last_name, name, school_number } = option;
      return (
        last_name.toLowerCase().includes(searchText) ||
        name.toLowerCase().includes(searchText) ||
        school_number.toLowerCase().includes(searchText)
      );
    });
  };
  console.log('formik', formik.values);

  return (
    <div>
      <Typography variant="h6">Adım 1</Typography>
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <CustomAutocomplete
          name="student"
          id="student"
          useACSlice={useGetStudentACQuery}
          value={formik.values.student}
          filterOptions={filterOptions}
          onChange={(value) => formik.setFieldValue('student', value, true)}
          error={formik.touched.student && Boolean(formik.errors.student)}
          helperText={formik.touched.student && formik.errors.student}
          labelFunc={StudentACLabelFunction}
          renderOption={(props, option) => (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem
                key={option.school_number}
                {...props}
                disablePadding
                button
                // style={{ borderBottom: `1px solid ${theme.palette.divider}` }}
              >
                <ListItemText primary={option?.name + ' ' + option?.last_name} secondary={option?.school_number} />
              </ListItem>
            </List>
          )}
        />

        <CustomDateInput
          id="startDate"
          name="startDate"
          label="Başlangıç Tarihi"
          shouldDisableDate={(date) => shouldDisableDate(date, [])}
          value={moment(formik.values.startDate)}
          onChange={(value) => formik.setFieldValue('startDate', value, true)}
          error={formik.touched.startDate && Boolean(formik.errors.startDate)}
          helperText={formik.touched.startDate && formik.errors.startDate}
        />

        <CustomDateInput
          id="endDate"
          name="endDate"
          shouldDisableDate={(date) => shouldDisableDate(date, [])}
          label="Doğum Tarihi"
          value={moment(formik.values.endDate)}
          onChange={(value) => formik.setFieldValue('endDate', value, true)}
          error={formik.touched.endDate && Boolean(formik.errors.endDate)}
          helperText={formik.touched.endDate && formik.errors.endDate}
        />

        {formik.values.endDate && formik.values.startDate && (
          <Typography>
            {`Total Day : ${getBusinessDays(formik.values.startDate, formik.values.endDate, [])}`}
          </Typography>
        )}

        <CustomTextInput
          id="eduYear"
          name="eduYear"
          label="eduYear"
          value={formik.values.eduYear}
          onChange={formik.handleChange}
          error={formik.touched.eduYear && Boolean(formik.errors.eduYear)}
          helperText={formik.touched.eduYear && formik.errors.eduYear}
        />

        <Button type="submit" variant="outlined" disabled={formik.errors?.length > 0}>
          Gönder
        </Button>
      </form>

      <Button variant="outlined" onClick={handleNext}>
        İlerle
      </Button>
    </div>
  );
}

export default FormAdd;