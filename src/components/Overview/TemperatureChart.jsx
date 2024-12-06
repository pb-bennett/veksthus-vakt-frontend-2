import { ResponsiveLine } from "@nivo/line";
import { useData } from "../../hooks/useData";
import { useEffect, useState } from "react";

const TemperatureChart = () => {
  const { data } = useData();
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const hourlyForecast = data.weatherData?.hourlyForecast || [];

    const temperatureData = hourlyForecast.map((entry) => ({
      x: new Date(entry.time), // Ensure 'x' is a Date object
      y: entry.temp, // Temperature as 'y'
    }));

    setPlotData([
      {
        id: "Temperature",
        data: temperatureData,
      },
    ]);
  }, [data]);

  return (
    <div className="flex h-36 w-full flex-col rounded-md border bg-stone-100 p-4 font-light shadow">
      <ResponsiveLine
        data={plotData} // Pass the plotData directly here
        margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
        xScale={{
          type: "time",
          precision: "hour",
        }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickCount: 5,
          format: "%H:%M",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 4,
          legend: "°C",
          legendOffset: -30,
        }}
        lineWidth={2}
        curve="monotoneX"
        colors={{ scheme: "nivo" }}
        enablePoints={true}
        pointSize={6}
        enableGridX={true}
        enableGridY={true}
        useMesh={true}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: "#777",
                strokeWidth: 1,
              },
            },
            ticks: {
              text: {
                fill: "#777",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TemperatureChart;
