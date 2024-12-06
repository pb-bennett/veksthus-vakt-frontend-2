import PropTypes from "prop-types";

import { colorGrader } from "../../utils/utils";

function SensorsHeaderCard({ sensor }) {
  // Get the color based on the temperature
  const currentColor = colorGrader(sensor.latestTemperature);
  const maxColor = colorGrader(sensor.sensorMaxTemperatureLast24Hours);
  const minColor = colorGrader(sensor.sensorMinTemperatureLast24Hours);

  return (
    <li className="flex flex-col items-center rounded-md border bg-stone-50 p-1">
      <p className="sm:text-md w-full border-b text-center text-sm">
        {sensor.location}
      </p>
      <div className="flex w-full flex-col items-center">
        <div
          className="mt-2 flex h-[2.4rem] w-full items-center justify-center rounded-md border sm:h-[3.5rem] sm:w-[9rem]"
          style={{ backgroundColor: currentColor }}
        >
          <div className="mx-[0.5rem] flex h-[2rem] w-full flex-col items-center justify-center rounded-md bg-stone-100 sm:h-[3rem] sm:w-[8rem]">
            <p className="flex items-start text-stone-500">
              <span className="text-lg font-semibold sm:text-2xl">
                {sensor.latestTemperature.toFixed(1)}
              </span>
              <span className="text-sm font-light sm:text-lg">°C</span>
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row sm:justify-center">
          <div
            className="flex h-[2.4rem] w-full items-center justify-center rounded-md border sm:h-[3rem] sm:w-[4.5rem]"
            style={{ backgroundColor: minColor }}
          >
            <div className="mx-[0.5rem] flex h-[1.8rem] w-full flex-col items-center justify-center rounded-md bg-stone-100 sm:h-[2.5rem] sm:w-[3.5rem]">
              <div className="flex flex-row items-start justify-center text-sm text-stone-500 sm:flex-col">
                <p className="flex items-center text-xs">min:</p>
                <div className="flex">
                  <p className="text-sm font-semibold sm:text-sm">
                    {sensor.sensorMinTemperatureLast24Hours.toFixed(1)}
                  </p>
                  <p className="text-xs font-light sm:text-xs">°C</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex h-[2.4rem] w-full items-center justify-center rounded-md border sm:h-[3rem] sm:w-[4.5rem]"
            style={{ backgroundColor: maxColor }}
          >
            <div className="mx-[0.5rem] flex h-[1.8rem] w-full flex-col items-center justify-center rounded-md bg-stone-100 sm:h-[2.5rem] sm:w-[3.5rem]">
              <div className="flex flex-row items-start justify-center text-sm text-stone-500 sm:flex-col">
                <p className="flex items-center text-xs">max:</p>
                <div className="flex">
                  <p className="text-sm font-semibold sm:text-sm">
                    {sensor.sensorMaxTemperatureLast24Hours.toFixed(1)}
                  </p>
                  <p className="text-xs font-light sm:text-xs">°C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

SensorsHeaderCard.propTypes = {
  sensor: PropTypes.shape({
    location: PropTypes.string.isRequired,
    latestTemperature: PropTypes.number.isRequired,
    sensorMaxTemperatureLast24Hours: PropTypes.number.isRequired, // Added this
    sensorMinTemperatureLast24Hours: PropTypes.number.isRequired, // Added this
  }).isRequired,
};

export default SensorsHeaderCard;
