import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { useAuth } from 'src/hooks/use-auth';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const CategoryList = (props) => {
    const {token} = useAuth()
    const { categories = [], sx, title, onEditCategory, onDeleteCategory  } = props;
    return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  S.No
                </TableCell>
                <TableCell>
                  Child Category
                </TableCell>
                <TableCell>
                  Parent Category
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align='center'>
                    No category added yet.
                  </TableCell>
                </TableRow>
              ) : (categories.map((cat,key) => (
                  <TableRow
                    hover
                    key={key}
                  >
                    <TableCell>
                      {key+1}
                    </TableCell>
                    <TableCell>
                      {cat.categoryName.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {cat?.parentId?.categoryName.toUpperCase()}
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
                                onClick={() => onEditCategory(cat)}
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
                                onClick={() => onDeleteCategory(cat)}
                            >
                        </Button>
                       
                   
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions> */}
    </Card>
  );
};

CategoryList.propTypes = {
    categories: PropTypes.array,
    sx: PropTypes.object,
    title: PropTypes.string,
    onEditCategory: PropTypes.func,
    onDeleteCategory: PropTypes.func
};
