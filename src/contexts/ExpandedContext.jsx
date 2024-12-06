import PropTypes from "prop-types";

import { createContext, useState } from "react";

const ExpandedContext = createContext();

export function ExpandedProvider({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [overlayMenu, setOverlayMenu] = useState(false);

  return (
    <ExpandedContext.Provider
      value={{
        expanded,
        setExpanded,
        enabled,
        setEnabled,
        overlayMenu,
        setOverlayMenu,
      }}
    >
      {children}
    </ExpandedContext.Provider>
  );
}

ExpandedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ExpandedContext };
