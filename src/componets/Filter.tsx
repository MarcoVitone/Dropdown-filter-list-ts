import { useState } from "react";
import { FilterContext } from "../Context";
import FilterGroup from "./FilterGroup";
import FilterItem from "./FilterItem";

const Filter = ({ data, selectAll, subSelectAll }: {
  data: any,
  selectAll: any,
  subSelectAll: any,
}) => {
  
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const displayAll: string = isDisplayed ? "inherit" : "none";

  const idList: string[] = Object.values(data).flatMap((value: any) =>
    value.map((item: any) => item.filterName)
  );
  
  Object.values(subSelectAll).map((value: any) => idList.push(value.filterGroup));
  idList.push(selectAll.filterName);

  const filterGroupArr: string[] = Object.values(subSelectAll).map(
    (value: any) => value.filterGroup
  );

  Object.values(subSelectAll).map((value: any) =>
    data[value.filterGroup].flatMap((item: any) =>
      filterGroupArr.push(item.filterName)
    )
  );

  const handleDisplay = () => {
    setIsDisplayed(!isDisplayed);
  };

  const handleSelectAll = (e: any) => {
    const { checked } = e.target;
    setIsCheckAll(!isCheckAll);
    setIsCheck(idList.map((li) => li));
    if (!checked) {
      setIsCheck([]);
    }
  }; 

  const filterToDelete: string[] = ["filterGroupOne", "filterGroupTwo", "Select all"];
  const filteredFilter: string[] = idList.filter(function (item) {
    return filterToDelete.indexOf(item) === -1;
  });

  const renderFilteredFilter: string[] = filteredFilter.filter((item) => {
    return isCheck.indexOf(item) > -1;
  });

  return (
    <div style={styles.container}>
      <h4 style={styles.title} onClick={handleDisplay}>
        filter dropdown
      </h4>
      <div
        style={{
          display: displayAll,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "80%" }}>
          <p>{renderFilteredFilter.join(" - ")}</p>
        </div>
        <FilterContext.Provider
          value={{
            idList,
            data,
            subSelectAll,
            filterGroupArr,
            isCheck: [isCheck, setIsCheck],
            isCheckAll: [isCheckAll, setIsCheckAll],
            renderFilteredFilter,
          }}
        >
          <FilterItem
            filterName={selectAll.filterName}
            id={selectAll.filterName}
            handleClick={handleSelectAll}
            isChecked={isCheckAll}
          />
          <FilterGroup />
        </FilterContext.Provider>
      </div>
    </div>
  );
};

export default Filter;

export const styles: any = {
  container: {
    width: "40vw",
    backgroundColor: "#d4d4d4",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#b4b4b4",
    borderRadius: "5px",
    padding: "10px",
  },
};
