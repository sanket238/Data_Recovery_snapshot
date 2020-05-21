import * as React from "react";
import { Chart } from "react-google-charts";
import "../PieChart/PieChart.css";

const WordTree = props => {
  return (
    <Chart
      width={"500px"}
      height={"270px"}
      chartType="WordTree"
      loader={<div>Loading Chart</div>}
      data={props.data}
      options={{
        wordtree: {
          format: "implicit",
          word: props.current
        }
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default WordTree;
