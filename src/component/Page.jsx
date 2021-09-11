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
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CropFreeIcon from "@material-ui/icons/CropFree";
import ReorderIcon from "@material-ui/icons/Reorder";
import SearchIcon from "@material-ui/icons/Search";
import BarChartIcon from "@material-ui/icons/BarChart";
import { useState } from "react";
import authService from "services/auth.service";
import pieceStore from "store/piece.store";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  container: {
    padding: "1rem",
    height: 0,
    overflowX: "hidden",
    flex: "1000 1 auto",
    position: "relative",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    objectFit: "scale-down",
    maxHeight: "2rem",
    width: "auto",
    marginRight: "1rem",
  },
  toolbar: {
    position: "sticky",
    top: 0,
  },
  bottomNav: {
    flexGrow: 1,
    position: "sticky",
    bottom: 0,
  },
}));

/**
 *
 * @param {string} path
 * @returns
 */
const resolveValue = (path) => {
  if (path.startsWith("/companies")) {
    if (path.endsWith("/trace")) {
      return 2;
    }
    return 1;
  } else if (path === "/monitoring") {
    return 3;
  } else {
    return 0;
  }
};

const Page = ({ title, children }) => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const [value, setValue] = useState(resolveValue(pathname));

  const onClick = (event, newValue) => {
    setValue(newValue);
  };

  console.log(value);

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <img src="/icon_x192.png" className={classes.logo} alt="Logo" />
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>

          {authService.isUserLoggedIn() && (
            <IconButton component={Link} to="/user-config" color="inherit">
              <AccountCircleIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        className={classes.container}
        id="page-container"
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
            to={"/qr-code-scanner"}
            label="QrCode"
            icon={<CropFreeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={`/companies/${pieceStore.getCompany()}/pieces/${pieceStore.getId()}`}
            label="Details"
            icon={<ReorderIcon />}
          />
          {authService.getActiveUser().role === "supervisor" && [
            <BottomNavigationAction
              component={Link}
              to={`/companies/${pieceStore.getCompany()}/pieces/${pieceStore.getId()}/trace`}
              label="TNT"
              icon={<SearchIcon />}
            />,
            <BottomNavigationAction
              // component={Link}
              // to={"/qr-code-scanner"}
              label="Monitoring"
              icon={<BarChartIcon />}
            />,
          ]}
        </BottomNavigation>
      )}
    </>
  );
};

export default Page;
