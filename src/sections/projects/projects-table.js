import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const ProjectsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const router = useRouter();

  const handleProjectEdit = (projectId) => {
    router.push(`/projects/edit/${projectId}`);
};

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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? <TableCell colSpan={6} align="center">No Projects found</TableCell>: items.map((project,key) => {
        
                return (
                  <TableRow
                    hover
                    key={project.id}
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
                    <Button
                                color="inherit"
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                <PencilSquareIcon/>
                                    </SvgIcon>
                                )}
                                size="small"
                                variant="text"
                                onClick={() => handleProjectEdit(project._id)}
                            >
                        </Button>
                        <Button
                                color="inherit"
                                startIcon={(
                                    <SvgIcon fontSize="small" color="error">
                                        <TrashIcon />
                                    </SvgIcon>
                                )}
                                size="small"
                                variant="text"
                                
                            >
                        </Button>
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
