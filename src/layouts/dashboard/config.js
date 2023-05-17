import QueueListIcon from '@heroicons/react/24/outline/QueueListIcon';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Home',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: (
      <SvgIcon fontSize="small">
        <QueueListIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Users',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
 
];
