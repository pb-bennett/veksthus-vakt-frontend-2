import PropTypes from "prop-types";
import { useState } from "react";
import Overlays from "../Overlays";

function DeleteModal({ item, onDeleteConfirm }) {
  const [displayDemoMessage, setDisplayDemoMessage] = useState(false);
  const rowString = JSON.stringify(item, null, 2);

  return (
    <Overlays>
      <div
        role="dialog"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        aria-hidden="false" // Ensure this is visible for screen readers
        className="fixed inset-0 z-50 flex items-center justify-center bg-stone-800 bg-opacity-50"
      >
        <div className="rounded bg-stone-50 p-6 shadow-lg">
          <h3 id="delete-modal-title" className="text-lg font-semibold">
            Confirm Delete
          </h3>
          <p
            id="delete-modal-description"
            className="mt-2 text-sm text-stone-600"
          >
            Are you sure you want to delete the following item?
          </p>
          <pre className="mt-2 overflow-auto rounded border border-stone-300 bg-stone-100 p-3 text-xs text-stone-600">
            {rowString}
          </pre>
          <div className="mt-4 flex justify-end">
            <button
              className="mr-2 rounded bg-stone-200 px-4 py-2 text-stone-600 hover:bg-emerald-200 focus:ring-2 focus:ring-emerald-500"
              onClick={() => onDeleteConfirm(false)}
              aria-label="Cancel delete action"
            >
              Cancel
            </button>
            <button
              className="rounded bg-red-400 px-4 py-2 text-stone-50 hover:bg-red-500 focus:ring-2 focus:ring-red-500"
              onClick={() => setDisplayDemoMessage(true)}
              aria-label="Confirm delete action"
            >
              Delete
            </button>
          </div>
          {displayDemoMessage && (
            <p className="mt-2 text-xs text-red-500">
              This is a demo. No data will be deleted.
            </p>
          )}
        </div>
      </div>
    </Overlays>
  );
}

DeleteModal.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteConfirm: PropTypes.func.isRequired,
};

export default DeleteModal;
