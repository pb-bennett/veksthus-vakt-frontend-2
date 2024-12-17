import React from "react";
import ReactECharts from "echarts-for-react";

const MiniTimeSeriesPlot = ({ data }) => {
  const breakpoints = [-15, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40];
  const colorRange = [
    "rgba(1, 92, 251, 0.8)", // Deep blue
    "rgba(28, 136, 199, 0.8)", // Sky blue
    "rgba(38, 154, 180, 0.8)", // Cyan
    "rgba(90, 209, 137, 0.8)", // Green
    "rgba(103, 247, 66, 0.8)", // Light green
    "rgba(181, 243, 45, 0.8)", // Yellow-green
    "rgba(249, 224, 79, 0.8)", // Yellow
    "rgba(249, 199, 79, 0.8)", // Orange-yellow
    "rgba(249, 132, 74, 0.8)", // Orange
    "rgba(248, 150, 30, 0.8)", // Deep orange
    "rgba(243, 114, 44, 0.8)", // Red-orange
    "rgba(249, 65, 68, 0.8)", // Red
  ];
  // Transform data into [time, temp] format and convert time to milliseconds
  const formattedData = data.map((entry) => [entry.time * 1000, entry.temp]);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
      formatter: function (params) {
        const time = new Date(params[0].data[0]); // Time in milliseconds
        const formattedTime = time.toLocaleString(); // Format timestamp
        const temperature = params[0].data[1].toFixed(1); // Temperature value
        return `
          <div>
            <strong>Temperature:</strong> ${temperature}°C<br />
            <strong>Time:</strong> ${formattedTime}
          </div>
        `;
      },
    },
    grid: {
      top: 10,
      bottom: 10,
      left: 5,
      right: 5,
      containLabel: true,
    },
    xAxis: {
      type: "time", // Use time axis for x-axis
      boundaryGap: false,
      axisLabel: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: "value",
      show: false,
      min: (value) => value.min - 0.5,
      max: (value) => value.max + 0.5,
    },
    visualMap: {
      min: Math.min(...breakpoints), // Minimum temperature (-10)
      max: Math.max(...breakpoints), // Maximum temperature (99)
      calculable: true, // Enables the gradient bar for better visualization
      inRange: {
        color: colorRange, // Use the gradient color range
      },
      formatter: (value) => `${value}°C`, // Custom label formatter
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbol: "none",
        data: formattedData, // [time, temp] format
        lineStyle: {
          width: 2, // Line width
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100px", width: "100%", padding: "0" }}
    />
  );
};

export default MiniTimeSeriesPlot;


import React from "react";
import ReactECharts from "echarts-for-react";
import { symbol } from "prop-types";

const MiniTimeSeriesPlot = ({ data }) => {
  // Create the chart option
  const option = {
    // title: {
    //   text: "Mini Time-Series",
    //   left: "center",
    //   textStyle: {
    //     fontSize: 10,
    //   },
    // },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#aaa",
        },
      },
      formatter: function (params) {
        // Get the data for the first series
        console.log(params[0].data);
        const time = new Date(params[0].axisValue * 1000); // Convert from seconds to milliseconds
        const formattedTime = time.toLocaleString(); // You can use other formatting methods here

        return `
          <div>
            <strong>Temperature:</strong> ${params[0].data.toFixed(1)}°C<br />
            <strong>Time:</strong> ${formattedTime}
          </div>
        `;
      },
    },
    grid: {
      top: 10, // Reduce space at the top
      bottom: 10, // Reduce space at the bottom
      left: 5, // Adjust as needed
      right: 5, // Adjust as needed
      containLabel: true, // Ensures the axis labels fit within the grid
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((entry) => entry.time), // assuming `time` is a timestamp or label
      axisLabel: {
        show: false, // Hide labels for a cleaner look
      },
      axisLine: {
        show: false, // Hide axis line
      },
      axisTick: {
        show: false, // Disable tick marks
      },
    },
    yAxis: {
      type: "value",
      show: false, // Keep the y-axis hidden

      min: function (value) {
        return value.min - value.min * 0.01;
      }, // Dynamically adjust the minimum value to match the smallest data point
      max: function (value) {
        return value.max + value.max * 0.01;
      }, // Dynamically adjust the maximum value to match the largest data point
      scale: true, // Ensure the y-axis doesn't forcefully start at 0
      axisTick: {
        show: false, // Disable ticks
      },
      axisLabel: {
        show: false, // Disable labels
      },
      axisLine: {
        show: false, // Hide axis line
      },
      splitLine: {
        show: false, // Remove grid lines associated with the y-axis
      },
    },
    series: [
      {
        name: "Temperature",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          color: "#ff5733", // Customize the line color
        },
        data: data.map((entry) => entry.temp), // assuming `temp` is the temperature value
        markLine: {
          symbol: ["none"],
          silent: true,
          label: {
            show: true,
          },
          data: [
            {
              // Use the same name with starting and ending point
              // name: "Minimum to Maximum",
              type: "min",
            },
            // {
            //   type: "max",
            // },
            // {
            //   // Mark line with a fixed X position in starting point. This is used to generate an arrow pointing to maximum line.
            //   yAxis: "max",
            //   x: "90%",
            // },
            {
              type: "max",
            },
          ],
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100px", width: "100%", padding: "0" }}
    />
  );
};

export default MiniTimeSeriesPlot;
