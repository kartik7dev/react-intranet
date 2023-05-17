import { useCallback, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from '../../api/axios'
const CATEGORY_URL = '/categories'

import { 
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const CreateCategory = ({onCreateCategory,categories,categoryToEdit,setCategory,setSuccessMessage }) => { 
    
    const initialValues = {
        id : '',
        categoryName: categoryToEdit.length !== 0 ? categoryToEdit.categoryName: '',
        parentId: categoryToEdit.length !== 0 ? categoryToEdit.parentId: '',
        submit: null
    }
   
    const cardStyle = {
        border: categoryToEdit.length !== 0 ? '1px solid yellow' : 'none', // Add border when categoryToEdit is not an empty string
        boxShadow: categoryToEdit.length !== 0 ? '0 0 8px rgba(255, 255, 0, 0.5)' : 'none',
        transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
      };
    
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      categoryName: Yup
        .string()
        .matches(/^[aA-zZ\s&-]+$/, "Only alphabets are allowed for this field ")
        .max(255)
        .required('Category name is required'),
        parentId: Yup
        .string()
        .max(255)  
    }),
    onSubmit: async (values, helpers) => {
        try {
            helpers.setSubmitting(true); // Set isSubmitting to true to disable the submit button
            const token = localStorage.getItem('token')
            let response;
            // Update Category
            if (categoryToEdit.length !== 0) {
                response = await axios.patch(CATEGORY_URL,
                    JSON.stringify({values}),
                    {
                    headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
                    withCredentials : false
                    })
                // Handle the successful response here (e.g., show success message)
                onCreateCategory(response.data.data,true)
                cancelCategoryUpdate()
                setSuccessMessage(response.data.message);
            //  Create Category   
            } else{
                response = await axios.post(CATEGORY_URL,
                    JSON.stringify({values}),
                    {
                    headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
                    withCredentials : false
                    })
                // Handle the successful response here (e.g., show success message)
                onCreateCategory(response.data.data,false)
                cancelCategoryUpdate()
                setSuccessMessage(response.data.message);
            }
          } catch (err) {
            // Handle the error here (e.g., show error message)
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.response.data.message });
            helpers.setSubmitting(false);
          } finally {
            helpers.setSubmitting(false); // Set isSubmitting back to false to enable the submit button
          }
    }
  })
  const cancelCategoryUpdate = () => {
    setCategory([])
    formik.resetForm()
  }  
  useEffect(() => {
    formik.setFieldValue('categoryName', categoryToEdit.categoryName);
    formik.setFieldValue('id', categoryToEdit._id);
    formik.setFieldValue('parentId', categoryToEdit.parentId ? categoryToEdit.parentId._id : '');
  }, [categoryToEdit]);

  return (
    <>
   
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Card sx={cardStyle}>
        <CardHeader
          title={categoryToEdit.length !== 0 ? 'Update Category':'Create New Category'}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
                 <Grid xs={12} md={12}>
                 <TextField
                  fullWidth
                  label="Parent Category"
                  name="parentId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.parentId}
                  select
                  SelectProps={{ native: true }}
                >
                    <option value="">None</option>
                  {categories.map((option) => (
                    <option
                      key={option._id}
                      value={option._id}
                    >
                      {option.categoryName}
                    </option>
                 ))}
                </TextField>
                 
                    
             </Grid>
              
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
            {categoryToEdit.length !== 0 ? 'Update details':'Save details'}
          </Button>
          {categoryToEdit.length !== 0 && <Button type="submit" color="error" variant="contained" onClick={cancelCategoryUpdate}>
            Cancel
          </Button>}
        </CardActions>
      </Card>
    </form>
    </>
  );
};
