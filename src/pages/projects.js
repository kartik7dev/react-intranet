import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import { subDays, subHours } from 'date-fns';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ProjectsSearch } from 'src/sections/projects/projects-search';
import { ProjectsTable } from 'src/sections/projects/projects-table';
import { applyPagination } from 'src/utils/apply-pagination';
import { useAuth } from 'src/hooks/use-auth';
import useAxiosPrivate from 'src/hooks/use-axios-private';
const PROJECT_URL = '/projects'

const now = new Date();



const Page = () => {
  const {user} = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [open, setOpen] = useState(false)
  const [delProjectId, setDelProjectId] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleSearch = async(query) => {
      setSearchValue(query)
      const response = await axiosPrivate.get(PROJECT_URL,{
        params: {
          query,
          page: page + 1, // Adjust page number to 1-indexed for server-side
          perPage: rowsPerPage,
        }  
        });
        setProjects(response.data.projects);
        setTotalCount(response.data.totalCount);  
  };

  const usePaginatedProjects = useMemo(() => {
    return applyPagination(projects, page, rowsPerPage);
  }, [projects, page, rowsPerPage]);

  useEffect(() => {
    setSuccessMessage(router.query.successMsg); // Alerts 'Someone'
  }, [router.query]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosPrivate.get(PROJECT_URL, {
          params: {
            page: page + 1, // Adjust page number to 1-indexed for server-side
            perPage: rowsPerPage,
          },
        });
        setProjects(response.data.projects);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [page, rowsPerPage]);
 
  // console.log(projects)

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(0); // Reset to first page when changing rows per page
  }, []);

  const deleteProject = async () => {
    try {
      // Make an API call to delete category
      
      const response = await axiosPrivate.patch(PROJECT_URL+'/delete',JSON.stringify({id : delProjectId}),{headers: {'Content-Type': 'application/json'}})
      // Handle the successful response here (e.g., show success message)
    //   console.log(response.data);

    setProjects((prevProjects) =>
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
    setOpen(false);
  };

  const handleExportExcel = async () => {
    try {
      const response = await axiosPrivate.post(PROJECT_URL+ '/export', null, {
        responseType: 'blob', // Set the response type to blob
      });
      // Handle the response here (e.g., download the file)

      const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'projects.xlsx');
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up the temporary link element
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      // You can access the file data in the response using response.data
      console.log('Excel export response:', response);
    } catch (error) {
      console.error('Error exporting projects to Excel:', error);
    }
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
                    onClick={handleExportExcel}
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
            <ProjectsSearch onSearch={handleSearch}/>
            <ProjectsTable
              searchTerm={searchValue}
              count={totalCount}
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
