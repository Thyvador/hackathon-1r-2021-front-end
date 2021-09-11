import { List, ListItem, ListItemText } from "@material-ui/core";

const Dimensions = ({volume, height, width, length}) => {

  return <List>
    <ListItemText
          primary="volume"
          secondary={
            volume.value + " " + volume.unit.toLowerCase()
          }
        />
         <ListItemText
          primary="height"
          secondary={
            height.value + " " + height.unit.toLowerCase()
          }
        />
         <ListItemText
          primary="width"
          secondary={
            width.value + " " + width.unit.toLowerCase()
          }
        />
         <ListItemText
          primary="length"
          secondary={
            length.value + " " + length.unit.toLowerCase()
          }
        />
  </List>
}

export default Dimensions;