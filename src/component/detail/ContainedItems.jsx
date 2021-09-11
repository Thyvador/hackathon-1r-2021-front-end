import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  linkItem: {
    "&>span>a": {
      overflowWrap: "anywhere",
    },
  },
});

/**
 *
 * @param {object} props
 * @param {array} props.items
 * @returns
 */
const ContainedItems = ({ items }) => {
  const classes = useStyles();
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText
            className={classes.linkItem}
            primary={
              <Link to={item.id.replace("https://api.onerecord.fr", "")}>
                {item.id}
              </Link>
            }
          />
        </ListItem>
      ))}
      {items.length === 0 && (
        <ListItem>
          <ListItemText primary="No contained items" />
        </ListItem>
      )}
    </List>
  );
};

export default ContainedItems;
