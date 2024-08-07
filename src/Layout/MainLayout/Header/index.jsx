import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// project import
import AppBarStyled from './AppBarStyled';

// assets
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeProfile, setProfile } from 'src/store/services/profile/ProfileSlice';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from 'src/store/services/auth/authApiSlice';
import { useGetProfileQuery } from 'src/store/services/profile/ProfileApiSlice';
import { useTranslation } from 'react-i18next';
import { UserRolesEnum } from 'src/app/enums/roleList';
import { setCredentials } from 'src/store/services/auth/authSlice';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logout, { isLoading }] = useLogoutMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const userAuth = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.profile.user);

  const { data, isLoading: isLoadingProfile, isSuccess, isError, error, refetch } = useGetProfileQuery();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  // console.log('userAuth', userAuth, userProfile);

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setProfile(data.data));
      dispatch(setCredentials({ roles: data.data.user_type, userId: data.data.id }));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!userAuth.userId || !userAuth.roles) {
      refetch();
    }
  }, [location, navigate]);

  const settings = [{ label: 'Profilim', navigate: 'profile' }];

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogout = () => {
    logout()
      .then((res) => {
        localStorage.removeItem('user');
        dispatch(removeProfile());

        projectSnackbar(res?.data?.message || res?.error?.data?.message, { variant: 'info' });

        history.pushState(null, '', '/login');
        window.location.href = '/login';
      })
      .catch((err) => {
        projectSnackbar('000000', { variant: 'error' });
        localStorage.removeItem('user');
        dispatch(removeProfile());

        history.pushState(null, '', '/login');
        window.location.href = '/login';
      });
  };
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';

  // common header
  const mainHeader = (
    <Toolbar className="justify-between">
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: 'green', ml: { xs: 0, lg: -2 } }}
      >
        {!open ? <MenuOpenOutlinedIcon /> : <MenuOutlinedIcon />}
      </IconButton>

      <Box className="flex items-center gap-5">
        <Typography>{UserRolesEnum[userProfile?.user_type]?.label}</Typography>
        <span> / </span>
        <Typography>{userProfile ? `${userProfile.name} ${userProfile.last_name}` : ''}</Typography>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar className="bg-blue-300" alt="Remy Sharp" />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting.navigate} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link to={'/' + setting.navigate}> {setting.label} </Link>
                </Typography>
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">
                <Link> Çıkış Yap </Link>
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      // boxShadow: theme.customShadows.z1
    },
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default Header;
