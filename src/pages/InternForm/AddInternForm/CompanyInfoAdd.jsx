import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import moment from 'moment';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import { useFormik } from 'formik';
import {
  useCreateNewCompanyInfoMutation,
  useUpdateCompanyInfoMutation,
} from 'src/store/services/internForm/internFormApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';

function CompanyInfoAdd({ nextStep, prevStep, internFormData, setIsLoading }) {
  const navigate = useNavigate();

  const [createNewCompanyInfo, { isLoading }] = useCreateNewCompanyInfoMutation();
  const [updateCompanyInfo, { isLoadingUpdate }] = useUpdateCompanyInfoMutation();

  const internFormId = useSelector((state) => state.internForm.id);

  const companyInfo = internFormData?.company_info;

  useEffect(() => {
    if (companyInfo?.id) {
      console.log('formil2', internFormData);
      formik.setFieldValue('name', companyInfo.name, false);
      formik.setFieldValue('address', companyInfo.address, false);
      formik.setFieldValue('phone', companyInfo.phone, false);
      formik.setFieldValue('fax', companyInfo.fax, false);
      formik.setFieldValue('email', companyInfo.email, false);
      formik.setFieldValue('serviceArea', companyInfo.service_area, false);
    }
  }, [internFormData]);

  const initialValues = {
    name: '',
    address: '',
    phone: '',
    fax: '',
    email: '',
    serviceArea: '',
  };

  const validationSchema = yup.object({
    name: yup.string().required('Lütfen firma ismi girin').max(100, 'Firma adı en fazla 50 karakter olabilir'),
    address: yup.string().required('Lütfen adres girin').max(100, 'firma adresi en fazla 100 karakter olabilir'),
    phone: yup.string().required('Lütfen geçerli bir telefon girin'),
    fax: yup.string().required('Lütfen geçerli bir fax girin').max(50, 'fax en fazla 50 karakter olabilir'),
    email: yup
      .string()
      .required('Lütfen geçerli bir email adresi girin')
      .max(50, 'Firma Maili en fazla 50 karakter olabilir'),
    serviceArea: yup
      .string()
      .required('Lütfen hizmet alanı girin')
      .max(50, 'Firma Servis Alanı en fazla 50 karakter olabilir'),
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const payload = { ...values, internFormId: internFormId };
      let response = null;

      if (formik.status) {
        if (companyInfo?.id) {
          response = await updateCompanyInfo({ payload: payload, companyInfoId: companyInfo.id });
        } else {
          response = await createNewCompanyInfo(payload);
        }

        if (response.data) {
          projectSnackbar(response.data.message, { variant: 'success' });
          setIsLoading(false);
          navigate('/intern-form/' + internFormId);
        } else {
          setIsLoading(false);
          navigate('/intern-form');
        }
      } else {
        setIsLoading(false);
        navigate('/intern-form');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="flex flex-col items-center">
      <Typography className="my-4" variant="h3">
        3.Adım Şirket Bilgileri
      </Typography>
      <form className="flex flex-col gap-4 w-full sm:w-2/3" onSubmit={formik.handleSubmit}>
        <CustomTextInput
          id="name"
          name="name"
          label="Firma ismi"
          value={formik.values.name}
          onChange={(value) => formik.setFieldValue('name', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <CustomTextInput
          id="address"
          name="address"
          multiline
          rows={3}
          label="Firma Adresi"
          value={formik.values.address}
          onChange={(value) => formik.setFieldValue('address', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <CustomTextInput
          id="phone"
          name="phone"
          label="Firma Telefon Numarası"
          value={formik.values.phone}
          onChange={(value) => formik.setFieldValue('phone', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <CustomTextInput
          id="fax"
          name="fax"
          label="Firma Fax Numarası"
          value={formik.values.fax}
          onChange={(value) => formik.setFieldValue('fax', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.fax && Boolean(formik.errors.fax)}
          helperText={formik.touched.fax && formik.errors.fax}
        />

        <CustomTextInput
          id="email"
          name="email"
          label="Firma Email"
          value={formik.values.email}
          onChange={(value) => formik.setFieldValue('email', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <CustomTextInput
          id="serviceArea"
          name="serviceArea"
          label="Firma Hizmet Alanı"
          value={formik.values.serviceArea}
          onChange={(value) => formik.setFieldValue('serviceArea', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.serviceArea && Boolean(formik.errors.serviceArea)}
          helperText={formik.touched.serviceArea && formik.errors.serviceArea}
        />

        <Button type="submit" variant="outlined" disabled={!formik.isValid}>
          Kaydet
        </Button>
      </form>
    </div>
  );
}

export default CompanyInfoAdd;
