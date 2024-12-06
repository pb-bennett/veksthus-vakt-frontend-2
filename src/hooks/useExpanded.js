import { useContext } from "react";
import { ExpandedContext } from "../contexts/ExpandedContext";

// Custom hook to use the context
export const useExpanded = () => {
  const context = useContext(ExpandedContext);
  if (!context) {
    throw new Error("useExpanded must be used within an ExpandedProvider");
  }
  return context;
};
