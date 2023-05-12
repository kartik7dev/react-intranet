import Head from 'next/head';
import { useState,useEffect } from 'react'
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserCount } from 'src/sections/home/user-count';
import { CategoryCount } from 'src/sections/home/category-count';
import { ProjectCount } from 'src/sections/home/project-count';
import axios from '../api/axios'
const CATEGORY_COUNT_URL = '/categories/count'

const now = new Date();

const Page = () => {
  
  useEffect(() => {
    fetchCategoryCount()
  }, []);

  const [categoryCount,setCategoryCount] = useState('')

  const fetchCategoryCount = async () => {
    try {
      // Make an API call to fetch categories
      const token = localStorage.getItem('token')
      const response = await axios.get(CATEGORY_COUNT_URL,
          {
            headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
            withCredentials : false
          })
      // Handle the successful response here (e.g., show success message)
    //   console.log(response.data);

      // Update the categories count
      setCategoryCount(response.data.count);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  return <>
    <Head>
      <title>
        Intranet || IIRS Dashboard
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <ProjectCount
              sx={{ height: '100%' }}
              value={0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <CategoryCount
              sx={{ height: '100%' }}
              value={categoryCount}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <UserCount
              sx={{ height: '100%' }}
              value={1}
            />
          </Grid>
          
          
          
          
          
        </Grid>
      </Container>
    </Box>
  </>
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;