import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CropFreeIcon from "@material-ui/icons/CropFree";
import ReorderIcon from "@material-ui/icons/Reorder";
import SearchIcon from "@material-ui/icons/Search";
import BarChartIcon from "@material-ui/icons/BarChart";
import { useState } from "react";
import authService from "services/auth.service";
import pieceStore from "store/piece.store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "2rem",
    paddingBottom: "2rem",
    overflowX: "hidden",
    flex: "1000 1 auto",
  },
}));

const Page = ({ title, children }) => {
  const classes = useStyles();
  const [value, setValue] = useState("QrCode Scanner");

  const onClick = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IconButton component={Link} to="/user-config" color="inherit">
            <AccountCircleIcon />
          </IconButton>
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
          value={value}
          onChange={onClick}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            component={Link}
            to={"/qr-code-scanner"}
            label="QrCode Scanner"
            icon={<CropFreeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={`/companies/${pieceStore.getCompany()}/pieces/${pieceStore.getId()}`}
            label="Details"
            icon={<ReorderIcon />}
          />
          <BottomNavigationAction
            component={Link}
            // to={"/qr-code-scanner"}
            label="TNT"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            component={Link}
            // to={"/qr-code-scanner"}
            label="Monitoring"
            icon={<BarChartIcon />}
          />
        </BottomNavigation>
      )}
    </>
  );
};

export default Page;
