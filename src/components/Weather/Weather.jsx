import { useData } from "../../hooks/useData";

import WeatherOverview from "../Weather/WeatherOverview";

function Weather() {
  const { data } = useData();
  console.log(data);
  return (
    <main className="flex-1 overflow-y-auto p-4">
      <div className="grid w-full auto-rows-fr grid-cols-1 gap-4">
        <WeatherOverview />
      </div>
    </main>
  );
}
export default Weather;
