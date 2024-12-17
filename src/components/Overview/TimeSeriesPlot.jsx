import ReactECharts from "echarts-for-react";

const TimeSeriesPlot = ({ data }) => {
  // Create the chart option
  const option = {
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 400,
      },
      {
        show: false,
        type: "continuous",
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: data.time.length - 1,
      },
    ],
    title: [
      {
        left: "center",
        text: "Gradient along the y axis",
      },
      {
        top: "55%",
        left: "center",
        text: "Gradient along the x axis",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        data: dateList,
      },
      {
        data: dateList,
        gridIndex: 1,
      },
    ],
    yAxis: [
      {},
      {
        gridIndex: 1,
      },
    ],
    grid: [
      {
        bottom: "60%",
      },
      {
        top: "60%",
      },
    ],
    series: [
      {
        type: "line",
        showSymbol: false,
        data: valueList,
      },
      {
        type: "line",
        showSymbol: false,
        data: valueList,
        xAxisIndex: 1,
        yAxisIndex: 1,
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "120px", width: "100%" }} />
  );
};

export default TimeSeriesPlot;
