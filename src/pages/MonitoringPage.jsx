import Page from "component/Page";
import moment from "moment";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import genericService from "services/generic.service";
import { List, Typography } from "@material-ui/core";
import DeviceListElement from "component/monitoring/DeviceListElement";

const MonitoringPage = () => {
  const { company, entityType, id } = useParams();

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    genericService
      .get(`companies/${company}/${entityType}/${id}/iot-devices`)
      .then((devices) => {
        setDevices(devices);
      })
      .catch((err) => {
        console.error(err);
        setDevices([]);
      });
  }, [company, entityType, id]);

  return (
    <Page title="Monitoring">
      {(!devices || devices.length === 0) && (
        <Typography>No device found</Typography>
      )}
      <List>
        {devices.map((device) => (
          <DeviceListElement device={device} key={device.id} />
        ))}
      </List>
    </Page>
  );
};

export default MonitoringPage;
