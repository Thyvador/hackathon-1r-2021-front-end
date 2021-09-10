import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { makeStyles } from "@material-ui/styles";
import Page from "component/Page";
import { useState } from "react";
import pieceStore from "store/piece.store";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles({
  actionContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 1rem 0.8rem 1rem ",
    borderBottom: "1px solid grey",
    width: "100vw",
    position: "absolute",
    left: "0",
    height: "3rem",
  },
  list: {
    marginTop: "4rem",
  },
  listHeader: {
    color: "rgba(0, 0, 0, 0.54)",
  },
});

const DetailsPage = () => {
  const piece = pieceStore.getPiece();
  console.log(piece);
  const classes = useStyles();

  const [detailsOpened, setDetailsOpened] = useState(false);

  const onSubmitEvent = () => {
    alert("Event clicked");
  };

  const onCollapse = () => {
    setDetailsOpened(!detailsOpened);
  };

  return (
    <Page title="Details">
      <div elevation={3} className={classes.actionContainer}>
        {/* <Button variant="outlined">TODO</Button> */}
        <Button variant="outlined" onClick={onSubmitEvent}>
          Delivery
        </Button>
      </div>

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Details
          </ListSubheader>
        }
        className={classes.list}
      >
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Instruction ...." />
        </ListItem>
        <ListItem button onClick={onCollapse}>
          <ListItemText primary="Piece info" className={classes.listHeader} />
          {detailsOpened ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={detailsOpened} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {!!piece && [
              <PieceElement name="volume" value={piece.dimensions.volume} />,
              <PieceElement name="height" value={piece.dimensions.height} />,
              <PieceElement name="width" value={piece.dimensions.width} />,
              <PieceElement name="length" value={piece.dimensions.length} />,
            ]}
          </List>
        </Collapse>
      </List>
    </Page>
  );
};

const PieceElement = ({ name, value }) => {
  const classes = useStyles();
  console.log(name, value);
  return (
    <ListItem className={classes.nested}>
      <ListItemText
        primary={`${name.charAt(0).toUpperCase() + name.slice(1)}: ${
          value.value
        }${value.unit.toLowerCase()}`}
      />
    </ListItem>
  );
};

export default DetailsPage;
