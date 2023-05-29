import Head from 'next/head';
import { useState,useEffect } from 'react';
import { Alert, Box, Button, Card, CardActions, CardHeader, Divider, Modal, styled, Stack, Snackbar, SvgIcon, Table, Typography, TableBody, TableCell, TableHead, Tooltip, tooltipClasses, TableRow, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { DefaultLayout as HomeLayout } from 'src/layouts/home/layout';
import { useCategoryContext } from 'src/contexts/category-context';
import { CategoryProvider } from 'src/contexts/category-context';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import axios from 'src/api/axios';
const PROJECT_URL = '/projects/category/'
import { Scrollbar } from 'src/components/scrollbar';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const Page = () => {
  const [open, setOpen] = useState(false);
  const [projects,setProjects] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [document, setDocument] = useState('');
  const { categoryId } = useCategoryContext()

  const style = (theme) => ({
    width: 900,
    borderRadius: '12px',
    padding: '16px 32px 24px 32px',
    backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
    boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
  });

  const handleModalOpen = (projectDoc) => {
    
    setOpen(true);
    projectDoc?.map((doc) => {
        setDocument(doc.projectDoc)
    })
}
const handleModalClose = () => setOpen(false);

  const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

  const fetchProjects = async () => {
    if(categoryId){
      try{
      const response = await axios.get(PROJECT_URL + categoryId,{headers: { 'Content-Type': 'application/json' }})
      setProjects(response.data.data)
      }
      catch(err){
        setProjects('')
        setErrorMessage(err.response.data.message)
      }
    }
  }


    useEffect(() => {
      fetchProjects()
    },[categoryId])
 

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
        <Card sx={{ height: '100%' }}>
      <CardHeader />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                  S.No
                </TableCell>
                <TableCell>
                  Project Title
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  PI Name
                </TableCell>
                <TableCell>
                  ISRO Co-PI / Focal Point
                </TableCell>
                <TableCell>
                  Document
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align='center'>
                    No projects added yet.
                  </TableCell>
                </TableRow>
              ) : (projects.map((project,key) => (
                <TableRow
                hover
                key={key}
              >
                <TableCell>{key+1}</TableCell>
                <TableCell>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                  >
                    <Typography variant="subtitle2">
                      {project.projectTitle}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  {project.categoryId.categoryName.toUpperCase()}
                </TableCell>
                <TableCell>
                  {project.piName}
                </TableCell>
                <TableCell>
                  {project.focalPoint}
                </TableCell>
                
                <TableCell align='center'>
                <BootstrapTooltip title="View Document">
                    <Button
                            color="inherit"
                            startIcon={(
                                <SvgIcon fontSize="small">
                                    <DocumentTextIcon />
                                </SvgIcon>
                            )}
                            size="small"
                            variant="text"
                            sx={{minWidth:'auto',padding:'0'}}
                            onClick={() => handleModalOpen(project.projectDocs)}
                        >
                    </Button>
                    </BootstrapTooltip>
                </TableCell>
                
              </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      
    </Card>
    <StyledModal
                open={open}
                onClose={handleModalClose}
        
            >
                <Box sx={style}>
                    <iframe src={process.env.NEXT_PUBLIC_DOC_URL + document + "#toolbar=0"} width="100%" height='800px' className='pdf-container'></iframe>
                </Box>
        </StyledModal>
        <Snackbar 
        open={!!errorMessage} 
        autoHideDuration={3000} 
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
        <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
        </Alert>
    </Snackbar>
      </Container>
    </Box>
  </>
};

Page.getLayout = (page) => (
    <CategoryProvider>
      <HomeLayout>
          {page}
      </HomeLayout>
    </CategoryProvider>
);

export default Page;