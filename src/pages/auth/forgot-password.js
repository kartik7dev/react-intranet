import { useState } from 'react';
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import NextLink from 'next/link'
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import useAxiosPrivate from 'src/hooks/use-axios-private';
import { useFormik } from 'formik';
const FORGOT_PASSWORD_URL = '/auth/forgot-password'
const CHECK_EMAIL_URL = '/auth/check-email'

const Page = () => {
  const axiosPrivate = useAxiosPrivate()
  const [successMessage, setSuccessMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null
    },
    validationSchema: Yup.object({
        email : Yup
        .string()
        .email("Please enter a valid email")
        .test('unique-email', 'Email does not exist', 
        async (email) => {
            // Res from backend will be flag at res.data.success, true for 
            // username good, false otherwise
            const { data: { success } } = await axiosPrivate.post(CHECK_EMAIL_URL, JSON.stringify({email}),{headers: { 'Content-Type': 'application/json' }}
            );
            return success
          }
        )
        .required("Please enter email"),   
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await axiosPrivate.post(FORGOT_PASSWORD_URL,
        JSON.stringify({values}),{headers: { 'Content-Type': 'application/json' }})
        console.log(response)
        setSuccessMessage(response.data.message);
      } catch (err) {
        console.log(err)
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
          <TextField
            fullWidth
            label="Email"
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
            required
          />
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
          <NextLink href="/auth/login">
            <Button
              variant='outlined'
              sx={{ mt: 2, ml:1 }}
            >
              Go Back to login
            </Button>
          </NextLink>
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