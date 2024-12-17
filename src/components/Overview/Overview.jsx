import SensorsOverview from "./SensorsOverview";
import WeatherOverview from "./WeatherOverview";

function Overview() {
  return (
    <main className="flex-1 overflow-y-auto p-2">
      <div className="grid w-full auto-rows-fr grid-cols-1 gap-4">
        {/* <WeatherOverview /> */}
        <SensorsOverview />
      </div>
    </main>
  );
}

export default Overview;
