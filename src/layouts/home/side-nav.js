import {useState, useEffect} from 'react'
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  useMediaQuery
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SideNavItem } from './side-nav-item';
import ListBulletIcon from '@heroicons/react/24/outline/ListBulletIcon';
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import { SvgIcon } from '@mui/material';
import axios from 'src/api/axios';
const CATEGORY_URL = '/categories/category-tree'


export const SideNav = (props) => {
  const { open, onClose } = props;
 
//   const pathname = usePathname();
  const [items,setItems] = useState([])

  const fetchCategories = async () => {
    try {
      // Make an API call to fetch categories

      const response = await axios.get(CATEGORY_URL,{headers: { 'Content-Type': 'application/json' }})
    // Update the categories state
    const categories = response.data.data;

    // Create the items array
    const categoryItem = categories.map((category) => ({
      title: category.categoryName,
      categoryId: category._id,
      icon: (
        <SvgIcon fontSize="small">
          <EnvelopeIcon />
        </SvgIcon>
      ),
      subItems : category.subcategories
    }));

    setItems(categoryItem);

    // Export the items array
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories()
  },[])

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'block',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
            //   const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                //   active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  categoryId={item.categoryId}
                  title={item.title}
                  subItems={item.subItems}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#fff',
            color: 'common.white',
            width: 280,
            position : 'relative'
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
            backgroundColor: '#fff',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
