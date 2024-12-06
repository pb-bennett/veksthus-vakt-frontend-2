import { useContext } from "react";
import { SelectedContext } from "../contexts/SelectedContext";

// Custom hook to use the context
export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error("useSelected must be used within an SelectedProvider");
  }
  return context;
};
