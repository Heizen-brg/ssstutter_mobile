import { useContext, useEffect, useState, createContext } from "react";

const FilterContext = createContext({});

const FilterProvider = ({ children }) => {
  const [query, setQuery] = useState({
    catId: "",
    color: "",
    size: "",
    price: "",
    sort: "down",
    sortBy: "",
  });

  return (
    <FilterContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
const useFilter = () => useContext(FilterContext);
export { useFilter, FilterProvider };
