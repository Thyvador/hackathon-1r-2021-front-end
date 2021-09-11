import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
          <ListItemText
            primary={
              <Link to={item.id.replace('https://api.onerecord.fr', '')}>
                {item.id}
              </Link>
            }
          />
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
