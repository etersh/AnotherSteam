import React, { useState } from "react";
import Select, { components } from "react-select";

const ClearIndicator = (props) => {
  return (
    <div
      {...props.innerProps}
      onClick={(e) => {
        e.stopPropagation(); // Prevent click event from propagating
        props.clearValue(); // Clear the selected value
      }}
    >
      X
    </div>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",
    borderColor: state.isFocused ? "var(--color-primary)" : "transparent",
    boxShadow: state.isFocused ? "0 0 0 1px var(--color-primary)" : "none",
    "&:hover": {
      borderColor: "var(--color-primary)",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--color-primary)"
      : "var(--bg-main)",
    color: state.isSelected ? "var(--text-main)" : "var(--text-main)",
    "&:hover": {
      backgroundColor: "var(--bg-highlight)",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--text-dim)",
    fontSize: 'smaller'
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'none', // Hides the selected value
    color: "var(--text-main)",
  }),
  menu: (provided) => ({
    ...provided,
    width: 'auto',
    minWidth: '300px',
    zIndex: 1,
    right: 0
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "var(--text-dim)",
    "&:hover": {
      color: "var(--color-primary)",
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
};

function SelectView({ options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Select
      options={options}
      placeholder="View"
      isClearable
      styles={customStyles}
      components={{ ClearIndicator }} // Use the custom ClearIndicator component
      value={selectedOption ? null : selectedOption}
      onChange={(option, { action }) => {
        if (action === 'clear') {
          setSelectedOption(null);
          return;
        }
        setSelectedOption(option);
        if (option && option.value !== "clear-history") {
          window.location.href = `/game/${option.value}`;
        }
      }}
      onInputChange={(inputValue, { action }) => {
        if (action === "input-blur") {
          return;
        }
      }}
    />
  );
}

export default SelectView;
