import PropTypes from "prop-types";

import { createContext, useState } from "react";

const SelectedContext = createContext();

export function SelectedProvider({ children }) {
  const [selected, setSelected] = useState("Sensors");

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
}

SelectedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SelectedContext };
