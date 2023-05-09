import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateCategory } from 'src/sections/categories/create-category';
import { CategoryList } from 'src/sections/categories/category-list';
import axios from '../api/axios'
const CREATE_CATEGORY_URL = '/categories'

const Page = () => {

    const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, []);

  const fetchCategories = async () => {
    try {
      // Make an API call to fetch categories
      const token = localStorage.getItem('token')
      const response = await axios.get(CREATE_CATEGORY_URL,
          {
            headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
            withCredentials : false
          })
      // Handle the successful response here (e.g., show success message)
    //   console.log(response.data);

      // Update the categories state
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  return (<>
    <Head>
      <title>
      Intranet IIRS Dashboard || Categories
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Categories
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <CreateCategory />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <CategoryList
              title="Project Categories"
              categories={categories}
              sx={{ height: '100%' }}
            />
                
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>)
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
