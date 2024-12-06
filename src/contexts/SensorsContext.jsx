import PropTypes from "prop-types";

import { createContext, useState } from "react";

const SensorsContext = createContext();

export function SensorsProvider({ children }) {
  const [sensorDetails, setSensorDetails] = useState([]);
  const [sensorReadings, setSensorReadings] = useState([]);
  const [isLoadingSensors, setIsLoadingSensors] = useState(false);
  const [currentSensorCharts, setCurrentSensorCharts] = useState([]);

  return (
    <SensorsContext.Provider
      value={{
        sensorDetails,
        setSensorDetails,
        sensorReadings,
        setSensorReadings,
        isLoadingSensors,
        setIsLoadingSensors,
        currentSensorCharts,
        setCurrentSensorCharts,
      }}
    >
      {children}
    </SensorsContext.Provider>
  );
}

SensorsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SensorsContext };
