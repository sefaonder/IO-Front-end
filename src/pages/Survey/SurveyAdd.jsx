import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import CustomRadioGroup from './SurveyComponents/CustomRadioGroup';
import SurveyQuestions from './SurveyComponents/SurveyQuestions';
import {
  useCreateNewSurveyMutation,
  useGetCompanyInfoQuery,
  useUpdateSurveyMutation,
} from 'src/store/services/survey/surveyApiSlice';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import { useGetInterviewACQuery } from 'src/app/api/autocompleteSlice';

const SurveyAdd = ({ survey, surveyId }) => {
  const [selectedAnswersSingle, setSelectedAnswersSingle] = useState([]);
  const [selectedAnswersMulti, setSelectedAnswersMulti] = useState([]);
  const [selectedAnswersInterm, setSelectedAnswersInterm] = useState([]);
  const [arrayCheck, setArrayCheck] = useState(31);
  const [createSurvey, { isLoading }] = useCreateNewSurveyMutation();
  const [updateSurvey, { isLoadingUpdate }] = useUpdateSurveyMutation();

  const [interviewId, setInterviewId] = useState(null);
  const {
    data,
    isLoading: loadingInfo,
    isSuccess,
  } = useGetCompanyInfoQuery(interviewId, { skip: !Boolean(interviewId) });

  useEffect(() => {
    if (data?.data?.form) {
      formik.setFieldValue('company_name', data.data.form.company_info.name, false);
      formik.setFieldValue('company_address', data.data.form.company_info.address, false);
    }
  }, [isSuccess]);

  const setFormikValuesss = () => {
    console.log(survey?.data?.company_name);
    if (survey?.data) {
      formik.setFieldValue('company_name', survey?.data?.company_name);
      formik.setFieldValue('company_address', survey?.data?.company_address);
      formik.setFieldValue('teach_type', survey?.data?.teach_type);
      formik.setFieldValue('gano', survey?.data?.gano);
      formik.setFieldValue('intern_type', survey?.data?.intern_type);
      if (survey?.data?.answers?.length > 0) {
        setSelectedAnswersSingle([...survey?.data?.answers?.slice(0, 27)]);
        const res = survey?.data.answers?.slice(27, 31);
        const newArray = [, ...res];
        setSelectedAnswersMulti(newArray);
        const resInterm = survey?.data?.answers.slice(31);
        setSelectedAnswersInterm(resInterm);
      }
    }
  };

  useEffect(() => {
    setFormikValuesss();
  }, [survey?.data]);

  const validationSchema = yup.object({
    company_name: yup.string().required('E-mail Zorunlu'),
    company_address: yup.string().required('Şirket Adresi Zorunlu'),
    teach_type: yup.string().required('Öğrenim Türü Zorunlu'),
    gano: yup.string().required('Gano Bilgisi Zorunlu'),
    date: yup.date().required('Tarih alanı zorunludur'),
    answers: yup.array().test('hasValidElements', 'Dizi Elemanları Geçerli Değil', function (value) {
      if (!Array.isArray(value)) return false;
      if (value.length < arrayCheck) return false;
      const arrayElements = value.slice(27, 31);
      const invalidLength = arrayElements.some((item) => !Array.isArray(item) || item.length < 1);
      if (invalidLength) return false;
      const nonArrayElements = value.filter((item) => item == undefined);
      return nonArrayElements.length > 0 ? false : true;
    }),
  });
  const formik = useFormik({
    initialValues: {
      interview: null,
      company_name: '',
      company_address: '',
      teach_type: '',
      intern_group: '',
      intern_type: '',
      gano: '',
      date: new Date(),
      answers: null,
    },
    onSubmit: async (values) => {
      try {
        const payload = { ...values, interviewId: values.interview.id };
        if (survey) {
          if (!(values.intern_type === 'Dönem içi')) {
            payload.answers = payload.answers.slice(0, 31);
          }
          await updateSurvey({ payload: payload, surveyId: surveyId }).unwrap();
        } else {
          await createSurvey(payload).unwrap();
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (formik.values?.interview?.id && !survey?.id) {
      setInterviewId(formik.values.interview.id);
      console.log('new id', interviewId);
    }
  }, [formik.values.interview]);

  useEffect(() => {
    formik.values.answers = [...selectedAnswersSingle, ...selectedAnswersMulti.slice(1), ...selectedAnswersInterm];
    if (formik?.values.intern_type === 'Dönem içi') {
      setArrayCheck(40);
    } else {
      setArrayCheck(31);
    }
  }, [formik]);

  const teach_type_data = { name: 'Öğretim Türü', type: 'teach_type', data: ['1. Öğretim', '2. Öğretim'] };

  const intern_group_data = { name: 'Staj Grubu', type: 'intern_group', data: ['I. Grup', 'II. Grup'] };
  const intern_type_data = { name: 'Staj Türü', type: 'intern_type', data: ['Dönem içi', 'Dönem Dışı'] };

  const gano_data = {
    name: 'GANO',
    type: 'gano',
    data: ['0 - 1.79', '1.80 - 1.99', '2.00 - 2.49', '2.50 - 2.99', '3.00 - 3.49', '3.50 - 4.00'],
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <CustomAutocomplete
          name="interview"
          id="interview"
          disabled={survey?.id}
          required
          // filterId={!isAdvancedComission && userAuth?.userId}
          useACSlice={useGetInterviewACQuery}
          label={'İlgili Mülakat & Staj'}
          value={formik.values.interview}
          onChange={(value) => formik.setFieldValue('interview', value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors?.interview)}
          helperText={formik.errors.interview?.id}
        />
        <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
          <FormLabel className="font-extrabold">Staj Yapılan Firma Adı:</FormLabel>
          <TextField
            className="w-full lg:w-1/2"
            id="company_name"
            name="company_name"
            label="Firma adı"
            margin="normal"
            value={formik.values.company_name}
            onChange={formik.handleChange}
            error={formik.touched.company_name && Boolean(formik.errors.company_name)}
            helperText={formik.touched.company_name && formik.errors.company_name}
          />
        </Box>
        <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
          <FormLabel className="font-extrabold">Staj Yapılan Firma Adresi:</FormLabel>
          <TextField
            className="w-full lg:w-1/2"
            id="company_address"
            name="company_address"
            label="Firma adresi"
            margin="normal"
            value={formik.values.company_address}
            onChange={formik.handleChange}
            error={formik.touched.company_address && Boolean(formik.errors.company_address)}
            helperText={formik.touched.company_address && formik.errors.company_address}
          />
        </Box>

        <Box className="flex items-center justify-between">
          <CustomRadioGroup
            error={formik.touched.teach_type && Boolean(formik.errors.teach_type)}
            helperText={formik.touched.teach_type && formik.errors.teach_type}
            data={teach_type_data}
            formik={formik}
          />
        </Box>
        <Box className="flex items-center justify-between">
          <CustomRadioGroup
            data={gano_data}
            formik={formik}
            error={formik.touched.gano && Boolean(formik.errors.gano)}
            helperText={formik.touched.gano && formik.errors.gano}
          />
        </Box>
        <Box className="flex items-center justify-between">
          <CustomRadioGroup
            data={intern_group_data}
            formik={formik}
            error={Boolean(formik.errors.intern_group)}
            helperText={formik.errors.intern_group}
          />
        </Box>
        <Box className="flex items-center justify-between">
          <CustomRadioGroup
            data={intern_type_data}
            formik={formik}
            error={Boolean(formik.errors.intern_type)}
            helperText={formik.errors.intern_type}
          />
        </Box>
        <Box>
          <SurveyQuestions
            selectedAnswersSingle={selectedAnswersSingle}
            setSelectedAnswersSingle={setSelectedAnswersSingle}
            selectedAnswersMulti={selectedAnswersMulti}
            setSelectedAnswersMulti={setSelectedAnswersMulti}
            selectedAnswersInterm={selectedAnswersInterm}
            setSelectedAnswersInterm={setSelectedAnswersInterm}
            isInTerm={formik.values.intern_type === 'Dönem içi'}
          />
          <Typography className="flex justify-end">
            {formik.touched.answers && Boolean(formik.errors.answers) && (
              <Box className="text-red-500">{formik.touched.answers && formik.errors.answers}</Box>
            )}
          </Typography>
        </Box>
        <Button className="px-4 w-1/3 flex my-2" type="submit" color="success" variant="outlined">
          Gönder
        </Button>
      </form>
    </div>
  );
};

export default SurveyAdd;
