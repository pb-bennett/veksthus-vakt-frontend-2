import PropTypes from "prop-types";

function WeatherOverviewCard({ day }) {
  const url = import.meta.env.VITE_OPEN_WEATHER_ICONS_URL;

  return (
    <li className="flex flex-col items-center rounded-md border bg-stone-50 p-1">
      <p className="w-full border-b text-center text-sm">{day.date}</p>
      <div className="relative m-1 mt-2 rounded-md border bg-stone-300">
        <img src={`${url}${day.icon}@2x.png`} alt="" />
        <div className="absolute left-0 top-0 rounded-br-md rounded-tl-md bg-stone-800 bg-opacity-50 px-1 py-0.5 text-xs text-white">
          {day.maxTemp}°C
        </div>
        <div className="absolute bottom-0 right-0 rounded-br-md rounded-tl-md bg-stone-800 bg-opacity-50 px-1 py-0.5 text-xs text-white">
          {day.minTemp}°C
        </div>
      </div>
    </li>
  );
}

WeatherOverviewCard.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
    avgTemp: PropTypes.number.isRequired,
    minTemp: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired,
  }).isRequired,
};

export default WeatherOverviewCard;
