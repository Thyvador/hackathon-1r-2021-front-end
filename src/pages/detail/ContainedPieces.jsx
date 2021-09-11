import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { Link } from 'react-router-dom';

/**
 *
 * @param {object} props
 * @param {array} props.pieces
 * @returns
 */
const ContainedPieces = ({ pieces }) => {
  return (
    <List>
      {pieces.map((piece) => (
        <ListItem key={piece.id}>
          <ListItemText
            primary={
              <Link to={piece.id.replace('https://api.onerecord.fr', '')}>
                {piece.id}
              </Link>
            }
          />
        </ListItem>
      ))}
      {pieces.length === 0 && (
        <ListItem>
          <ListItemText primary='No contained pieces' />
        </ListItem>
      )}
    </List>
  );
};

export default ContainedPieces;
