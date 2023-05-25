import { styled } from '@mui/material/styles';
import { TopNav } from './top-nav';
import { SideNav } from './side-nav';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'row',
  width: '100%'
});

export const DefaultLayout = (props) => {
  const { children } = props;

  return (
    <>
      <TopNav />
      <LayoutRoot>
        <SideNav/>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};
