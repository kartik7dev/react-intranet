import PropTypes from 'prop-types';
import ArrowRightOnRectangleIcon from '@heroicons/react/24/solid/ArrowRightOnRectangleIcon';
import NextLink from 'next/link'
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { Logo } from 'src/components/logo';
import { useAuth } from 'src/hooks/use-auth';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const auth = useAuth();
  const userDetails = JSON.parse(auth.user);
  let redirect = {
    text : 'Login',
    url : '/auth/login'
  }
  if(userDetails){
    redirect = {
      text : 'Back to Dashboard',
      url : '/dashboard'
    }
  }
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor:  '#FFF',
          position: 'sticky',
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar + 200,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
            <Box
          component={NextLink}
          href="/"
          sx={{
            display: 'inline-flex',
            height: 32,
            width: 32
          }}
        >
          <Logo />
        </Box>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
          <Typography variant="h6" sx={{ textTransform: 'uppercase',letterSpacing: '2px'}}>Research & Development Projects at IIRS</Typography>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
             <NextLink href={redirect.url}>
                <Tooltip title={redirect.text}>
                <IconButton>
                    <Badge
                    >
                    <SvgIcon fontSize="small">
                        <ArrowRightOnRectangleIcon />
                    </SvgIcon>
                    </Badge>
                </IconButton>
                </Tooltip>
            </NextLink>
            
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};