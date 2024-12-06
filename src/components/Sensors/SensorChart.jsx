import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ChevronDown, ChevronUp, X } from "lucide-react";
import DateRangeSlider from "./DateRangeSlider";
import VerticalTemperatureRangeSlider from "./VerticalTemperatureSlider";
import SensorCheckboxList from "./SensorCheckboxList";
import { formatLocation } from "../../utils/utils";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, yAxisRange }) => {
  if (active && payload && payload.length) {
    // Filter out points outside the Y-axis range
    const filteredPayload = payload.filter(
      (item) => item.value >= yAxisRange[0] && item.value <= yAxisRange[1],
    );

    if (filteredPayload.length === 0) {
      return null; // Do not render Tooltip if no points are in range
    }
    const date = new Date(label);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = date.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });

    const formattedLabel = `${formattedDate} - ${formattedTime}`;
    return (
      <div className="custom-tooltip flex flex-col rounded-md bg-stone-50 bg-opacity-90 p-2 shadow">
        <p className="tooltip-label text-xs text-stone-500">{formattedLabel}</p>
        {filteredPayload.map((item, index) => (
          <p className="text-xs" key={index} style={{ color: item.color }}>
            {`${item.name}: ${item.value}°C`}
          </p>
        ))}
      </div>
    );
  }
  return null; // No Tooltip when inactive or out of range
};

const SensorChart = ({
  data,
  title,
  height,
  sensorDetails,
  includedSensors,
  handleCloseChart,
  handleDateChange,
  dataStartEndTimes,
  temperatureRange,
  handleSensorSelectionChange,
  handleTemperatureChange,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [defaultTemperatureRange, setDefaultTemperatureRange] = useState([]);

  useEffect(() => {
    if (defaultTemperatureRange[0] && defaultTemperatureRange[1]) return;
    const temperatures = data.flatMap(
      (entry) =>
        Object.entries(entry)
          .filter(([key]) => key !== "time") // Ignore the "time" key
          .map(([key, value]) => value), // Extract the temperature values
    );
    const minTemp = Math.floor(Math.min(...temperatures));
    const maxTemp = Math.ceil(Math.max(...temperatures));
    setDefaultTemperatureRange([minTemp - 3, maxTemp + 3]);
  }, [data]);

  const getSensorLocation = (sensorId) => {
    const sensor = sensorDetails.find((sensor) => sensor.sensorId === sensorId);
    return sensor ? formatLocation(sensor.sensorLocation) : sensorId;
  };

  const getSensorColor = (sensorId) => {
    const sensor = sensorDetails.find((sensor) => sensor.sensorId === sensorId);
    return sensor ? sensor.color : "#8884d8";
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex flex-col rounded-md border bg-stone-50 px-4 pb-2 pt-1 last:mb-4">
      <div className="flex items-center justify-between p-1">
        <h3 className="w-48 text-lg">{title}</h3>

        <DateRangeSlider
          dataStartEndTimes={dataStartEndTimes}
          handleDateChange={handleDateChange}
        />
        <div className="flex gap-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 flex items-center justify-center rounded-md border bg-stone-50 p-1 px-2 text-sm hover:bg-stone-100"
          >
            {expanded ? (
              <ChevronUp height={20} width={20} />
            ) : (
              <ChevronDown height={20} width={20} />
            )}
          </button>
          <button
            className="mt-1 flex w-10 items-center justify-center rounded-md border bg-stone-50 p-1 px-2 text-sm hover:bg-stone-100"
            onClick={handleCloseChart}
          >
            <X height={20} width={20} />
          </button>
        </div>
      </div>
      <div
        className={`rounded-md border bg-stone-50 p-2 ${expanded ? "" : "hidden"}`}
      >
        <div className="flex w-full items-center justify-center">
          {defaultTemperatureRange[0] && defaultTemperatureRange[1] && (
            <VerticalTemperatureRangeSlider
              height={height}
              minTemp={defaultTemperatureRange[0]}
              maxTemp={defaultTemperatureRange[1]}
              handleTemperatureChange={handleTemperatureChange}
            />
          )}
          <ResponsiveContainer width="100%" height={height}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {/* First XAxis for Dates */}
              <XAxis
                dataKey="time"
                tickFormatter={(time) => {
                  const date = new Date(time);
                  return date.toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                  });
                }}
                height={20}
                xAxisId="date"
                dy={0}
                tick={{ fontSize: 10, fill: "#57534e" }}
              />

              <YAxis
                allowDataOverflow={true}
                domain={temperatureRange}
                label={{
                  value: "°C",
                  angle: 0,
                  position: "insideLeft",
                  fontSize: 16,
                }}
                tick={{ fontSize: 12, fill: "#57534e" }}
              />
              <Tooltip
                content={<CustomTooltip yAxisRange={temperatureRange} />}
                labelStyle={{
                  fontSize: "12px",
                }}
                itemStyle={{
                  fontSize: "12px",
                }}
              />

              {includedSensors.map((sensor) => (
                <Line
                  key={sensor.id}
                  dataKey={sensor.id}
                  stroke={getSensorColor(sensor.id)}
                  strokeWidth={2}
                  dot={false}
                  name={formatLocation(sensor.label)}
                  isAnimationActive={false}
                  xAxisId="date" // Associate the Line with the "date" XAxis
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex w-full justify-center">
          <SensorCheckboxList
            onChange={handleSensorSelectionChange}
            options={sensorDetails.map((sensor) => {
              return {
                id: sensor.sensorId,
                label: getSensorLocation(sensor.sensorId),
                color: getSensorColor(sensor.sensorId),
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

SensorChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  height: PropTypes.number.isRequired,
  sensorDetails: PropTypes.array.isRequired,
  includedSensors: PropTypes.array.isRequired,
  handleCloseChart: PropTypes.func,
  handleDateChange: PropTypes.func,
  handleSensorSelectionChange: PropTypes.func,
  selectedSensors: PropTypes.array.isRequired,
  setSelectedSensors: PropTypes.func.isRequired,
  dataStartEndTimes: PropTypes.object.isRequired,
  temperatureRange: PropTypes.array.isRequired,
  handleTemperatureChange: PropTypes.func,
  defaultTemperatureRange: PropTypes.array.isRequired,
};

export default SensorChart;
