import ReactECharts from "echarts-for-react";

import { colorGrader, formatLocation } from "../../utils/utils";

const MiniTimeSeriesPlot = ({ data, sensor, type }) => {
  console.log(sensor, type);
  const breakpoints = [-15, -5, 0, 5, 10, 15, 20, 25, 30, 35, 45];
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
        const formattedTime = time.toLocaleString("en-GB", {
          hour12: false, // Use 24-hour format
        }); // Format timestamp
        const temperature = params[0].data[1].toFixed(1); // Temperature value
        const color = colorGrader(temperature);

        return `
        <div 
          class="rounded-md" 
          style="
            background-color: #fafaf9;
            color: #57534e; 
            border: 2px solid ${color}; 
            padding: 6px; 
            border-radius: 4px;
            font-size: 0.8rem;
          "
        >
        <p style="font-size: 0.8rem; margin: 0;">
        ${formattedTime}
        </p>
          <span>${formatLocation(sensor.location)}:</span> ${temperature}°C<br />
        </div>
      `;
      },
    },
    grid: {
      top: 10,
      bottom: 10,
      left: 0,
      right: 20,
      containLabel: true,
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      show: false,
      min: (value) => value.min - 0.5,
      max: (value) => value.max + 0.5,
    },
    visualMap: {
      min: Math.min(...breakpoints),
      max: Math.max(...breakpoints),
      calculable: true,
      inRange: {
        color: colorRange,
      },
      show: false,
      left: "-9999px",
      top: "-9999px",
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbol: "none",
        data: formattedData,
        lineStyle: {
          width: 2,
        },
        emphasis: {
          disabled: true,
        },
      },
    ],
  };

  return (
    <ReactECharts
      className="rounded-md border bg-stone-50"
      option={option}
      style={{ height: "75px", width: "100%", padding: "0", margin: "0" }}
    />
  );
};

export default MiniTimeSeriesPlot;
