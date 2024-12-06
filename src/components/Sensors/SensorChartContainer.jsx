import { useEffect, useState } from "react";
import { PlusIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useSensorsData } from "../../hooks/useSensors";
import LoadingSpinner from "../LoadingSpinner";
import SensorChart from "./SensorChart";
import { adjustDataPoints } from "../../utils/aggregateDataPoints";

const SensorChartContainer = () => {
  const {
    sensorDetails,
    isLoadingSensors,
    sensorReadings,
    currentSensorCharts,
    setCurrentSensorCharts,
  } = useSensorsData();
  const [expanded, setExpanded] = useState(true);
  const [dataStartEndTimes, setDataStartEndTimes] = useState({});
  const [defaultTemperatureRange, setDefaultTemperatureRange] = useState([]);

  useEffect(() => {
    if (currentSensorCharts.length === 0) handleNewChart();
  }, []);
  useEffect(() => {
    const start = sensorReadings[sensorReadings.length - 1].time;
    const end = sensorReadings[0].time;
    setDataStartEndTimes({ start, end });
    const temperatures = sensorReadings.flatMap(
      (entry) =>
        Object.entries(entry)
          .filter(([key]) => key !== "time") // Ignore the "time" key
          .map(([key, value]) => value), // Extract the temperature values
    );
    const minTemp = Math.floor(Math.min(...temperatures));
    const maxTemp = Math.ceil(Math.max(...temperatures));
    setDefaultTemperatureRange([minTemp - 3, maxTemp + 3]);
  }, [sensorReadings]);

  // Handles adding a new chart with different time range for testing
  const handleNewChart = () => {
    const newChart = {
      startTime: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      endTime: new Date(), // End at current time
      temperatureRange: defaultTemperatureRange,
      includedSensors: sensorDetails.map((sensor) => {
        return {
          id: sensor.sensorId,
          label: sensor.sensorLocation,
        };
      }), // Could be expanded for user input
    };
    setCurrentSensorCharts([...currentSensorCharts, newChart]);
  };

  const handleCloseChart = (index) => {
    const newCharts = [...currentSensorCharts];
    newCharts.splice(index, 1);
    setCurrentSensorCharts(newCharts);
  };
  const handleDateChange = (index, newStartTime, newEndTime) => {
    const newCharts = [...currentSensorCharts];
    newCharts[index] = {
      ...newCharts[index],
      startTime: newStartTime,
      endTime: newEndTime,
    };
    setCurrentSensorCharts(newCharts);
  };

  const handleSensorSelectionChange = (index, newIncludedSensors) => {
    const newCharts = [...currentSensorCharts];
    newCharts[index] = {
      ...newCharts[index],
      includedSensors: newIncludedSensors,
    };
    setCurrentSensorCharts(newCharts);
  };
  const handleTemperatureChange = (index, newTemperatureRange) => {
    const newCharts = [...currentSensorCharts];
    newCharts[index] = {
      ...newCharts[index],
      temperatureRange: newTemperatureRange,
    };
    setCurrentSensorCharts(newCharts);
  };

  if (isLoadingSensors) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col pt-2">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Sensor Charts</h1>
        <div className="flex gap-1">
          <button
            className="mt-1 flex items-center justify-center rounded-md border bg-stone-50 p-1 px-2 text-sm hover:bg-stone-100"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronDown height={20} width={20} />
            ) : (
              <ChevronUp height={20} width={20} />
            )}
          </button>
          <button
            className="mt-1 flex w-28 items-center justify-center rounded-md border bg-stone-50 p-1 px-2 text-sm hover:bg-stone-100"
            onClick={handleNewChart}
          >
            New Chart
            <PlusIcon height={20} width={20} />
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col gap-4 transition-all ${!expanded && "hidden"}`}
      >
        {currentSensorCharts.map((chart, index) => {
          let { startTime, endTime, includedSensors, temperatureRange } = chart;

          const filteredData = sensorReadings
            .filter((reading) => {
              return (
                new Date(reading.time) >= new Date(startTime) &&
                new Date(reading.time) <= new Date(endTime)
              );
            })
            .sort((a, b) => new Date(a.time) - new Date(b.time));

          const aggregatedFilteredData = adjustDataPoints(
            filteredData,
            startTime,
            endTime,
          );

          // Ensure we have data before rendering the chart
          if (aggregatedFilteredData.length === 0) {
            return (
              <div key={index}>
                <p>No data available for this time range.</p>
              </div>
            );
          }

          return (
            <SensorChart
              key={index}
              data={aggregatedFilteredData}
              includedSensors={includedSensors}
              sensorDetails={sensorDetails}
              temperatureRange={temperatureRange}
              title={`Sensor Chart ${index + 1}`}
              height={400}
              dataStartEndTimes={{ ...dataStartEndTimes }}
              handleCloseChart={() => handleCloseChart(index)}
              handleDateChange={(newStartTime, newEndTime) =>
                handleDateChange(index, newStartTime, newEndTime)
              }
              handleSensorSelectionChange={(newIncludedSensors) =>
                handleSensorSelectionChange(index, newIncludedSensors)
              }
              handleTemperatureChange={(newTemperatureRange) =>
                handleTemperatureChange(index, newTemperatureRange)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default SensorChartContainer;
