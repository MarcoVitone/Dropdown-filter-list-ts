import Checkbox from "./Checkbox";

const FilterItem = ({ filterName, id, handleClick, isChecked }: {
  filterName: string,
  id: string,
  isChecked: boolean,
  handleClick: any,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
      }}
    >
      <Checkbox
        isChecked={isChecked}
        id={id}
        label={filterName}
        handleClick={handleClick}
      />
    </div>
  );
};

export default FilterItem;
