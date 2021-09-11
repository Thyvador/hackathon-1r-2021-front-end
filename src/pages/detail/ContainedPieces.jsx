import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';

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
        // TODO: Link to load the app with this piece
        <ListItem key={piece.id}>
          <ListItemText primary={piece.id} />
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
