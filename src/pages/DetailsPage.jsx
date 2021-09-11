import {
  Button,
  Collapse,
  Divider,
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
import InstructionList from "./detail/InstructionList";
import PieceDetail from "./detail/PieceDetail";

const useStyles = makeStyles((theme) => ({
  actionContainer: {
  },
  list: {
    marginTop: "4rem",
    height: "100%",
  },
  listHeader: {
    color: theme.palette.text.secondary,
  },
  iconInfo: {
    color: theme.palette.primary.main,
  },
}));

const DetailsPage = () => { 
  const piece = pieceStore.getPiece();
  
  const classes = useStyles();

  const [detailsOpened, setDetailsOpened] = useState(false);

  const onCollapse = () => {
    setDetailsOpened(!detailsOpened);
  };

  return (
    <Page title="Details">
      <div className={classes.actionContainer}>
      <Button variant="outlined">
          Delivery
      </Button>
      </div>
      <Divider />

      <PieceDetail piece={piece} />
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
