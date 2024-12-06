import { useEffect, useState } from "react";
import { useAdmin } from "../../hooks/useAdmin";
import {
  TABLE_CONSTANTS,
  DATA_REFRESH_THRESHOLD,
} from "../../constants/constants";
import TableTabBar from "./TableTabBar";
import Table from "./Table";
import LoadingSpinner from "../LoadingSpinner";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditModal from "./EditModal";

function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const {
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
  } = useAdmin();

  const adminSetters = {
    sensors: setTableDataSensors,
    users: setTableDataUsers,
    units: setTableDataUnits,
    temperatureReadings: setTableDataTemperatureReadings,
    roles: setTableDataRoles,
    requestLogs: setTableDataRequestLogs,
  };

  const adminGetters = {
    sensors: tableDataSensors,
    users: tableDataUsers,
    units: tableDataUnits,
    temperatureReadings: tableDataTemperatureReadings,
    roles: tableDataRoles,
    requestLogs: tableDataRequestLogs,
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const tableConstants = TABLE_CONSTANTS;

  const fetchTableData = async (force = false) => {
    setIsLoading(true);
    const tableConstant = tableConstants.find(
      (item) => item.name === selectedTable,
    );
    if (!selectedTable) return;

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("JWT token is missing");
      setIsLoading(false);
      return;
    }

    const currentTime = new Date().getTime();
    const lastFetch = adminGetters[selectedTable]?.lastFetch;
    const timeDiff = lastFetch
      ? currentTime - new Date(lastFetch).getTime()
      : DATA_REFRESH_THRESHOLD + 1;

    if (force || timeDiff > DATA_REFRESH_THRESHOLD) {
      try {
        const response = await fetch(`${apiUrl}${tableConstant.endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setIsLoading(false);
          console.error("Failed to fetch data:", response.statusText);
          return;
        }

        const data = await response.json();
        const setter = adminSetters[selectedTable];
        if (setter) {
          setter((prev) => ({
            ...prev,
            data: data.data,
            lastFetch: new Date().toISOString(),
          }));
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching table data:", error);
      }
    } else {
      setIsLoading(false);
      console.log("Data is fresh, no need to fetch.");
    }
  };

  const handleSort = (column) => {
    const currentSorting = adminGetters[selectedTable].appliedFilters.sorting;
    const newDirection =
      currentSorting.key === column && currentSorting.direction === "asc"
        ? "desc"
        : "asc";

    const updatedSorting = {
      key: column,
      direction: newDirection,
    };

    // Update sorting in the context (or state)
    const setter = adminSetters[selectedTable];
    if (setter) {
      setter((prev) => ({
        ...prev,
        appliedFilters: {
          ...prev.appliedFilters,
          sorting: updatedSorting,
        },
      }));
    }
  };

  // Sort data based on applied sorting
  const sortedData = (() => {
    const currentSorting = adminGetters[selectedTable].appliedFilters.sorting;
    if (!currentSorting.key) return adminGetters[selectedTable].data;

    const { key, direction } = currentSorting;
    return [...adminGetters[selectedTable].data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  })();

  const handleRefresh = () => {
    fetchTableData(true);
  };

  const handleOnDelete = (row) => {
    setEditItem(null);
    setDeleteItem(row);
  };

  const handleOnDeleteConfirm = (confirm) => {
    if (confirm) console.log("Deleted:", deleteItem);
    setDeleteItem(null);
  };

  const handleOnEdit = (row) => {
    console.log("EDIT_:__:", row);
    setDeleteItem(null);
    setEditItem(row);
  };

  const handleOnEditConfirm = (confirm, editedRow) => {
    if (!confirm) return setEditItem(null);
    console.log("Edited:", editedRow);
  };

  useEffect(() => {
    fetchTableData();
  }, [selectedTable]);

  return (
    <main className="flex-1 overflow-y-auto p-4">
      {deleteItem && (
        <DeleteConfirmModal
          item={deleteItem}
          onDeleteConfirm={handleOnDeleteConfirm}
        />
      )}
      {editItem && (
        <EditModal
          rowData={editItem}
          onEditConfirm={handleOnEditConfirm}
          table={tableConstants.find((item) => item.name === selectedTable)}
        />
      )}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg text-stone-600">Database Admin</h2>
      </div>
      <TableTabBar
        tableProps={tableConstants}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <Table
            onDelete={handleOnDelete}
            onEdit={handleOnEdit}
            data={sortedData}
            onRefresh={handleRefresh}
            columns={
              tableConstants.find((item) => item.name === selectedTable).columns
            }
            onSort={handleSort} // Pass handleSort function to Table
            appliedFilters={adminGetters[selectedTable].appliedFilters} // Pass appliedFilters (sorting state) to Table
          />
        </div>
      )}
    </main>
  );
}

export default Admin;
