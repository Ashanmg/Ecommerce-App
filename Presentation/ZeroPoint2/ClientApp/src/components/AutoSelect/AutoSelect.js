import React from 'react';
import Select, { components } from 'react-select';
import CN from 'classnames';
import { RiArrowDownSLine } from 'react-icons/ri';

import './AutoSelect.scss';

export const AutoSelect = ({
  className,
  children,
  isClearable,
  isSearchable,
  isLoading,
  isMultiple,
  onChange,
  value,
  options,
  placeHolder,
  ...restProps
}) => {
  const AutoSelectClasses = CN('auto-select w-full text-left', className, {});

  const styles = {
    control: (base) => ({
      ...base,
      border: '2px solid #005C27',
      color: '#005C27',
      borderRadius: '0px',
      boxShadow: '0px 1px 2px rgba(0, 45, 71, 0.05)',
      '&:hover': {
        border: '2px solid #005C27',
      },
      '&:focus': {
        border: '2px solid #005C27',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#005C27',
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? '#EEF3F8' : '#fff',
      color: '#005C27',
    }),
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <RiArrowDownSLine size={20} color="#005C27" />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className={AutoSelectClasses} {...restProps}>
      <Select
        components={{ DropdownIndicator }}
        isClearable={isClearable}
        value={value}
        isSearchable={isSearchable}
        isLoading={isLoading}
        isMulti={isMultiple}
        options={options}
        onChange={onChange}
        menuPosition="fixed"
        placeholder={
          <span className="select-placeholder-text text-G-500">
            {placeHolder}
          </span>
        }
        styles={styles}
      />
    </div>
  );
};

AutoSelect.defaultProps = {
  className: undefined,
  isLoading: false,
  isClearable: true,
  options: [],
  isSearchable: true,
  isMultiple: false,
  onChange: () => {},
  placeHolder: 'Search',
};

export default AutoSelect;
