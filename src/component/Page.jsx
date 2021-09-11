import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CropFreeIcon from '@material-ui/icons/CropFree';
import ReorderIcon from '@material-ui/icons/Reorder';
import SearchIcon from '@material-ui/icons/Search';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useState } from 'react';
import { useParams } from 'react-router';
import authService from 'services/auth.service';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  container: {
    padding: '1rem',
    height: 0,
    overflowX: 'hidden',
    flex: '1000 1 auto',
    position: 'relative',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    objectFit: 'scale-down',
    maxHeight: '2rem',
    width: 'auto',
    marginRight: '1rem',
  },
  toolbar: {
    position: 'sticky',
    top: 0,
  },
  bottomNav: {
    flexGrow: 1,
    position: 'sticky',
    bottom: 0,
  },
}));

/**
 *
 * @param {string} path
 * @returns
 */
const resolveValue = (path) => {
  if (path.startsWith('/companies')) {
    if (path.endsWith('/trace')) {
      return 2;
    } else if (path.endsWith('/monitoring')) {
      return 3;
    }
    return 1;
  }
  return 0;
};

const Page = ({ title, children, ...props }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { company, entityType, id } = useParams();
  const [value, setValue] = useState(resolveValue(pathname));

  const onClick = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <img src='/icon_x192.png' className={classes.logo} alt='Logo' />
          <Typography variant='h6' className={classes.title}>
            {title}
          </Typography>
          {authService.isUserLoggedIn() && (
            <IconButton component={Link} to='/user-config' color='inherit'>
              <AccountCircleIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Container
        maxWidth='md'
        className={classes.container}
        id='page-container'
        {...props}
      >
        {children}
      </Container>
      {authService.isUserLoggedIn() && (
        <BottomNavigation
          component={Paper}
          elevation={3}
          value={value}
          onChange={onClick}
          showLabels
          className={classes.bottomNav}
        >
          <BottomNavigationAction
            component={Link}
            to={'/qr-code-scanner'}
            label='QrCode'
            icon={<CropFreeIcon />}
          />
          {company && (
            <BottomNavigationAction
              component={Link}
              to={`/companies/${company}/${entityType}/${id}`}
              label='Details'
              icon={<ReorderIcon />}
            />
          )}
          {company &&
            authService.getActiveUser().role === 'supervisor' && [
              <BottomNavigationAction
                component={Link}
                to={`/companies/${company}/${entityType}/${id}/trace`}
                label='TNT'
                icon={<SearchIcon />}
                key='tnt'
              />,
              <BottomNavigationAction
                component={Link}
                to={`/companies/${company}/${entityType}/${id}/monitoring`}
                label='Monitoring'
                icon={<BarChartIcon />}
                key='monitoring'
              />,
            ]}
        </BottomNavigation>
      )}
    </>
  );
};

export default Page;
