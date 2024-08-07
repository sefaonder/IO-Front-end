import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePasswordResetMutation } from 'src/store/services/auth/authApiSlice';
import { Button, TextField } from '@mui/material';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';

function PasswordRefresh() {
  const navigate = useNavigate();

  const { token } = useParams(); // URL'den token parametresini alıyoruz
  const [resetToken, setResetToken] = useState(null);
  const [passwordReset, { isLoading }] = usePasswordResetMutation();

  console.log('resetToken', resetToken);

  useEffect(() => {
    // Token'i bir değişkende saklıyoruz
    if (token) {
      sessionStorage.setItem('reset-token', token);
    }

    navigate('/password-reset');

    // Bu sayede URL'deki token parametresi kaldırılmış olacak.
  }, [token]);

  const validationSchema = yup.object({
    password: yup.string().required('Şifre zorunlu bir alandır'),
    password2: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Şifreler eşleşmiyor')
      .required('Lütfen şifrenizi doğrulayınız'),
  });

  const handleSubmit = async (values) => {
    const pwdResetToken = sessionStorage.getItem('reset-token');
    const payload = { credentials: values, token: pwdResetToken };
    const response = await passwordReset(payload);

    if (response.data) {
      projectSnackbar(response.data.message, { variant: 'success' });
      sessionStorage.removeItem('reset-token');

      navigate('/login');
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      password2: '',
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="flex items-center  border-2 m-2 bg-white relative login-container h-[32rem]">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />

      <form onSubmit={formik.handleSubmit} className="p-8 flex justify-center gap-4 flex-col">
        <h1 className="flex justify-center	text-2xl items-center">Bilgisayar Mühendisliği Staj Otomasyonu</h1>

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          id="password2"
          name="password2"
          label="Password2"
          type="password"
          margin=""
          value={formik.values.password2}
          onChange={formik.handleChange}
          error={formik.touched.password2 && Boolean(formik.errors.password2)}
          helperText={formik.touched.password2 && formik.errors.password2}
        />
        <Button className="p-3" type="submit" color="primary" variant="outlined" disabled={isLoading}>
          Gönder
        </Button>
      </form>
    </div>
  );
}

export default PasswordRefresh;
