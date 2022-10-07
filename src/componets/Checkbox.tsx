const Checkbox = ({ id, label, handleClick, isChecked }: {
  id: string,
  label: string,
  isChecked: boolean,
  handleClick: any,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={label}
        checked={isChecked}
        onChange={handleClick}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default Checkbox;
