export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: 46,
    border:
      state.isSelected || state.isFocused
        ? '1px solid #7d40e7 !important'
        : '1px solid #ddd !important',
    padding: '5px 10px',
    boxShadow: 'none !important',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color:
      state.isSelected || state.isFocused
        ? '#7d40e7 !important'
        : '#999 !important',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  input: () => ({
    height: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    color: '#999 !important',
    fontSize: 16,
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '115px !important',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #ddd',
    color: state.isSelected ? '#7d40e7' : '#999',
    background: '#fff !important',
    padding: 10,
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: 16,
    color: '#999 !important',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '100%',
    padding: 0,
    overflow: 'visible',
  }),
};
