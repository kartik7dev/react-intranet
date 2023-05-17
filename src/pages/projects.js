import { useCallback, useMemo, useState, useEffect } from 'react';
import axios from '../api/axios'
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ProjectsSearch } from 'src/sections/projects/projects-search';
import { ProjectsTable } from 'src/sections/projects/projects-table';
import { applyPagination } from 'src/utils/apply-pagination';
const PROJECT_URL = '/projects'

const now = new Date();



const Page = () => {
  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(false)
  const [delProjectId, setDelProjectId] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const [project,setProject] = useState([])
  const useProjects = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(project, page, rowsPerPage);
      },
      [project, page, rowsPerPage]
    );
  };

  useEffect(() => {
    setSuccessMessage(router.query.successMsg); // Alerts 'Someone'
  }, [router.query]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(PROJECT_URL,
          {
            headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
            withCredentials : false
          })
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

  fetchProjects();
}, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const projects = useProjects(page, rowsPerPage);
  // console.log(projects)

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const deleteProject = async () => {
    try {
      // Make an API call to delete category
      
      const response = await axios.patch(PROJECT_URL+'/delete',
        JSON.stringify({id : delProjectId}),
          {
            headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
            withCredentials : false
          })
      // Handle the successful response here (e.g., show success message)
    //   console.log(response.data);

    setProject((prevProjects) =>
    prevProjects.filter((proj) => proj._id !== delProjectId)
    );
    setSuccessMessage(response.data.message);
      setDelProjectId('')
      setOpen(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    
  }

  const handleDeleteProject = (projectId) => {
    setOpen(true)
    setDelProjectId(projectId)
  };

  const handleDeleteClose = () => {
    setDelCategoryId('')
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>
        Intranet IIRS Dashboard || Projects
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
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Projects
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export Excel
                  </Button>
                </Stack>
              </Stack>
              <div>
              <NextLink href="/projects/create">
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
                </NextLink>
              </div>
            </Stack>
            <ProjectsSearch />
            <ProjectsTable
              count={project.length}
              items={projects}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onDeleteProject={handleDeleteProject}
            />
          </Stack>
        </Container>
      </Box>

      <Dialog
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete project ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Do you really want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteProject} autoFocus>
            Yes
          </Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </DialogActions>
      </Dialog>

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

    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
