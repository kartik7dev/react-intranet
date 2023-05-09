import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useCategoryContext } from 'src/contexts/category-context';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
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
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const CategoryList = (props) => {
  const { categories = [], sx, title } = props;
  const cat = useCategoryContext();
  console.log(cat)

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
                  Project Category
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat,key) => {
                return (
                  <TableRow
                    hover
                    key={key}
                  >
                    <TableCell>
                      {key+1}
                    </TableCell>
                    <TableCell>
                      {cat.categoryName}
                    </TableCell>
                    <TableCell>
                      icon
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
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
      </CardActions>
    </Card>
  );
};

CategoryList.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
