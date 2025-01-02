import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

import { getLastNDaysTimestamps, getMinMaxAvg } from "../utils/utils";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tempReadingsData, setTempReadingsData] = useState({});
  const [tempReadingsStats, setTempReadingsStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = async ({ startTime, endTime, sensors }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("Token missing");
      const rawReadings = await fetch(
        `${apiUrl}/readings/temperature?start=${startTime}&end=${endTime}&sensors=${sensors.join(",")}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (rawReadings.status !== 200) throw new Error(rawReadings.statusText);

      const readings = await rawReadings.json();
      return readings.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const returnTempReadingsData = async ({ period, sensors }) => {
    try {
      const { startTime, endTime } = period;
      const fetchPromises = sensors
        .map((sensor) => {
          // Check if the tempReadingsData for the sensor already has data for the startTime
          if (
            tempReadingsData[sensor] &&
            tempReadingsData[sensor][0].time < startTime
          ) {
            return fetchData({
              startTime,
              endTime: tempReadingsData[sensor][0].time - 1,
              sensors: [sensor],
            });
          }
          return null; // No need to fetch if data already exists
        })
        .filter(Boolean); // Filter out nulls to avoid unnecessary fetches

      let newReadings = [];

      if (fetchPromises.length > 0) {
        newReadings = await Promise.all(fetchPromises);
        // Optionally, you can handle the case where data was fetched here if needed
      } else {
        console.log("No new data to fetch.");
      }

      // You can now safely update the state after the conditional block
      if (newReadings.length > 0) {
        newReadings.forEach((readings) => {
          Object.keys(readings).forEach((key) => {
            setTempReadingsData((prev) => ({
              ...prev,
              [key]: [...readings[key], ...prev[key]], // Combine new and previous readings
            }));
          });
        });
      } else {
        console.log("No new readings to process.");
      }

      const dataToReturn = {};
      sensors.forEach((sensor) => {
        // Filter the tempReadingsData to only include readings within the specified time range
        if (tempReadingsData[sensor]) {
          dataToReturn[sensor] = tempReadingsData[sensor].filter(
            (reading) => reading.time >= startTime && reading.time <= endTime,
          );
        }
      });

      return dataToReturn;
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  useEffect(() => {
    if (user && Object.keys(tempReadingsData).length === 0) {
      const { startTime, endTime } = getLastNDaysTimestamps(30);

      const loadInitialData = async () => {
        try {
          const sensors = user.units[0].sensors.map(
            (sensor) => sensor.sensorId,
          );
          const data = await fetchData({
            startTime,
            endTime,
            sensors,
          });
          setTempReadingsData(data);
        } catch (error) {
          console.error("Error loading initial data:", error);
        }
      };

      loadInitialData();
    }
  }, [user]);

  useEffect(() => {
    if (tempReadingsData) {
      const tempSensorStats = {};
      const startTimes = {
        Days7: getLastNDaysTimestamps(7).startTime,
        Days3: getLastNDaysTimestamps(3).startTime,
        Days1: getLastNDaysTimestamps(1).startTime,
      };
      Object.keys(tempReadingsData).forEach((sensorId) => {
        const sensorDataDay7 = tempReadingsData[sensorId].filter(
          (reading) => reading.time >= startTimes.Days7,
        );
        const sensorDataDay3 = tempReadingsData[sensorId].filter(
          (reading) => reading.time >= startTimes.Days3,
        );
        const sensorDataDay1 = tempReadingsData[sensorId].filter(
          (reading) => reading.time >= startTimes.Days1,
        );

        tempSensorStats[sensorId] = {
          days7: getMinMaxAvg(sensorDataDay7),
          days3: getMinMaxAvg(sensorDataDay3),
          days1: getMinMaxAvg(sensorDataDay1),
        };
      });
      setTempReadingsStats(tempSensorStats);
    }
  }, [tempReadingsData]);

  useEffect(() => {
    if (user) {
      const fetchDataAfterDelay = async () => {
        const sensors = user.units[0].sensors.map((sensor) => sensor.sensorId);

        // Get the current time
        const now = new Date();

        // Calculate the next 15-minute mark (on the hour, quarter past, half past, or quarter to the hour)
        const minutes = now.getMinutes();
        const remainder = minutes % 15;
        const delayToNextFetch = (15 - remainder) * 60 * 1000 + 2 * 60 * 1000; // Add 2-minute offset

        // Calculate startTime and endTime for fetching
        const startTime = now.getTime() - 15 * 60 * 1000; // Last 15 minutes
        const endTime = now.getTime(); // Current time

        // Fetch after the calculated delay
        setTimeout(async () => {
          try {
            const data = await fetchData({
              startTime: Math.floor(startTime / 1000),
              endTime: Math.floor(endTime / 1000),
              sensors,
            });

            if (data) {
              // Update state with the fetched readings
              setTempReadingsData((prevData) => {
                const updatedData = { ...prevData };

                // Merge the fetched data into the existing data
                sensors.forEach((sensorId) => {
                  if (data[sensorId]) {
                    if (!updatedData[sensorId]) {
                      updatedData[sensorId] = [];
                    }
                    // Add new readings to the existing data
                    updatedData[sensorId] = [
                      ...updatedData[sensorId],
                      ...data[sensorId],
                    ];
                  }
                });

                return updatedData;
              });
            }
          } catch (error) {
            console.error("Error fetching latest data:", error);
          }
        }, delayToNextFetch); // First fetch after the delay

        // Set the interval to fetch data every 15 minutes
        const intervalId = setInterval(
          async () => {
            console.log("running interval fetch");
            try {
              const data = await fetchData({
                startTime: Math.floor(startTime / 1000),
                endTime: Math.floor(endTime / 1000),
                sensors,
              });
              console.log(data);
              if (data) {
                // Update state with the fetched readings
                setTempReadingsData((prevData) => {
                  const updatedData = { ...prevData };

                  // Merge the fetched data into the existing data
                  sensors.forEach((sensorId) => {
                    if (data[sensorId]) {
                      if (!updatedData[sensorId]) {
                        updatedData[sensorId] = [];
                      }
                      // Add new readings to the existing data
                      updatedData[sensorId] = [
                        ...updatedData[sensorId],
                        ...data[sensorId],
                      ];
                    }
                  });

                  return updatedData;
                });
              }
            } catch (error) {
              console.error("Error fetching latest data:", error);
            }
          },
          15 * 60 * 1000,
        ); // 15-minute interval

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      };

      fetchDataAfterDelay();
    }
  }, [user]); // Runs when `user` changes // Runs when `user` changes

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        tempReadingsData,
        setTempReadingsData,
        isLoading,
        setIsLoading,
        returnTempReadingsData,
        tempReadingsStats,
        setTempReadingsStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataContext };
