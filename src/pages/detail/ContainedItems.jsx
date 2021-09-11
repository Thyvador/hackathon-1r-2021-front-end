import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';

/**
 *
 * @param {object} props
 * @param {array} props.items
 * @returns
 */
const ContainedItems = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        // TODO: Link to load the app with this item
        <ListItem key={item.id}>
          <ListItemText primary={item.id} />
        </ListItem>
      ))}
      {items.length === 0 && (
        <ListItem>
          <ListItemText primary='No contained items' />
        </ListItem>
      )}
    </List>
  );
};

export default ContainedItems;
