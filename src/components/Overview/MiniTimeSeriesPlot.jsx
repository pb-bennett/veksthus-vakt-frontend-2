import ReactECharts from "echarts-for-react";
import PropTypes from "prop-types";
import { Expand } from "lucide-react";

import { colorGrader, formatLocation } from "../../utils/utils";

const MiniTimeSeriesPlot = ({ data, sensor, type }) => {
  if (
    sensor.location === "outside-(air)" ||
    sensor.location === "outside-(soil)"
  )
    console.log(sensor.location, data[0]);
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
  const min = Math.min(...formattedData.map((entry) => entry[1]));
  const max = Math.max(...formattedData.map((entry) => entry[1]));
  const avg =
    formattedData.reduce((sum, entry) => sum + entry[1], 0) / data.length;
  console.log(min, max, avg);
  const typeTitle =
    type === "24h" ? "24 hour" : type === "7d" ? "7 day" : "30 day";

  const option = {
    title: {
      text: typeTitle,
      top: 2,
      left: "center",
      textStyle: {
        color: "#57534e", // Title color
        fontSize: 14, // Main title font size
        fontWeight: "normal", // Font weight
        fontFamily: "Noto Sans, sans-serif", // Font family
      },
    },
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
            line-height: 1.4;
          "
        >
          <div style="font-size: 1rem; margin: 0; font-weight: bold;">
            ${formatLocation(sensor.location)}
          </div>
          <div style="font-size: 0.8rem; margin: 0; font-weight: bold;">
            ${formattedTime}
          </div>
          <div style="font-size: 0.8rem; font-weight: bold; margin: 0;">
            temp: ${temperature}°C
          </div>
          <div style="font-size: 0.8rem; margin: 0;">
            avg: ${avg.toFixed(1)}°C
          </div>
          <div style="font-size: 0.8rem; margin: 0;">
            min: ${min.toFixed(1)}°C
          </div>
          <div style="font-size: 0.8rem; margin: 0;">
             max: ${max.toFixed(1)}°C
          </div>
        </div>
      `;
      },
    },
    grid: {
      top: 25,
      bottom: 5,
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
    <div className="relative h-full w-full">
      <ReactECharts
        className="rounded-md bg-stone-50"
        option={option}
        style={{
          height: "100%",
          width: "100%",
          padding: "0",
          margin: "0",
          border: `2px solid ${colorGrader(data.map((entry) => entry.temp).reduce((a, b) => a + b / data.length, 0))}`, // Dynamically colored border
          borderRadius: "6px", // Optional rounded corners
        }}
      />
      <button
        className="absolute right-1 top-1 rounded-sm p-1 text-stone-500 shadow hover:bg-stone-100"
        onClick={() => console.log("Button clicked!")}
      >
        <Expand size={10} />
      </button>
    </div>
  );
};

MiniTimeSeriesPlot.propTypes = {
  data: PropTypes.array.isRequired,
  sensor: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default MiniTimeSeriesPlot;
