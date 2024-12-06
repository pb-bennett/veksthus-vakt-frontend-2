import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { TABLE_CONSTANTS } from "../constants/constants"; // Import constants

export const AdminContext = createContext();

// Helper function to get default sort config for a table
const getDefaultSortConfig = (tableName) => {
  const tableConfig = TABLE_CONSTANTS.find((table) => table.name === tableName);
  return {
    key: tableConfig?.defaultSortColumn || "",
    direction: tableConfig?.defaultSortDirection || "asc",
  };
};

export const AdminProvider = ({ children }) => {
  const [selectedTable, setSelectedTable] = useState("sensors");

  // Initialize the table data with appliedFilters including default sorting values
  const [tableDataSensors, setTableDataSensors] = useState({
    lastFetch: null,
    appliedFilters: { sorting: getDefaultSortConfig("sensors") },
    data: [],
  });
  const [tableDataUsers, setTableDataUsers] = useState({
    lastFetch: null,
    appliedFilters: { sorting: getDefaultSortConfig("users") },
    data: [],
  });
  const [tableDataUnits, setTableDataUnits] = useState({
    lastFetch: null,
    appliedFilters: { sorting: getDefaultSortConfig("units") },
    data: [],
  });
  const [tableDataTemperatureReadings, setTableDataTemperatureReadings] =
    useState({
      lastFetch: null,
      appliedFilters: { sorting: getDefaultSortConfig("temperatureReadings") },
      data: [],
    });
  const [tableDataRoles, setTableDataRoles] = useState({
    lastFetch: null,
    appliedFilters: { sorting: getDefaultSortConfig("roles") },
    data: [],
  });
  const [tableDataRequestLogs, setTableDataRequestLogs] = useState({
    lastFetch: null,
    appliedFilters: { sorting: getDefaultSortConfig("requestLogs") },
    data: [],
  });

  return (
    <AdminContext.Provider
      value={{
        selectedTable,
        setSelectedTable,
        tableDataSensors,
        setTableDataSensors,
        tableDataUsers,
        setTableDataUsers,
        tableDataUnits,
        setTableDataUnits,
        tableDataTemperatureReadings,
        setTableDataTemperatureReadings,
        tableDataRoles,
        setTableDataRoles,
        tableDataRequestLogs,
        setTableDataRequestLogs,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
