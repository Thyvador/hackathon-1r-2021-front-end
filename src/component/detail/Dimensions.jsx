import { List, ListItemText, Typography } from "@material-ui/core";

const Dimensions = ({ volume, height, width, length }) => {
  return (
    <List>
      <ListItemText
        primary={
          <>
            volume:{" "}
            <Typography variant="caption">
              {" "}
              {volume.value}
              {volume.unit.toLowerCase()}
            </Typography>
          </>
        }
      />
      <ListItemText
        primary={
          <>
            height:{" "}
            <Typography variant="caption">
              {" "}
              {height.value}
              {height.unit.toLowerCase()}
            </Typography>
          </>
        }
      />
      <ListItemText
        primary={
          <>
            width:{" "}
            <Typography variant="caption">
              {" "}
              {width.value}
              {width.unit.toLowerCase()}
            </Typography>
          </>
        }
      />
      <ListItemText
        primary={
          <>
            length:{" "}
            <Typography variant="caption">
              {" "}
              {length.value}
              {length.unit.toLowerCase()}
            </Typography>
          </>
        }
      />
    </List>
  );
};

export default Dimensions;
