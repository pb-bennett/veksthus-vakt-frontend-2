import PropTypes from "prop-types";

const TableTabBar = ({ tableProps, selectedTable, setSelectedTable }) => {
  return (
    <div className="flex text-stone-600">
      <ul className="flex select-none gap-1 border-b border-stone-300">
        {tableProps.map((table) => {
          return (
            <TableTab
              selected={selectedTable === table.name ? true : false}
              setSelectedTable={setSelectedTable}
              key={table.name}
              tableProps={table}
            />
          );
        })}
      </ul>
    </div>
  );
};

TableTabBar.propTypes = {
  tableProps: PropTypes.array,
  selectedTable: PropTypes.string,
  setSelectedTable: PropTypes.func,
};
export default TableTabBar;

const TableTab = ({ tableProps, selected, setSelectedTable }) => {
  return (
    <>
      <li
        onClick={() => setSelectedTable(tableProps.name)}
        className={`group flex w-28 cursor-pointer justify-center rounded-t-md border-x border-t border-stone-300 p-1 text-xs md:text-sm ${selected ? "bg-gradient-to-tr from-emerald-200 to-emerald-100 text-emerald-800" : ""}`}
      >
        <button className="group-hover:underline">{tableProps.label}</button>
      </li>
    </>
  );
};

TableTab.propTypes = {
  tableProps: PropTypes.object,
  selected: PropTypes.bool,
  setSelectedTable: PropTypes.func,
};
