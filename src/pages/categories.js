import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateCategory } from 'src/sections/categories/create-category';
import { CategoryList } from 'src/sections/categories/category-list';

const Page = () => (
  <>
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
              orders={[
                {
                  id: 1,
                  project_title: 'Modelling Spatio-temporal Forest Growth Dynamics using Dendroclimatological and Remote Sensing Observations in North East India',
                  pi_name: 'Prof. S.K. Tripathi',
                  isrocopi: 'Dr. Arijit Roy',
                },
                {
                  id: 2,
                  project_title: 'Modelling Spatio-temporal Forest Growth Dynamics using Dendroclimatological and Remote Sensing Observations in North East India',
                  pi_name: 'Prof. S.K. Tripathi',
                  isrocopi: 'Dr. Arijit Roy',
                },
                {
                  id: 3,
                  project_title: 'Modelling Spatio-temporal Forest Growth Dynamics using Dendroclimatological and Remote Sensing Observations in North East India',
                  pi_name: 'Prof. S.K. Tripathi',
                  isrocopi: 'Dr. Arijit Roy',
                },
                {
                  id: 4,
                  project_title: 'Modelling Spatio-temporal Forest Growth Dynamics using Dendroclimatological and Remote Sensing Observations in North East India',
                  pi_name: 'Prof. S.K. Tripathi',
                  isrocopi: 'Dr. Arijit Roy',
                },
                {
                  id: 5,
                  project_title: 'Modelling Spatio-temporal Forest Growth Dynamics using Dendroclimatological and Remote Sensing Observations in North East India',
                  pi_name: 'Prof. S.K. Tripathi',
                  isrocopi: 'Dr. Arijit Roy',
                },
                {
                  id: 6,
                  project_title: 'Modelling Spatio-temporal Forest Growth Dynamics using Dendroclimatological and Remote Sensing Observations in North East India',
                  pi_name: 'Prof. S.K. Tripathi',
                  isrocopi: 'Dr. Arijit Roy',
                }
              ]}
              sx={{ height: '100%' }}
            />
                
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
