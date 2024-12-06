import { useState } from "react";
import PropTypes from "prop-types";
import Overlays from "../Overlays"; // Assuming you have a component to overlay the modal

const EditModal = ({ rowData, table, onEditConfirm }) => {
  // console.log(columns);
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    table.columns.forEach((column) => {
      initialData[column.accessor] = rowData[column.accessor] || "";
    });
    return initialData;
  });
  const [displayDemoMessage, setDisplayDemoMessage] = useState(false);

  const handleInputChange = (e, accessor) => {
    setFormData({
      ...formData,
      [accessor]: e.target.value,
    });
  };

  const handleSaveClick = () => {
    setDisplayDemoMessage(true);
  };

  return (
    <Overlays>
      <div
        role="dialog"
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
        className="fixed inset-0 z-50 flex items-center justify-center bg-stone-800 bg-opacity-50"
      >
        <div className="modal-content min-w-[400px] rounded bg-white p-6 text-xs shadow-lg">
          <h3 id="edit-modal-title" className="mb-4 text-lg">
            Edit {table.label}
          </h3>
          <form>
            {table.columns.map((column) => (
              <div key={column.accessor} className="mb-4">
                <label htmlFor={column.accessor} className="mb-1 block text-sm">
                  {column.label}
                </label>
                {column.label === "ID" ||
                column.accessor === "createdAt" ||
                column.accessor === "timestamp" ||
                column.accessor === "updatedAt" ? (
                  // Render non-editable fields
                  <input
                    id={column.accessor}
                    type="text"
                    value={formData[column.accessor] || ""}
                    disabled
                    className="w-full cursor-not-allowed rounded border border-stone-300 bg-stone-200 p-2"
                  />
                ) : column.type === "textarea" ? (
                  <textarea
                    id={column.accessor}
                    value={formData[column.accessor] || ""}
                    onChange={(e) => handleInputChange(e, column.accessor)}
                    className="w-full rounded border border-stone-300 p-2 text-sm"
                  />
                ) : (
                  <input
                    id={column.accessor}
                    type="text"
                    value={formData[column.accessor] || ""}
                    onChange={(e) => handleInputChange(e, column.accessor)}
                    className="w-full rounded border border-stone-300 p-2"
                  />
                )}
              </div>
            ))}
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => onEditConfirm(false)}
                className="rounded bg-stone-500 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveClick()}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
            {displayDemoMessage && (
              <p className="mt-2 text-xs text-red-500">
                This is a demo. No data will be saved.
              </p>
            )}
          </form>
        </div>
      </div>
    </Overlays>
  );
};

EditModal.propTypes = {
  rowData: PropTypes.object.isRequired,
  table: PropTypes.object.isRequired,
  onEditConfirm: PropTypes.func.isRequired, // Callback to handle the save action
};

export default EditModal;
