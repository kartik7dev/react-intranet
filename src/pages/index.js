import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { DefaultLayout as HomeLayout } from 'src/layouts/home/layout';

const Page = () => {


 

  return <>
    <Head>
      <title>
        Intranet || Home Page
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
        </Grid>
      </Container>
    </Box>
  </>
};

Page.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Page;