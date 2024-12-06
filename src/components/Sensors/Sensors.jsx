import { useEffect } from "react";
import { useData } from "../../hooks/useData";
import { useSensorsData } from "../../hooks/useSensors";
import LoadingSpinner from "../LoadingSpinner";
import SensorChartContainer from "./SensorChartContainer";
import SensorsHeader from "./SensorsHeader";
import { sensorColorAssigner } from "../../utils/utils";

function Sensors() {
  const { data, isLoading } = useData();
  const {
    setSensorDetails,
    isLoadingSensors,
    setIsLoadingSensors,
    sensorReadings,
    setSensorReadings,
  } = useSensorsData();

  useEffect(() => {
    if (data) {
      setIsLoadingSensors(true);
      setSensorDetails(sensorColorAssigner(data.sensors.sensorDetails));
      setSensorReadings(data.sensors.timeSeriesData);

      setIsLoadingSensors(false);
    }
  }, [data]);
  return (
    <main className="flex-1 overflow-y-auto p-4">
      <div className="flex w-full flex-col gap-4">
        {isLoading || isLoadingSensors ? (
          <LoadingSpinner />
        ) : (
          data && (
            <div className="overflow-y-auto rounded-md shadow">
              <SensorsHeader />
            </div>
          )
        )}
        <div className="flex w-full select-none flex-col rounded-md border bg-stone-100 px-4 pt-1 font-light text-stone-600 shadow">
          {sensorReadings.length > 0 ? (
            <SensorChartContainer />
          ) : (
            <div>No data available for the selected time period</div>
          )}
          {}
        </div>
      </div>
    </main>
  );
}
export default Sensors;
