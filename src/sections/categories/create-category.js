import { useCallback, useState } from 'react'
import { useCategory } from 'src/hooks/use-category'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from '../../api/axios'
const CREATE_CATEGORY_URL = '/categories'

import {
  Alert,  
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Snackbar,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const CreateCategory = () => {
  const category = useCategory();
  const [successMessage, setSuccessMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      categoryName: '',
      submit: null
    },
    validationSchema: Yup.object({
      categoryName: Yup
        .string()
        .matches(/^[aA-zZ\s&-]+$/, "Only alphabets are allowed for this field ")
        .max(255)
        .required('Category name is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        try {
            helpers.setSubmitting(true); // Set isSubmitting to true to disable the submit button
            const token = localStorage.getItem('token')
            const response = await axios.post(CREATE_CATEGORY_URL,
                JSON.stringify({values}),
                {
                  headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
                  withCredentials : false
                })
            // Handle the successful response here (e.g., show success message)
            console.log(response.data)
            category.addCategory(response.data)
            helpers.resetForm();
            setSuccessMessage(response.data.message);
          } catch (err) {
            // Handle the error here (e.g., show error message)
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.response.data.message });
            helpers.setSubmitting(false);
          } finally {
            helpers.setSubmitting(false); // Set isSubmitting back to false to enable the submit button
          }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
    <Snackbar 
        open={!!successMessage} 
        autoHideDuration={3000} 
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
            {successMessage}
        </Alert>
    </Snackbar>
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          title="Create New Category"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  error={!!(formik.touched.categoryName && formik.errors.categoryName)}
                  helperText={formik.touched.categoryName && formik.errors.categoryName}
                  fullWidth
                  label="Category Name"
                  name="categoryName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.categoryName}
                />
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
              </Grid>
              
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-start',ml:'18px'}}>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
    </>
  );
};
