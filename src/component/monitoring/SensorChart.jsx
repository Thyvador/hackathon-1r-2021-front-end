import { useTheme, Typography } from "@material-ui/core";
import { defaultTheme } from "@nivo/core";
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

const SensorChart = ({ sensor, events }) => {
  const theme = useTheme();

  const nivoTheme =
    theme.palette.type === "light"
      ? defaultTheme
      : {
          axis: {
            domain: {
              line: {
                stroke: "#526271",
              },
            },
            ticks: {
              line: {
                stroke: "#526271",
              },
              text: {
                fill: "#8d9cab",
              },
            },
            legend: {
              text: {
                fill: "#ccd7e2",
              },
            },
          },
          grid: {
            line: {
              stroke: "#888",
            },
          },
          legends: {
            text: {
              fill: "#8d9cab",
            },
          },
          tooltip: {
            container: {
              background: "#000",
              color: "#ddd",
            },
          },
          labels: {
            text: {
              fill: "#ddd",
            },
          },
          dots: {
            text: {
              fill: "#bbb",
            },
          },
          annotations: {
            text: {
              fill: "#dddddd",
              outlineColor: "#0e1317",
            },
            link: {
              stroke: "#ffffff",
              outlineColor: "#0e1317",
            },
            outline: {
              stroke: "#ffffff",
              outlineColor: "#0e1317",
            },
            symbol: {
              fill: "#ffffff",
              outlineColor: "#0e1317",
            },
          },
        };

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState([]);
  const [nbTick, setNbTick] = useState(0);

  const keepEvent = (event) => {
    return (
      event.eventName === "(SHIP) Ship departed from Port" ||
      event.eventName === "(SHIP) Ship arrived to Port"
    );
  };

  useEffect(() => {
    setMarkers(
      events.filter(keepEvent).map((event) => ({
        axis: "x",
        value: event.dateTime,
        lineStyle: { stroke: "#b0413e", strokeWidth: 2 },
        legend: event.eventName,
        legendOrientation: "vertical",
      }))
    );
  }, [events]);

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
          theme={nivoTheme}
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
