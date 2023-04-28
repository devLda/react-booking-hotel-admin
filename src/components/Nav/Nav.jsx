import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// user
import user from '../../api/user';
// hooks
// import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../assets/logo.png';
import Scrollbar from '../UI/scrollbar';
import NavSection from '../UI/nav-section';
//
import navConfig from './NavConfig';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const Nav = ({ openNav, onCloseNav }) => {
    const { pathname } = useLocation();

    // const isDesktop = useResponsive('up', 'lg');
    const isDesktop = true
  
    useEffect(() => {
      if (openNav) {
        onCloseNav();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
  
    const renderContent = (
      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        }}
      >
        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
            <Link to='/dashboard'>
                <img src={Logo} alt="logo" />
            </Link>
        </Box>
  
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none">
            <StyledAccount>
              <Avatar src={user.photoURL} alt="photoURL" />
  
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {user.displayName}
                </Typography>
  
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user.role}
                </Typography>
              </Box>
            </StyledAccount>
          </Link>
        </Box>
  
        <NavSection data={navConfig} />
  
        <Box sx={{ flexGrow: 1 }} />

      </Scrollbar>
    );
  
    return (
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV_WIDTH },
        }}
      >
        {isDesktop ? (
          <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
              },
            }}
          >
            {renderContent}
          </Drawer>
        ) : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: { width: NAV_WIDTH },
            }}
          >
            {renderContent}
          </Drawer>
        )}
      </Box>
    );
}


// ----------------------------------------------------------------------

Nav.propTypes = {
    openNav: PropTypes.bool,
    onCloseNav: PropTypes.func,
};

export default Nav