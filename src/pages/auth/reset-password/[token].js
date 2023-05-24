import { useState } from 'react';
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import useAxiosPrivate from 'src/hooks/use-axios-private';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
const RESET_PASSWORD_URL = '/auth/reset-password/'

const Page = () => {
  const axiosPrivate = useAxiosPrivate()
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { token } = router.query;
  console.log(token)
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      submit: null
    },
    validationSchema: Yup.object({
        password : Yup
        .string()
        .required("Please enter new password"),
        confirmPassword : Yup
        .string()
        .required("Please enter confirm password")
        .oneOf([Yup.ref('password'), null], 'Password does not match') 

    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await axiosPrivate.patch(RESET_PASSWORD_URL+token,
        JSON.stringify({values}),{headers: { 'Content-Type': 'application/json' }})
        setSuccessMessage(response.data.message);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.message });
        helpers.setSubmitting(false);
      }
    }
  });


  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        flex: '1 1 auto',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: '100px',
          width: '100%'
        }}
      >
        <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Forgot Password
              </Typography>
            </Stack>
        <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Enter new password"
            error={!!(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
            required
            type='password'
          />
          <TextField
            fullWidth
            label="Confirm new password"
            error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            required
            type='password'
          />
          </Stack>
           {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </form>
      </Box>
      <Snackbar 
            open={!!successMessage} 
            autoHideDuration={3000} 
            onClose={() => setSuccessMessage('')}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
            <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
                {successMessage}
            </Alert>
       </Snackbar>
    </Box>


  );
};

Page.getLayout = (page) => (
    <AuthLayout>
      {page}
    </AuthLayout>
  );
  
  export default Page;