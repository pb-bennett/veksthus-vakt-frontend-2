import PropTypes from "prop-types";
import {
  Pencil,
  Trash,
  RefreshCcw,
  ArrowDownNarrowWide,
  ArrowUpWideNarrow,
} from "lucide-react";
import { format } from "date-fns";

const formatDate = (dateString) =>
  dateString ? format(new Date(dateString), "dd.MM.yyyy, HH:mm:ss") : "N/A";

const Table = ({
  data,
  columns,
  onRefresh,
  onSort,
  appliedFilters,
  onEdit,
  onDelete,
}) => {
  const totalSpan =
    columns.reduce((sum, column) => sum + (column.span || 1), 0) + 1;
  const handleHeaderClick = (columnId) => {
    const column = columns.find((col) => col.id === columnId);
    if (column && column.sortable) {
      onSort(columnId);
    }
  };

  return (
    <>
      <div
        className="mt-1 grid select-none gap-px rounded-md bg-stone-100 p-1"
        style={{
          gridTemplateColumns: `repeat(${totalSpan}, minmax(0, 1fr))`,
        }}
      >
        {/* Header Row */}
        {columns.map((column) => (
          <button
            aria-sort={
              appliedFilters.sorting.key === column.id
                ? appliedFilters.sorting.direction === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            onClick={() => handleHeaderClick(column.id)}
            key={column.id}
            className={`flex items-center justify-between rounded-t-md border bg-stone-50 p-2 text-left text-[0.7rem] text-stone-700 ${appliedFilters.sorting.key === column.id ? "bg-gradient-to-tr from-emerald-200 to-emerald-100 text-emerald-800" : ""}`}
            style={{
              gridColumn: `span ${column.span || 1}`,
            }}
          >
            {column.label}
            {appliedFilters.sorting.key === column.id && (
              <span className="ml-1">
                {appliedFilters.sorting.direction === "asc" ? (
                  <ArrowUpWideNarrow size={18} />
                ) : (
                  <ArrowDownNarrowWide size={18} />
                )}
              </span>
            )}
          </button>
        ))}

        {/* Refresh Button Header */}
        <button
          className="group flex cursor-pointer items-center justify-center rounded-t-md border bg-stone-50 p-1 text-center text-[0.7rem] font-medium text-stone-600"
          onClick={onRefresh}
        >
          <div
            aria-label="Refresh Table"
            className="rounded-md p-1 text-[0.7rem] font-medium text-stone-600 group-hover:bg-emerald-100"
          >
            <RefreshCcw size={18} />
          </div>
        </button>
      </div>
      {/* Data Rows */}
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="group grid select-none rounded-md bg-stone-100 px-1 last:pb-1"
          style={{
            gridTemplateColumns: `repeat(${totalSpan}, minmax(0, 1fr))`, // Apply gridTemplateColumns to the data row (same as header)
          }}
        >
          {/* Data cells */}

          {columns.map((column) => (
            <div
              key={`${rowIndex}-${column.id}`}
              className="flex select-all items-center justify-center border bg-stone-50 px-1 text-[0.7rem] text-stone-600 first:rounded-l-md group-hover:bg-emerald-100"
              style={{
                gridColumn: `span ${column.span || 1}`, // Apply span to data cells
              }}
            >
              {row[column.accessor] !== undefined
                ? column.accessor === "createdAt" ||
                  column.accessor === "updatedAt" ||
                  column.accessor === "timestamp"
                  ? formatDate(row[column.accessor])
                  : (row[column.accessor]?.toString() ?? "N/A")
                : "N/A"}
            </div>
          ))}

          {/* Edit and Delete Buttons Column */}
          <div className="flex items-center justify-center rounded-r-md border bg-stone-50 p-1 text-center text-[0.7rem] text-stone-600 group-hover:bg-emerald-100">
            <button
              aria-label="Edit"
              className="rounded-md p-1 text-[0.7rem] font-medium text-stone-600 hover:bg-blue-100"
              onClick={() => onEdit(row)}
            >
              <Pencil size={12} />
            </button>
            <span className="mx-1" />
            <button
              aria-label="delete"
              className="rounded-md p-1 text-[0.7rem] font-medium text-stone-600 hover:bg-red-100"
              onClick={() => onDelete(row)}
            >
              <Trash size={12} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      endpoint: PropTypes.string,
      span: PropTypes.number,
    }),
  ).isRequired,
  onSort: PropTypes.func.isRequired,
  appliedFilters: PropTypes.shape({
    sorting: PropTypes.shape({
      key: PropTypes.string,
      direction: PropTypes.oneOf(["asc", "desc"]),
    }),
  }).isRequired,
  onRefresh: PropTypes.func.isRequired, // Refresh button handler
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Table;
