import { useCallback, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Container, Stack, TextField, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from 'src/hooks/use-auth';
const PROJECT_URL = '/projects'

const Page = () => {
      const auth = useAuth()
      const initialValues = {
          id : '',
          projectTitle : '',
          userId : auth.userId,
          categoryId : '',
          piName : '', 
          focalPoint : '', 
          projectType : '',
          projectDoc : '', 
          submit: null
      }

      const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
          projectTitle : Yup
            .string()
            .matches(/^[aA-zZ\s&-]+$/, "Only alphabets are allowed for this field ")
            .max(255)
            .required('Project Title is required'),
          categoryId : Yup
            .string()
            .required(),
          piName : Yup
            .string()
            .matches(/^[aA-zZ\s&-]+$/, "Only alphabets are allowed for this field ")
            .max('255')
            .required(),
          focalPoint : Yup
          .string()
          .matches(/^[aA-zZ\s&-]+$/, "Only alphabets are allowed for this field ")
          .max('255')
          .required(),     
          projectType : Yup
          .string()
          .required(),     
          projectDoc : Yup
          .mixed()
          .required(),     
        }),
        onSubmit: async (values, helpers) => {
            try {
                helpers.setSubmitting(true); // Set isSubmitting to true to disable the submit button
                const token = localStorage.getItem('token')               
                const response = await axios.patch(PROJECT_URL,
                        JSON.stringify({values}),
                        {
                        headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
                        withCredentials : false
                        })
                    // Handle the successful response here (e.g., show success message)
                    setSuccessMessage(response.data.message);
                //  Create Category   
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
  
      const handleChange = useCallback(
        (event) => {
          setValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
          }));
        },
        []
      );
    
      const handleSubmit = useCallback(
        (event) => {
          event.preventDefault();
        },
        []
      );
  return <>
    <Head>
      <title>
      Intranet IIRS Dashboard || Add Project
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Add Project
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
                lg={12}
              >
                    <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        >
        <Card>
            <CardHeader
            title="Submit a new project"
            />
            <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
                <Grid
                container
                spacing={3}
                >
                <Grid
                    xs={12}
                    md={6}
                >
                    <TextField
                      fullWidth
                      label="Project Title"
                      name="Project Title"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      required
                      value={formik.values.projectTitle}
                    />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                >
                    <TextField
                      fullWidth
                      label="Select Category"
                      name="categoryId"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      required
                      value={formik.values.categoryId}
                    />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                >
                    <TextField
                    fullWidth
                    label="PI Name"
                    name="piName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.piName}
                    />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                >
                    <TextField
                    fullWidth
                    label="ISRO Co-Pi / Focal Point"
                    name="focalPoint"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.focalPoint}
                    />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                >
                    <TextField
                    fullWidth
                    label="Project Type"
                    name="projectType"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.projectType}
                    />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                >
                    <TextField
                    fullWidth
                    label="Select State"
                    name="state"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.state}
                    >
                    {states.map((option) => (
                        <option
                        key={option.value}
                        value={option.value}
                        >
                        {option.label}
                        </option>
                    ))}
                    </TextField>
                </Grid>
                </Grid>
            </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained">
                Save details
            </Button>
            </CardActions>
        </Card>
        </form>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
