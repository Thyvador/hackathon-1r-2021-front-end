import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import pieceService from "services/piece.service";

const { default: Page } = require("component/Page");

const generateData = () => {
  const date = moment();
  return Array(16)
    .fill(0)
    .map(() => {
      date.add(1, "hour");
      return {
        // x: date.toDate(),
        x: date.toDate(),
        y: Math.random() * 100,
      };
    });
};

const data = [
  {
    id: "japan",
    color: "hsl(278, 70%, 50%)",
    data: generateData(),
  },
];
const markers = [
  {
    axis: "x",
    value: data[0].data[5].x,
    lineStyle: { stroke: "#b0413e", strokeWidth: 1 },
    legend: "Test marker",
  },
];

const PiecePage = () => {
  let { company, id } = useParams();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [piece, setPiece] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const pageContainer = document.getElementById("page-container");
      // const style =
      //   pageContainer.currentStyle || window.getComputedStyle(pageContainer);

      setWidth(pageContainer.offsetWidth);
      setHeight(window.innerHeight * 0.4);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    pieceService
      .get(company, id)
      .then((piece) => {
        setError(null);
        setPiece(piece);
      })
      .catch((err) => {
        console.error(err);
        setPiece(null);
        setError(err);
      });
  }, [company, id]);

  return (
    <Page title="Piece">
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {!!piece && <div>Piece {JSON.stringify(piece)}</div>}
        {!!error && <div>Error: {error.message}</div>}
        {width && height && (
          <ResponsiveLine
            data={data}
            // theme={nivoTheme}
            margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
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
              min: 0,
              max: 100,
              stacked: true,
              reverse: false,
            }}
            xFormat={(time) => moment(time).format("LLL")}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              format: renderXFormat,
              tickValues: 8,
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
    </Page>
  );
};

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

export default PiecePage;
