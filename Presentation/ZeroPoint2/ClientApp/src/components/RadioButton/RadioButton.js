import React from 'react';
import CN from 'classnames';

import './RadioButton.scss';

export const RadioButton = ({
  className,
  defaultChecked,
  title,
  id,
  isChecked,
  type,
  name,
  ...restProps
}) => {
  const RadioButtonClasses = CN('radio-button', className, {});

  return (
    <div className={RadioButtonClasses} {...restProps}>
      <input
        id={id}
        type={type}
        defaultChecked={defaultChecked}
        name={name}
        className="hidden"
        checked={isChecked}
      />
      <label
        htmlFor={id}
        className="flex items-center cursor-pointer text-G-dark"
      >
        <span className="inline-block w-4 h-4 mr-1 border border-grey"></span>
        {title}
      </label>
    </div>
  );
};

RadioButton.defaultProps = {
  className: undefined,
  isChecked: undefined,
  name: undefined,
  title: '',
  type: 'radio',
};

export default RadioButton;
