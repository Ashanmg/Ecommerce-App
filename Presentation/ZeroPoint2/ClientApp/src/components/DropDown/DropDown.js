import React from 'react';
import CN from 'classnames';

import './DropDown.scss';

export const DropDown = ({ className, options, ...restProps }) => {
  const DropDownClasses = CN(
    'drop-down placeholder-G-dark pl-2 border-G-dark border-solid border-2 w-full h-7 md:h-10 focus:border-G-dark text-G-dark',
    className,
    {}
  );

  return (
    <select className={DropDownClasses} {...restProps} id="cars">
      <option value="volvo">Select</option>
      {options?.map((option, idx) => (
        <option id={idx} value="volvo">
          {option}
        </option>
      ))}
    </select>
  );
};

DropDown.defaultProps = {
  className: undefined,
  option: undefined,
};

export default DropDown;
