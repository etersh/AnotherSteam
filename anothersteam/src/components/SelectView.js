// MyComponent.js
import React, {useState} from "react";
import Select from "react-select";

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
    // justifyContent: data.isClearHistory ? 'center' : 'space-between',
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
    width: 'auto', // Ensure menu width can auto-adjust
    minWidth: '300px', // Set a minimum width
    zIndex: 1, // Ensure the dropdown is on top of other content
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
  // To completely remove the separator, we would override the component itself
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none", // Hides the separator
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
