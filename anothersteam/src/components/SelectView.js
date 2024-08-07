// MyComponent.js
import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--bg-main)',
    borderColor: state.isFocused ? 'var(--color-primary)' : 'var(--text-dim)',
    boxShadow: state.isFocused ? '0 0 0 1px var(--color-primary)' : 'none',
    '&:hover': {
      borderColor: 'var(--color-primary)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'var(--color-primary)' : 'var(--bg-main)',
    color: state.isSelected ? 'var(--text-main)' : 'var(--text-main)',
    '&:hover': {
      backgroundColor: 'var(--bg-highlight)',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--text-dim)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-main)',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--bg-main)',
    border: '1px solid var(--text-dim)',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: 'var(--text-dim)',
    '&:hover': {
      color: 'var(--color-primary)',
    },
  }),
};



function SelectView({options}) {
  return (
    <Select
      options={options}
      placeholder="View"
      isClearable
      styles={customStyles}
      onChange={(selectedOption) => {
        if (selectedOption && selectedOption.value !== "clear-history") {
          window.location.href = `/game/${selectedOption.value}`;
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
