import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SensorOverviewCard from "./SensorOverviewCard";
import LoadingSpinner from "../LoadingSpinner";
import { useData } from "../../hooks/useData";
const UnitOverviewCard = ({ unitId }) => {
  const { tempReadingsData, user } = useData();
  const [unit, setUnit] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const findUnit = user.units.find((unit) => unit.unitId === unitId);
    setUnit(findUnit);
    setLoading(false);
  }, [tempReadingsData]);

  return (
    <div className="my-2 flex w-full flex-col rounded-md border bg-stone-50 px-4 pt-1 font-light text-stone-600 shadow">
      <div className="flex items-center border-b">
        <h2 className="text-md m-0 p-1 font-bold md:text-lg">
          {unit.unitName}
        </h2>
        <p className="md:text-md m-0 border-l p-2 text-sm">{unit.location}</p>
      </div>
      <ul className="my-2 grid grid-cols-1 gap-2">
        {!unit.sensors || loading ? (
          <LoadingSpinner />
        ) : (
          unit.sensors.map((sensor) => (
            <SensorOverviewCard
              key={sensor.sensorId}
              sensorId={sensor.sensorId}
            />
          ))
        )}
      </ul>
      <div className="border-t py-1 text-end">
        <p className="pr-2 text-[0.7rem]">
          <span className="font-bold">Unit ID: </span>
          {unit.unitId}
        </p>
      </div>
    </div>
  );
};

UnitOverviewCard.propTypes = {
  unitId: PropTypes.string,
};

export default UnitOverviewCard;
