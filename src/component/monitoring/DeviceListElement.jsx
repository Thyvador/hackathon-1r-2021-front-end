import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useState } from "react";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SensorChart from "./SensorChart";

const DeviceListElement = ({ device }) => {
  const [expanded, setExpanded] = useState(false);

  const onExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={onExpandClick}>
        <ListItemIcon>
          <DevicesOtherIcon />
        </ListItemIcon>
        <ListItemText primary={device.deviceName} />
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ListItem button>
          <List>
            {device.sensors.map((sensor) => (
              <ListItem key={sensor.id}>
                <SensorChart sensor={sensor} />
              </ListItem>
            ))}
          </List>
        </ListItem>
      </Collapse>
    </>
  );
};

export default DeviceListElement;
