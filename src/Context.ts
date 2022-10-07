import { createContext, useContext } from "react";

export const FilterContext = createContext<any>({});
export const DisplayGroupContext = createContext<any>({});
export const useFilterContext = () => useContext(FilterContext);
export const useDisplayGroupContext = () => useContext(DisplayGroupContext);
