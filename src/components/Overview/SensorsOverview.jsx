import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";

import { formatLocation } from "../../utils/utils";

import LoadingSpinner from "../LoadingSpinner";
import UnitOverviewCard from "./UnitOverviewCard";

function SensorsOverview() {
  const { tempReadingsData, isLoading, user } = useData();

  return (
    <div className="flex w-full select-none flex-col rounded-md border bg-stone-100 px-4 pt-1 font-light text-stone-600 shadow">
      {isLoading || !tempReadingsData || !user ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex flex-col items-start justify-between border-b py-1 md:flex-row md:items-center">
              <h1 className="m-0 p-2 text-lg md:text-2xl">
                Unit & Sensor Overview
              </h1>
            </div>
            {user &&
              user.units.map((unit) => (
                <UnitOverviewCard key={unit.unitId} unitId={unit.unitId} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
export default SensorsOverview;
