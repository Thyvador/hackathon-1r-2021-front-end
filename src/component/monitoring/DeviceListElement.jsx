import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SensorChart from "./SensorChart";
import genericService from "services/generic.service";

const DeviceListElement = ({ device, events }) => {
  const [expanded, setExpanded] = useState(false);
  const [sensors, setSensors] = useState([]);

  const onExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    genericService
      .getAbsolute(`${device.id}/sensors`)
      .then((res) => {
        setSensors(res);
      })
      .catch(console.err);
  }, [device]);

  return (
    <Paper>
      <ListItem button onClick={onExpandClick}>
        <ListItemIcon>
          <DevicesOtherIcon />
        </ListItemIcon>
        <ListItemText primary={`IOT device: ${device.deviceName}`} />
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ListItem>
          <List>
            {sensors.map((sensor) => (
              <ListItem key={sensor.id} style={{ padding: 0 }}>
                <SensorChart sensor={sensor} events={events} />
              </ListItem>
            ))}
          </List>
        </ListItem>
      </Collapse>
    </Paper>
  );
};

export default DeviceListElement;
