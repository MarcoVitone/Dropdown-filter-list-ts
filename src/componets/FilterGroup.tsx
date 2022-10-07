import { useFilterContext } from "../Context";
import { useState, useEffect } from "react";
import FilterItem from "./FilterItem";

const FilterGroup = () => {
  const filterContext = useFilterContext();
  const [isDisplayed, setIsDisplayed] = useState<string[]>([]);
  const [groupID, setGroupID] = useState<string>("");
  const data = filterContext.data;
  const filterGroupArr = filterContext.filterGroupArr;
  const group = filterContext.subSelectAll;
  const isCheck = filterContext.isCheck[0];
  const setIsCheck = filterContext.isCheck[1];
  const setIsCheckAll = filterContext.isCheckAll[1];
  const renderFilteredFilter = filterContext.renderFilteredFilter;

  const handleDisplayGroup = (e: any) => {
    const id = e.target.parentElement.childNodes[1].id; 
    if(e.target.parentElement.childNodes[1].style.display === "none"){
      setIsDisplayed((prevState) => [...prevState, id]);
    }else{
      setIsDisplayed(isDisplayed.filter((item) => item !== id));
    }
  };
  
  

  const handleSelect = (e: any) => {
    const { id, checked }: {
      id: string,
      checked: boolean
    } = e.target;
    setGroupID(
      e.target.parentElement.parentElement.parentElement.id.slice(0, -1)
    );
    setIsCheck((prevState: string[]) => [...prevState, id]);

    if (!checked) {
      const itemsToRemove = [id,  "Select all"];
      setIsCheck((prevState: string[]) =>
        prevState.filter((value) => {
          return itemsToRemove.indexOf(value) === -1;
        })
      );
      setIsCheckAll(false);
    }
  };

  const handleSelectGroup = (e: any) => {
    const { id, checked }: {
      id: string,
      checked: boolean
    } = e.target;
    let filter = data[id].map((value: any) => value.filterName);
    filter.push(id);
    const intersection = filterGroupArr.filter(function (i: any) {
      return filter.indexOf(i) > -1;
    });
    setIsCheck((prevState: string[]) => [...prevState, ...intersection.map((li: any) => li)]);
    if (!checked) {
      setIsCheck((prevState: string[]) =>
        prevState.filter(function (item) {
          return intersection.indexOf(item) === -1;
        })
      );
      setIsCheckAll(false);
    }
  };

  useEffect(() => {
    if (renderFilteredFilter.length === 7) {
      setIsCheckAll(true);
    }
    if (data[groupID]?.every((item: any) => isCheck.includes(item.filterName))) {
      setIsCheck((prevState: string[]) => [...prevState, groupID]);
    } else {setIsCheck((prevState: string[]) =>
      prevState.filter((value) => (value) !== groupID))}
  }, [renderFilteredFilter.length, setIsCheckAll, data, groupID, setIsCheck]);

  const renderGroup = Object.keys(data).map((value, index) => {
    const displayGroup = isDisplayed.includes(value + 1) ? "initial" : "none";
    return (
      <div key={index} className={"filterGroup"}>
        <h4
          onClick={handleDisplayGroup}
          style={{
            cursor: "pointer",
            backgroundColor: "#b4b4b4",
            textAlign: "center",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          {value}
        </h4>
        <div id={value + 1} style={{ display: displayGroup }}>
          {group.map((val: any, index: number) => {
            if (val.filterGroup === value) {
              return (
                <FilterItem
                  key={index}
                  filterName={val.filterName}
                  handleClick={handleSelectGroup}
                  isChecked={Object.values(isCheck).includes(val.filterGroup)}
                  id={val.filterGroup}
                />
              );
            }
          })}
          {data[value].map((value: any, index: number) => {
            return (
              <FilterItem
                key={index}
                filterName={value.filterName}
                handleClick={handleSelect}
                isChecked={Object.values(isCheck).includes(value.filterName)}
                id={value.filterName}
              />
            );
          })}
        </div>
      </div>
    );
  });

  return <div>{renderGroup}</div>;
};

export default FilterGroup;
