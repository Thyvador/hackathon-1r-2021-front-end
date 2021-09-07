import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const { default: Page } = require("component/Page");

const data = [
  {
    id: "japan",
    color: "hsl(278, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 273,
      },
      {
        x: "helicopter",
        y: 122,
      },
      {
        x: "boat",
        y: 244,
      },
      {
        x: "train",
        y: 14,
      },
      {
        x: "subway",
        y: 1,
      },
      {
        x: "bus",
        y: 188,
      },
      {
        x: "car",
        y: 216,
      },
      {
        x: "moto",
        y: 269,
      },
      {
        x: "bicycle",
        y: 264,
      },
      {
        x: "horse",
        y: 135,
      },
      {
        x: "skateboard",
        y: 12,
      },
      {
        x: "others",
        y: 133,
      },
    ],
  },
];

// const getSizeInPx = (styleSize) => {
//   if (!styleSize) {
//     return 0;
//   }
//   if (Number.isInteger(styleSize)) {
//     return styleSize;
//   }
//   if (styleSize.indexOf("px") >= 0) {
//     return styleSize.split("px")[0];
//   } else if (styleSize.indexOf("rem") >= 0) {
//     return parseInt(styleSize.split("rem")[0]) * 16;
//   }
//   return 0;
// };

const PiecePage = () => {
  let { id } = useParams();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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

  return (
    <Page title="Piece">
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div>Piece {id}</div>
        {width && height && (
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
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
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
          />
        )}
      </div>
    </Page>
  );
};

export default PiecePage;
