import { useContext } from "react";
import { SensorsContext } from "../contexts/SensorsContext";

export const useSensorsData = () => {
  const context = useContext(SensorsContext);
  if (!context) {
    throw new Error("useSensorsData must be used within a SensorsProvider");
  }
  return context;
};
