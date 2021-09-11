import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Dialog,
  IconButton,
  makeStyles,
  Modal,
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
import ReactJson from "react-json-view";
import { Description } from "@material-ui/icons";

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
    } else if (path.endsWith("/monitoring")) {
      return 3;
    }
    return 1;
  }
  return 0;
};

const Page = ({ title, children }) => {
  const piece = pieceStore.getPiece();
  const classes = useStyles();
  const [value, setValue] = useState(resolveValue(pathname));
  const [jsonViewModal, setJsonViewModal] = useState(false)

  const onOpenModal = () => {
    setJsonViewModal(true);
  }

  const onCloseModal = () => {
    setJsonViewModal(false);
  }
  const { pathname } = useLocation();

  const onClick = (event, newValue) => {
    setValue(newValue);
  };

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
          <IconButton onClick={onOpenModal} color="inherit">
            <Description />
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
      { piece && 
      <Dialog
        open={jsonViewModal}
        onClose={onCloseModal}
      >
        <ReactJson theme="monokai"src={piece} />
      </Dialog>
      }
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
            disabled={!(pieceStore.getPiece())}
            component={Link}
            to={`/companies/${pieceStore.getCompany()}/${pieceStore.getEntityType()}/${pieceStore.getId()}`}
            label="Details"
            icon={<ReorderIcon />}
          />
          {authService.getActiveUser().role === "supervisor" && [
            <BottomNavigationAction
              component={Link}
              to={`/companies/${pieceStore.getCompany()}/${pieceStore.getEntityType()}/${pieceStore.getId()}/trace`}
              label="TNT"
              icon={<SearchIcon />}
              key="tnt"
            />,
            <BottomNavigationAction
              component={Link}
              to={`/companies/${pieceStore.getCompany()}/${pieceStore.getEntityType()}/${pieceStore.getId()}/monitoring`}
              label="Monitoring"
              icon={<BarChartIcon />}
              key="monitoring"
            />,
          ]}
        </BottomNavigation>
      )}
    </>
  );
};

export default Page;
