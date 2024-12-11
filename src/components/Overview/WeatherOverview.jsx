import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import LoadingSpinner from "../LoadingSpinner";
import WeatherOverviewCard from "./WeatherOverviewCard";
import { te } from "date-fns/locale";

function WeatherOverview() {
  const { tempReadingsStats, tempReadingsData, isLoading } = useData();
  // const [weather6Days, setWeather6Days] = useState([]);
  // console.log(tempReadingsStats);
  // useEffect(() => {
  //   if (data) {
  //     const today = new Date();
  //     const tomorrow = new Date();
  //     tomorrow.setDate(today.getDate() + 1);
  //     const transformedData = Object.entries(data.weatherData.groupedByDay).map(
  //       ([date, { minTemp, maxTemp, avgTemp, icon, weather }]) => {
  //         let formattedDate;
  //         const dayDate = new Date(date);
  //         if (dayDate.toDateString() === today.toDateString()) {
  //           formattedDate = "Today";
  //         } else if (dayDate.toDateString() === tomorrow.toDateString()) {
  //           formattedDate = "Tomorrow";
  //         } else {
  //           formattedDate = dayDate.toLocaleDateString("en-GB", {
  //             day: "2-digit",
  //             month: "short",
  //           });
  //         }

  //         return {
  //           date: formattedDate,
  //           minTemp: parseFloat(minTemp.toFixed(1)),
  //           maxTemp: parseFloat(maxTemp.toFixed(1)),
  //           avgTemp: parseFloat(avgTemp.toFixed(1)),
  //           weather,
  //           icon,
  //         };
  //       },
  //     );
  //     setWeather6Days(transformedData);
  //   }
  // }, [data]);

  return (
    <div className="flex w-full select-none flex-col rounded-md border bg-stone-100 px-4 pt-1 font-light text-stone-600 shadow">
      {/* {isLoading || !data || !weather6Days ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-col">
            <div className="border-b py-1 pl-1">
              <h1 className="text-lg md:text-2xl">
                {data?.weatherData.city.name}
              </h1>
            </div>
            <ul className="my-2 grid grid-cols-3 gap-2 lg:grid-cols-6">
              {weather6Days.map((day, index) => (
                <WeatherOverviewCard key={index} day={day} />
              ))}
            </ul>
            <div className="border-t py-1 text-end">
              <h1 className="pr-2 text-[0.6rem] md:text-xs">
                data provided by{" "}
                <span className="font-bold">openweathermap.org</span>
              </h1>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}

export default WeatherOverview;
