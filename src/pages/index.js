import {React, useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Tabs, Tab, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';


const now = new Date();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
return(  
  <>
    <Head>
      <title>
        Intranet IIRS Dashboard
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
            md={12}
            lg={12}
          >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Respond" {...a11yProps(0)} />
              <Tab label="TDP" {...a11yProps(1)} />
              <Tab label="EOAM" {...a11yProps(2)} />
              <Tab label="IGBP" {...a11yProps(3)} />
              <Tab label="DMSP" {...a11yProps(4)} />
              <Tab label="Other Projects" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <h6>RESPOND</h6>
           </Grid>
            <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <OverviewLatestOrders
              title="Respond"
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            TDP
          </TabPanel>
          <TabPanel value={value} index={2}>
            EOAM
          </TabPanel>
          <TabPanel value={value} index={3}>
            IGBP
          </TabPanel>
          <TabPanel value={value} index={4}>
            DMSP
          </TabPanel>
          <TabPanel value={value} index={5}>
            Other Projects
          </TabPanel>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  </>
);

}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
