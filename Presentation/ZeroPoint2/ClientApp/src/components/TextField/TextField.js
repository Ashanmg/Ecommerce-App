import React from 'react';
import CN from 'classnames';

import './TextField.scss';

export const TextField = ({
  className,
  placeholder,
  type,
  isCustom,
  ...restProps
}) => {
  const TextFieldClasses = CN('text-field', className, {});

  return (
    <div className={TextFieldClasses} {...restProps}>
      <input
        type={type}
        disabled={false}
        readOnly={false}
        placeholder={placeholder}
        className="placeholder-G-dark pl-2 border-G-dark border-solid border-2 w-full h-7 md:h-10 focus:border-G-dark"
      />
    </div>
  );
};

TextField.defaultProps = {
  className: undefined,
  type: 'text'
};

export default TextField;
