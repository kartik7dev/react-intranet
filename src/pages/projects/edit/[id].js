import { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Container,Divider, Input, SvgIcon, Stack, TextField, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DocumentTextIcon from "@heroicons/react/24/solid/DocumentTextIcon";
const CATEGORY_URL = '/categories'
const PROJECT_URL = '/projects'
import useAxiosPrivate from 'src/hooks/use-axios-private';
const validFileExtensions = { application: ['pdf'] };

function isValidFileType(fileName, fileType) {
    const fileExtension = fileName.split('.').pop()
    return fileName && fileType.some(category => validFileExtensions[category].includes(fileExtension));
  }

  const initialValues = {
    id : '',
    projectTitle : '',
    categoryId : '',
    piName : '', 
    focalPoint : '', 
    projectType : '',
    projectDoc : '', 
    submit: null
}

const Page = () => {
    const axiosPrivate = useAxiosPrivate()
    const router = useRouter();
    const { id } = router.query;
    const [categories, setCategories] = useState([])
    const token = localStorage.getItem('token')        
    

      const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
          projectTitle : Yup
            .string()
            .matches(/^[aA-zZ\s&-.:]+$/, "Only alphabets are allowed for this field")
            .max(255)
            .required('Project Title is required'),
          categoryId : Yup
            .string()
            .required('Project Category is required'),
          piName : Yup
            .string()
            .matches(/^[aA-zZ\s&-.]+$/, "Only alphabets are allowed for this field")
            .max('255')
            .required('PI Name is required'),
          focalPoint : Yup
          .string()
          .matches(/^[aA-zZ\s&-.]+$/, "Only alphabets are allowed for this field")
          .max('255')
          .required('ISRO Co-Pi/Focal Point is required'),     
          projectType : Yup
          .string()
          .required('Project Type is required'),     
          projectDoc : Yup
          .mixed()
          .test("FILE_FORMAT",
          "Only .pdf files are allowed",
          value => {
            if(!value) return true;
            return isValidFileType(value.name.toLowerCase(), ["application"])
          }
            
          ),        
        }),
        onSubmit: async (values, helpers) => {
            try {
                helpers.setSubmitting(true); // Set isSubmitting to true to disable the submit button
                const formData = new FormData();
                // Loop through the values object and append each key-value pair to the FormData
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                const response = await axiosPrivate.patch(PROJECT_URL,formData)
                    // Handle the successful response here (e.g., show success message)
                router.push({pathname : '/projects',query : {successMsg:response.data.message}},'/projects');   
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
      
      useEffect(() => {
        fetchCategories()
        
      }, []);

      useEffect(() => {
        fetchProjectById(id)
      },[formik.setValues])

      
      const fetchCategories = async () => {
        try {
          // Make an API call to fetch categories
          
          const response = await axiosPrivate.get(CATEGORY_URL)
              setCategories(response.data);
          
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      const fetchProjectById = async (projectId) => {
        try {
          // Make an API call to fetch categories
          
          const response = await axiosPrivate.get(PROJECT_URL + '/get/'+ projectId)
              formik.setValues(response.data.data);
          // Handle the successful response here (e.g., show success message)
        //   console.log(response.data);
    
          // Update the project state
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };

      
  return <>
    <Head>
      <title>
      Intranet IIRS Dashboard || Edit Project
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
              Edit Project
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
        onSubmit={formik.handleSubmit}
        >
        <Card>
            <CardHeader
            title="update your project here"
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
                     error={!!(formik.touched.projectTitle && formik.errors.projectTitle)}
                     helperText={formik.touched.projectTitle && formik.errors.projectTitle}
                      fullWidth
                      label="Project Title"
                      name="projectTitle"
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
                     error={!!(formik.touched.categoryId && formik.errors.categoryId)}
                     helperText={formik.touched.categoryId && formik.errors.categoryId}
                    fullWidth
                    label="Select Category"
                    name="categoryId"
                    onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={formik.values.categoryId}
                    >
                    <option>Select</option>    
                    {categories.map((cat,key) => (
                        <option
                        key={key}
                        value={cat._id}
                        >
                        {cat.categoryName.toUpperCase()}
                        </option>
                    ))}
                    </TextField>
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                >
                    <TextField
                     error={!!(formik.touched.piName && formik.errors.piName)}
                     helperText={formik.touched.piName && formik.errors.piName}
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
                     error={!!(formik.touched.focalPoint && formik.errors.focalPoint)}
                     helperText={formik.touched.focalPoint && formik.errors.focalPoint}
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
                     error={!!(formik.touched.projectType && formik.errors.projectType)}
                     helperText={formik.touched.projectType && formik.errors.projectType}
                    fullWidth
                    label="Select Status"
                    name="projectType"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={formik.values.projectType}
                    >
                    <option>Select</option>
                    <option value="0">Ongoing</option>
                    <option value="1">Completed</option>
                    </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                            fullWidth
                            error={!!(formik.touched.projectDoc && formik.errors.projectDoc)}
                            helperText={formik.touched.projectDoc && formik.errors.projectDoc}
                            label="Upload File"
                            name="projectDoc"
                            type="file"
                            onChange={(event) => { formik.setFieldValue("projectDoc", event.target.files[0])}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            InputProps={{
                            inputProps: {
                                accept: 'application/*', // Set the accepted file types if needed
                            },
                           
                            }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.values?.projectDocs?.map((doc,key) => (
                     <NextLink key={key} href={process.env.NEXT_PUBLIC_DOC_URL + '/' + doc.projectDoc} target='_blank'>

                     <Button
                                color="error"
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                         <DocumentTextIcon/>
                                    </SvgIcon>
                                )}
                                size="small"
                                variant=""
                                
                                >
                         
                        </Button>
                    </NextLink>
                    ))}
                    <Typography sx={{ fontSize: '0.875rem' }} color='error'> Uploading Documents here will replace the previous uploaded doc</Typography>

                </Grid>
               
                </Grid>
            </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
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
