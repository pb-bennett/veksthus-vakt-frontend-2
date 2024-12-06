import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";

import { formatLocation } from "../../utils/utils";

import LoadingSpinner from "../LoadingSpinner";
import SensorOverviewCard from "./SensorHeaderCard";

function SensorsHeader() {
  const { data, isLoading } = useData();
  const [sensors, setSensors] = useState([]);
  const [oldestReadingTime, setOldestReadingTime] = useState(null);

  const dateFormatOptions = {
    day: "2-digit", // Ensures day is two digits (e.g., 01, 02, 03)
    month: "2-digit", // Ensures month is two digits (e.g., 01, 02, 03)
    year: "numeric",
    hour: "2-digit", // 24-hour format (e.g., 14:00)
    minute: "2-digit", // Two digits for minutes (e.g., 05)
    second: "2-digit", // Two digits for seconds (e.g., 09)
    hour12: false, // 24-hour format, no AM/PM
  };

  useEffect(() => {
    if (data) {
      const oldestReading = data.sensors.sensorDetails.reduce(
        (oldest, current) => {
          return new Date(oldest.sensorLatestTemperature.readingTime) >
            new Date(current.sensorLatestTemperature.readingTime)
            ? oldest
            : current;
        },
      );

      // Use Intl.DateTimeFormat to format the date and time
      const dateFormatter = new Intl.DateTimeFormat("en-GB", dateFormatOptions);

      // Format the date in dd.mm.yyyy HH:mm:ss format
      setOldestReadingTime(
        dateFormatter.format(
          new Date(oldestReading.sensorLatestTemperature.readingTime),
        ),
      );

      const sensorOverview = data.sensors.sensorDetails.map((sensor) => {
        // Format location string
        const location = formatLocation(sensor.sensorLocation);

        const refineSensor = {
          id: sensor.sensorId,
          sensorName: sensor.name,
          latestTemperature: Number(sensor.sensorLatestTemperature.temperature),
          latestReadingTime: sensor.sensorLatestTemperature.readingTime,
          sensorMaxTemperatureLast24Hours: Number(
            sensor.sensorMaxTemperatureLast24Hours,
          ),
          sensorMinTemperatureLast24Hours: Number(
            sensor.sensorMinTemperatureLast24Hours,
          ),
          location,
        };
        return refineSensor;
      });

      setSensors(sensorOverview);
    }
  }, [data]);

  return (
    <div className="flex w-full select-none flex-col rounded-md border bg-stone-100 px-4 pt-1 font-light text-stone-600 shadow">
      {isLoading || !data || !sensors ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex flex-col items-start justify-between border-b py-1 md:flex-row md:items-center">
              <h1 className="m-0 p-2 text-lg md:text-2xl">Sensor Overview</h1>
              <p className="m-0 pl-2 text-xs">
                latest data: {oldestReadingTime}
              </p>
            </div>
            <ul className="my-2 grid grid-cols-3 gap-2 lg:grid-cols-5">
              {sensors.map((sensor) => (
                <SensorOverviewCard key={sensor.id} sensor={sensor} />
              ))}
            </ul>
            <div className="border-t py-1 text-end">
              <h1 className="pr-2 text-[0.6rem] md:text-xs">
                Current temperatures with last 24 hour min/max
              </h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default SensorsHeader;
