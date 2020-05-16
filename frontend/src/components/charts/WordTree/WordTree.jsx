import * as React from "react";
import { Chart } from "react-google-charts";
import "../PieChart/PieChart.css";

const COLORS = [
  "#3c3568",
  "#bc443b",
  "#192a56",
  "#334553",
  "#f6ba62",
  "#185e4b",
  "#150a47",
  "#d82f5a",
  "#000133",
  "#11887b",
  "#044a05",
  "#004953",
  "#062e03",
  "#7f4330",
  "#420303",
  "#980036",
  "#9c004a",
  "#490648",
  "#76424e",
  "#36013f",
  "#36013f",
  "#333333",
  "#25342b",
  "#171717"
];

class WordTree extends React.Component {
  render() {
    return (
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="WordTree"
        loader={<div>Loading Chart</div>}
        data={[
          ["Phrases"],
          ["/ C 450631_DATA Adobe Pdf Doc"],
          ["/ C 450631_DATA JPEG Digital Camera"],
          ["/ C 450631_DATA Microsoft Excel"],
          ["/ C 450631_DATA Microsoft Word"],
          ["/ C 450631_DATA Others"],
          ["/ C 450631_DATA Dir1 Adobe"],
          ["/ C 450631_DATA Dir1 Word"],
          ["/ C 450631_DATA Dir2 Adobe"],
          ["/ C 450631_DATA Dir2 Word"],
          ["/ D 450631_DATA Adobe Pdf Doc"],
          ["/ D 450631_DATA JPEG Digital Camera"],
          ["/ D 450631_DATA Microsoft Excel"],
          ["/ D 450631_DATA Microsoft Word"],
          ["/ D 450631_DATA Others"],
          ["/ D 450631_DATA Dir1 Adobe"],
          ["/ D 450631_DATA Dir1 Word"],
          ["/ D 450631_DATA Dir2 Adobe"],
          ["/ D 450631_DATA Dir2 Word"]
        ]}
        options={{
          wordtree: {
            format: "implicit",
            word: "/"
          }
        }}
        rootProps={{ "data-testid": "1" }}
      />
    );
  }
}

export default WordTree;
