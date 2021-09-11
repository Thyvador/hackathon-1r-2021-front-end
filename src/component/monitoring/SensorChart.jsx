import { Typography } from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import genericService from "services/generic.service";

const { useState, useEffect } = require("react");

let xFormatCounter = 0;
const renderXFormat = (time) => {
  let res = null;
  // if (xFormatCounter === 0) {
  xFormatCounter = 0;
  res = moment(time).format("DD/MM/YY, HH:MM:SS");
  // }
  xFormatCounter++;
  if (xFormatCounter === 3) {
    xFormatCounter = 0;
  }
  return res;
};

const SensorChart = ({ sensor }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState([]);
  const [nbTick, setNbTick] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const pageContainer = document.getElementById("page-container");

      setWidth(pageContainer.offsetWidth);
      setHeight(window.innerHeight * 0.4);
      setNbTick(Math.ceil(pageContainer.offsetWidth / 100));
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    genericService
      .getAbsolute(`${sensor.id}/measurements`)
      .then((measurements) => {
        if (measurements) {
          setData(
            measurements.map((m) => {
              return {
                x: moment(m.measurementTimestamp).toDate(),
                y: m.genericMeasurement.value,
              };
            })
          );
        }
      })
      .catch(console.err);
  }, [sensor]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Typography variant="caption">
        Sensor: {sensor.sensorName} - {sensor.sensorSerialNumber}
      </Typography>
      {width && height && (
        <ResponsiveLine
          data={[
            {
              id: sensor.id,
              color: "hsl(278, 70%, 50%)",
              data,
            },
          ]}
          // theme={nivoTheme}
          margin={{ top: 10, right: 70, bottom: 100, left: 30 }}
          xScale={{
            type: "time",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          curve="monotoneX"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          xFormat={(time) => moment(time).format("LLL")}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            format: renderXFormat,
            tickValues: nbTick,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: verticalAxisName,
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={{ scheme: "nivo" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          markers={markers}
        />
      )}
    </div>
  );
};

export default SensorChart;
