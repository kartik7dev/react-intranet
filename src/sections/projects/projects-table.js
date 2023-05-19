import { useState } from 'react'
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {
    Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Fade,
  Modal,
  Stack,
  SvgIcon,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  tooltipClasses,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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


  

  
  const blue = {
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
  };
  
  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
  
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
  
  
  const style = (theme) => ({
    width: 900,
    borderRadius: '12px',
    padding: '16px 32px 24px 32px',
    backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
    boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
  });

export const ProjectsTable = (props) => {
    const [open, setOpen] = useState(false);
    const [document, setDocument] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  
    const nextPage = () => {
      if (pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
      }
    };
  
    const prevPage = () => {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    };
    const handleModalOpen = (projectDoc) => {
    
        setOpen(true);
        projectDoc?.map((doc) => {
            setDocument(doc.projectDoc)
        })
    }
    const handleModalClose = () => setOpen(false);

  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    onDeleteProject
  } = props;

  const router = useRouter();

  const handleProjectEdit = (projectId) => {
    router.push(`/projects/edit/${projectId}`);
};

const addProjectReview = (pid) => {
    router.push({pathname : '/projects/create-review',query : {pid}},'/projects/create-review');     
}

  return (
    <Card>
      <Scrollbar>
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
                  Posted By
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? <TableCell colSpan={6} align="center">No Projects found</TableCell>: items.map((project,key) => {
        
                return (
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
                      {project.categoryId.categoryName}
                    </TableCell>
                    <TableCell>
                      {project.piName}
                    </TableCell>
                    <TableCell>
                      {project.focalPoint}
                    </TableCell>
                    <TableCell>
                      {project.userId.firstName} {project.userId.lastName}
                    </TableCell>
                    <TableCell>
                    <BootstrapTooltip title="Edit Project">
                        <Button
                                color="primary"
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                <PencilSquareIcon/>
                                    </SvgIcon>
                                )}
                                size="small"
                                variant="text"
                                sx={{minWidth:'auto',padding:'0'}}
                                onClick={() => handleProjectEdit(project._id)}
                            >
                        </Button>
                        </BootstrapTooltip>
                        <BootstrapTooltip title="Delete Project">
                            <Button
                                    color="inherit"
                                    startIcon={(
                                        <SvgIcon fontSize="small" color="error">
                                            <TrashIcon />
                                        </SvgIcon>
                                    )}
                                    size="small"
                                    variant="text"
                                    sx={{minWidth:'auto',padding:'0'}}
                                    onClick={() => onDeleteProject(project._id)}
                                    >
                            </Button>
                        </BootstrapTooltip>
                        <BootstrapTooltip title="Add Project Review">
                        <Button
                                color="inherit"
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                        <ClipboardDocumentListIcon />
                                    </SvgIcon>
                                )}
                                size="small"
                                variant="text"
                                sx={{minWidth:'auto',padding:'0'}}
                                onClick={() => addProjectReview(project._id)}
                            >
                        </Button>
                        </BootstrapTooltip>
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
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

        <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleModalClose}
        
            >
                <Box sx={style}>
                    {/* <iframe src={process.env.NEXT_PUBLIC_DOC_URL + '/' + document + "#toolbar=0"} width="100%" height='800px' onContextMenu={(e) => e.preventDefault()}></iframe> */}
                    <Document
                        onLoadSuccess={onDocumentLoadSuccess}
                        file={process.env.NEXT_PUBLIC_DOC_URL + '/' + document}
                        onContextMenu={(e) => e.preventDefault()}
                        className="pdf-container"
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                </Box>
        </StyledModal>
    </Card>

    
  );
};

ProjectsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
