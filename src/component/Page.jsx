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
import ReactJson from "react-json-view";
import { Description } from "@material-ui/icons";

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
    position: "relative",
  },
}));

const Page = ({ title, children }) => {
  const piece = pieceStore.getPiece();
  const classes = useStyles();
  const [value, setValue] = useState("QrCode Scanner");
  const [jsonViewModal, setJsonViewModal] = useState(false)

  const onOpenModal = () => {
    setJsonViewModal(true);
  }

  const onCloseModal = () => {
    setJsonViewModal(false);
  }

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
          className={classes.root}
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
            to={`/companies/${pieceStore.getCompany()}/pieces/${pieceStore.getId()}`}
            label="Details"
            icon={<ReorderIcon />}
          />
          <BottomNavigationAction
            disabled={!(pieceStore.getPiece())}
            component={Link}
            to={`/companies/${pieceStore.getCompany()}/pieces/${pieceStore.getId()}/trace`}
            label="TNT"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            disabled={!(pieceStore.getPiece())}
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
