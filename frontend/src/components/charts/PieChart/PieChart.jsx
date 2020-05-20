import * as React from "react";
import { Chart } from "react-google-charts";
import "./PieChart.css";

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

class PieChart extends React.Component {
  render() {
    const chartEvents = [
      {
        eventName: "ready",
        callback({ chartWrapper, google }) {
          const chart = chartWrapper.getChart();
          google.visualization.events.addListener(chart, "onmouseover", e => {
            chart.setSelection([{ row: e.row }]);
          });
          google.visualization.events.addListener(chart, "onmouseout", e => {
            chart.setSelection([]);
          });
        }
      }
    ];

    const { rows } = this.props;

    return (
      <Chart
        className={
          this.props.chartType
            ? "custom-charts google-piechart"
            : "custom-charts"
        }
        height={this.props.height ? this.props.height : "300px"}
        width={this.props.width ? this.props.width : "auto"}
        chartType={this.props.chartType ? this.props.chartType : "Bar"}
        rows={rows}
        columns={this.props.columns}
        options={{
          sliceVisibilityThreshold: 0,
          headerHeight: 0,
          backgroundColor: "transparent",
          colors: COLORS,
          minColor: "#A7A0B3",
          midColor: "#88E3CA",
          maxColor: "#E0AEF6",
          tooltip: { showColorCode: true, trigger: "selection" },
          chartArea: this.props.chartArea
            ? this.props.chartArea
            : { left: 0, top: 10, right: 0 },
          isStacked: this.props.isStacked === true ? true : false,
          legend: this.props.legend
            ? { position: "none" }
            : this.props.legendPosition
            ? this.props.legendPosition
            : {
                position: "right",
                alignment: "center"
              },
          hAxis: this.props.hAxis
            ? {
                title: "",
                textPosition: "none",
                textColor: "#ffffff"
              }
            : { title: this.props.title, titleTextStyle: { color: "#333" } },
          vAxis: this.props.vAxis
            ? {
                textPosition: "none"
              }
            : { minValue: 0 },
          generateTooltip:
            this.props.generateTooltip === true
              ? (row, size, value) => {
                  console.log(size);
                  console.log(this.props.rows[row][0]);
                  return (
                    '<div style="background:#fff; padding:5px 10px 5px 10px; border:1px solid grey; font-size:16px"><b>' +
                    this.props.rows[row][0] +
                    "</b> : " +
                    size +
                    "</div>"
                  );
                }
              : null
        }}
        rootProps={{ "data-testid": "2" }}
        chartEvents={chartEvents}
      />
    );
  }
}

export default PieChart;
