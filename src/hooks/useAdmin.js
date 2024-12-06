import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useTableData must be used within a TableDataProvider");
  }
  return context;
};
