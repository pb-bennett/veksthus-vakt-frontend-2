import PropTypes from "prop-types";

import { createContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DataContext.Provider
      value={{ user, setUser, data, setData, isLoading, setIsLoading }}
    >
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataContext };
