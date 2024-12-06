import { useState, useEffect } from "react";

import { useExpanded } from "./hooks/useExpanded";
import { useData } from "./hooks/useData";

import SideBarWrapper from "./components/SideBar/SideBarWrapper";
import MainView from "./components/MainView";
import Login from "./components/Login";
import LoadingSpinner from "./components/LoadingSpinner";
import ModalMenu from "./components/OverlayMenu/ModalMenu";

function App() {
  const { expanded, setExpanded, setEnabled, overlayMenu } = useExpanded(true);
  const { user, setUser, setData, setIsLoading } = useData();

  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setExpanded(false);
    if (token) {
      setLoading(true);
      setIsLoading(true);
      const validateToken = async () => {
        try {
          const response = await fetch(`${apiUrl}/auth/validate-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
            setExpanded(true);
            setEnabled(true);
            setLoading(false);
            setIsLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          setExpanded(false);
          setLoading(false);
          setIsLoading(false);
          console.error(error);
        } finally {
          setLoading(false);
          setIsLoading(false);
        }
      };
      validateToken();
    }
  }, []);

  useEffect(() => {
    if (!user) setEnabled(false);
    if (user) {
      const fetchData = async () => {
        try {
          if (!user) return;
          const units = user.units;
          setLoading(true);
          setIsLoading(true);
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${apiUrl}/handshake/${units[0].unitId}/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await response.json();
          const sortedSensors = data.data.sensors.sensorDetails.sort((a, b) => {
            return a.sensorLocation.localeCompare(b.sensorLocation);
          });
          const sortedData = {
            ...data.data,
            sensors: {
              ...data.data.sensors,
              sensorDetails: sortedSensors,
            },
          };

          setData(sortedData);

          // const defaultSensorChart = {
          //   includedSensors: data.data.sensors.sensorDetails.map((sensor) => {
          //     return {
          //       id: sensor.sensorId,
          //       label: sensor.sensorLocation,
          //       color: sensor.color,
          //     };
          //   }),
          //   endTime: new Date(
          //     data.data.sensors.timeSeriesData[0].time,
          //   ).toISOString(),

          //   startTime: new Date(
          //     data.data.sensors.timeSeriesData[
          //       data.data.sensors.timeSeriesData.length - 1
          //     ].time,
          //   ).toISOString(),
          // };
          // setCurrentSensorCharts([defaultSensorChart]);
          setLoading(false);
          setIsLoading(false);
        } catch (error) {
          setLoading(false);
          setIsLoading(false);
          console.error(error);
        }
      };
      fetchData();
    }
  }, [user]);

  return (
    <>
      {overlayMenu && <ModalMenu />}
      <div className="h-full border bg-gray-100">
        <div className="mx-auto max-w-screen-xl">
          <div
            className={`grid bg-stone-50 text-stone-800 transition-all ${expanded ? "lg:grid-cols-[15rem,_1fr]" : "lg:grid-cols-[4.4rem,_1fr]"} `}
          >
            <SideBarWrapper />
            <main className="h-full">
              {loading ? <LoadingSpinner /> : user ? <MainView /> : <Login />}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
