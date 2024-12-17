import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import LoadingSpinner from "../LoadingSpinner";
import MiniTimeSeriesPlot from "./MiniTimeSeriesPlot";

import {
  colorGrader,
  formatLocation,
  getLastNDaysTimestamps,
  downsampleData,
} from "../../utils/utils";
import { useData } from "../../hooks/useData";

const SensorOverviewCard = ({ sensorId }) => {
  const { tempReadingsData, tempReadingsStats, user, isLoading } = useData();
  const [sensor, setSensor] = useState(null);
  const [plotData, setPlotData] = useState(null);
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (
      Object.keys(tempReadingsData).length === 0 ||
      isLoading ||
      Object.keys(tempReadingsStats).length === 0
    )
      return;
    setLoading(true);

    const findSensor = user.units
      .flatMap((unit) => unit.sensors)
      .find((sensor) => sensor.sensorId === sensorId);
    const tempReadings = tempReadingsData[sensorId].filter(
      (reading) => reading.time > getLastNDaysTimestamps(7).startTime,
    );

    setSensor({
      ...findSensor,
      tempReadings,
      tempStats: tempReadingsStats[sensorId],
    });
    setLoading(false);
  }, [tempReadingsData, user, tempReadingsStats]);
  if (loading || !sensor || isLoading) return <LoadingSpinner />;
  return (
    <li className="flex flex-col items-center rounded-md border bg-stone-100 shadow-sm">
      <p className="sm:text-md w-full border-b text-center text-sm">
        {formatLocation(sensor.location)}
      </p>
      <div className="grid w-full grid-cols-12 items-center gap-1 p-1">
        <div className="col-span-2 flex flex-col items-center rounded-md border p-1">
          <p className="text-sm">Current</p>
          <div
            className={`flex size-20 items-center justify-center rounded-md border-2 bg-stone-50`}
            style={{
              borderColor: colorGrader(
                sensor.tempReadings[sensor.tempReadings.length - 1].temp,
              ),
              borderWidth: "3px",
            }}
          >
            <p className="flex items-start text-stone-500">
              <span className="text-lg font-semibold sm:text-xl">
                {sensor.tempReadings[
                  sensor.tempReadings.length - 1
                ].temp.toFixed(1)}
              </span>
              <span className="text-sm font-light sm:text-lg">°C</span>
            </p>
          </div>
        </div>
        <div className="col-span-5 flex h-full flex-col items-center rounded-md border p-1">
          <p className="text-sm">24 Hours</p>
          <MiniTimeSeriesPlot
            type="24h"
            sensor={sensor}
            data={downsampleData(
              sensor.tempReadings.filter(
                (reading) => reading.time > getLastNDaysTimestamps(1).startTime,
              ),
              48,
            )}
          />
        </div>
        <div className="col-span-5 flex h-full flex-col items-center rounded-md border p-1">
          <p className="text-sm">7 Days</p>
          <MiniTimeSeriesPlot
            type="7d"
            sensor={sensor}
            data={downsampleData(
              sensor.tempReadings.filter(
                (reading) => reading.time > getLastNDaysTimestamps(7).startTime,
              ),
              48,
            )}
          />
        </div>
      </div>
    </li>
  );
};

SensorOverviewCard.propTypes = {
  sensorId: PropTypes.string,
};

export default SensorOverviewCard;

// Get the color based on the temperature
// const currentColor = colorGrader(sensor.latestTemperature);
// const maxColor = colorGrader(sensor.sensorMaxTemperatureLast24Hours);
// const minColor = colorGrader(sensor.sensorMinTemperatureLast24Hours);

{
  /* <div className="flex w-full flex-col gap-1 sm:flex-row sm:justify-center">
<div
  className="flex h-[2.4rem] w-full items-center justify-center rounded-md border bg-stone-50 sm:h-[3rem] sm:w-[4.5rem]"
  style={{
    borderColor: colorGrader(sensor.tempStats.days1.min.toFixed(1)),
    borderWidth: "3px",
  }}
>
  <div className="flex flex-row items-start justify-center text-sm text-stone-500 sm:flex-col">
    <p className="flex items-center text-xs">min:</p>
    <div className="flex">
      <p className="text-sm font-semibold sm:text-sm">
        {sensor.tempStats.days1.min.toFixed(1)}
      </p>
      <p className="text-xs font-light sm:text-xs">°C</p>
    </div>
  </div>
</div>
<div
  className="flex h-[2.4rem] w-full items-center justify-center rounded-md border bg-stone-50 sm:h-[3rem] sm:w-[4.5rem]"
  style={{
    borderColor: colorGrader(sensor.tempStats.days1.max.toFixed(1)),
    borderWidth: "3px",
  }}
>
  <div className="mx-[0.5rem] flex h-[1.8rem] w-full flex-col items-center justify-center rounded-md sm:h-[2.5rem] sm:w-[3.5rem]">
    <p className="flex items-center text-xs">max:</p>
    <div className="flex">
      <p className="text-sm font-semibold sm:text-sm">
        {sensor.tempStats.days1.max.toFixed(1)}
      </p>
      <p className="text-xs font-light sm:text-xs">°C</p>
    </div>
  </div>
</div>
</div> */
}
